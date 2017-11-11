import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './Header.jsx';
import SearchBar from './SearchBar.jsx';
import ProductList from './product/ProductList.jsx';
import AddProduct from './product/AddProduct.jsx';
import AddItem from "./item/AddItem.jsx";
import ItemList from './item/ItemList.jsx';

import {get} from './api/client.jsx'
import {getByName} from './api/client.jsx'
import {post} from './api/client.jsx'
import {deleteObject} from './api/client.jsx'

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Accordion, Panel, Jumbotron} from 'react-bootstrap';

const isProduction = process.env.NODE_ENV==='production'
var config = require('../config.json')
var api = (isProduction)? config.prod.api : config.dev.api


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {products: [], items: [], search4me: '', newProduct : ''};

        this.selectItem = this.selectItem.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
        this.search = this.search.bind(this)

    }

    componentDidMount() {
        /*var params = {
            size: '2',
            page: '2'
        };*/
        var params = {}

        get(api.products, params).then((data) => {
            this.setState({products: data});
        });

        get(api.items, params).then((data) => {
            this.setState({items: data});
        });
    }

    search(search4me) {
        var params = {name: [search4me]}
        this.setState({search4me: search4me})
        getByName(api.products, params).then((data) => {
            this.setState({products: data});
        });
        getByName(api.items, params).then((data) => {
            this.setState({items: data});
        });
    }

    addProduct(product) {
        var newProduct = JSON.stringify({
            "category": product.category,
            "created": product.created,
            "id": 0,
            "name": product.name,
            "pieces": product.pieces,
            "producer": product.producer,
            "status": "string"
        })

        post(api.products, newProduct).then(() => get(api.products, {page: 0}).then((data) => {
            this.setState({products: data});
        }));
    }

    addItem(item) {
        var newItem = JSON.stringify({
            "category": item.category,
            "id": 0,
            "name": item.name,
            "producer": item.producer
        })
        post(api.items, newItem).then(() => get(api.items, {page: 0}).then((data) => {
            this.setState({items: data});
        }));
    }

    removeProduct(id) {
        deleteObject(api.products, id).then(() => get(api.products, {page: 0}).then((data) => {
            this.setState({products: data});
        }));
    }

    removeItem(id) {
        deleteObject(api.items, id).then(() => get(api.items, {page: 0}).then((data) => {
            this.setState({items: data});
        }));
    }

    selectItem(item) {
        this.setState({newProduct: item});
        console.log(item)
    }


    render() {

        let searchBar = <SearchBar search4me={this.state.search4me}
                                   callbacks={{onUserInput: this.search}}/>

        let addItem = <AddItem
            callbacks={{add: this.addItem}}/>

        let addProduct = <AddProduct
            callbacks={{add:this.addProduct}}/>

        let itemList = <ItemList items={this.state.items}
                                      callbacks={{
                                          remove: this.removeItem,
                                          select: this.selectItem
                                      }}/>

        let productList = <ProductList products={this.state.products}
                                            callbacks={{
                                                remove: this.removeProduct
                                            }}/>



        return (
            <div className='container'>

               <Jumbotron>

                    <Header/>

                    {searchBar}

               </Jumbotron>



                <Accordion defaultActiveKey="2">
                    <Panel header="Base Products" eventKey="1">

                        {addItem}

                        {itemList}


                    </Panel>
                    <Panel header="Commercial Products" eventKey="2">


                        {addProduct}

                        {productList}

                    </Panel>
                </Accordion>

            </div>
        )
    }
}

App.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    items: PropTypes.arrayOf(PropTypes.object)
}

export default App