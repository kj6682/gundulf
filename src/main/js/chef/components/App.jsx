import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './Header.jsx';
import SearchBar from './SearchBar.jsx';
import ProductList from './product/ProductList.jsx';
import AddProduct from './product/AddProduct.jsx';

import AddProductForm from "./product/AddProductForm.jsx";

import AddItem from "./item/AddItem.jsx";
import ItemList from './item/ItemList.jsx';

import {get} from './api/client.jsx'
import {getByName} from './api/client.jsx'
import {post} from './api/client.jsx'
import {deleteObject} from './api/client.jsx'

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Accordion, Panel, Jumbotron, Button,Modal} from 'react-bootstrap';

const isProduction = process.env.NODE_ENV === 'production'
var config = require('../config.json')
var api = (isProduction) ? config.prod.api : config.dev.api

const dummyProduct = {
    "category": "category",
    "created": "0001-01-01",
    "id": 0,
    "name": "name",
    "pieces": "pieces",
    "producer": "producer",
    "status": "string"
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {products: [],
                      items: [],
                      search4me: '',
                      newProduct: dummyProduct,
                      show: false,
                      producer: ''};

        this.selectItem = this.selectItem.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
        this.search = this.search.bind(this)

        this.close = this.close.bind(this)
        this.cancel = this.cancel.bind(this)

        this.selectProducer = this.selectProducer.bind(this)
    }

    componentDidMount() {
        var params = {}

/*
        get(api.products, params).then((data) => {
            this.setState({products: data});
        });
*/
        get(api.items, params).then((data) => {
            this.setState({items: data});
        });
    }

    close() {
        this.setState({ show: false });
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

        var dummy = dummyProduct
        dummy.producer = this.state.producer
        post(api.products, newProduct).then(() => get(api.products, {producer: this.state.producer, page: 0}).then((data) => {
            this.setState({products: data, show: false, newProduct:dummy});
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
        this.setState({newProduct: item, show: true});
    }

    cancel(item) {
        this.setState({newProduct: dummyProduct, show: false});
    }


    selectProducer(producer){
        var product = this.state.newProduct
        product.producer = producer
        this.setState({producer: producer, newProduct: product});

        get(api.products, {producer: producer}).then((data) => {
            this.setState({products: data});
        });
    }

    render() {

        let searchBar = <SearchBar search4me={this.state.search4me}
                                   callbacks={{onUserInput: this.search}}/>

        let addItem = <AddItem
            callbacks={{add: this.addItem}}/>


        let addProductForm = <AddProductForm
            product = {this.state.newProduct}
            callbacks={{add: this.addProduct, cancel:this.cancel}}/>

        let itemList = <ItemList items={this.state.items}
                                 callbacks={{
                                     remove: this.removeItem,
                                     select: this.selectItem
                                 }}/>

        let productList = <ProductList products={this.state.products}
                                       product = {this.state.newProduct}
                                       callbacks={{
                                           add: this.addProduct,
                                           cancel:this.cancel,
                                           remove: this.removeProduct
                                       }}/>

        return (
            <div className='container'>

                <Jumbotron>

                    <Header/>

                    {searchBar}

                </Jumbotron>


                <Accordion defaultActiveKey="1">
                    <Panel header="Base Products" eventKey="1">

                        {addItem}

                        {itemList}


                    </Panel>
                    <Panel header="All Commercial Products" eventKey="" onSelect={this.selectProducer}>

                        {productList}

                    </Panel>

                    <Panel header="Four" eventKey="Four" onSelect={this.selectProducer}>

                        {productList}

                    </Panel>

                    <Panel header="Cake" eventKey="Cake" onSelect={this.selectProducer}>

                        {productList}

                    </Panel>

                </Accordion>


                <Modal
                    show={this.state.show}
                    onHide={this.close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Create a new product from the selected item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {addProductForm}
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>


            </div>
        )
    }
}

App.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    items: PropTypes.arrayOf(PropTypes.object)
}

export default App