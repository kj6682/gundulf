import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './Header.jsx';
import SearchBar from './SearchBar.jsx';
import ProductList from './product/ProductList.jsx';
import AddProduct from './product/AddProduct.jsx';
import ProductModal from './product/ProductModal.jsx';
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
        this.state = {products: [], items: [], search4me: '', newProduct: dummyProduct, show: false};

        this.selectItem = this.selectItem.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
        this.search = this.search.bind(this)

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    componentDidMount() {
        var params = {}

        get(api.products, params).then((data) => {
            this.setState({products: data});
        });

        get(api.items, params).then((data) => {
            this.setState({items: data});
        });
    }

    close() {
        this.setState({ show: false });
    }

    open() {
        console.log("open")
        this.setState({ show: true });
        console.log(this.state)
        this.render()
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
            this.setState({products: data, show: false, newProduct:dummyProduct});
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


    render() {

        let searchBar = <SearchBar search4me={this.state.search4me}
                                   callbacks={{onUserInput: this.search}}/>

        let addItem = <AddItem
            callbacks={{add: this.addItem}}/>

        let addProduct = <AddProduct
            product = {this.state.newProduct}
            callbacks={{add: this.addProduct, cancel:this.cancel}}/>

        let itemList = <ItemList items={this.state.items}
                                 callbacks={{
                                     remove: this.removeItem,
                                     select: this.selectItem
                                 }}/>

        let productList = <ProductList products={this.state.products}
                                       callbacks={{
                                           remove: this.removeProduct
                                       }}/>

        let addProductForm = <AddProductForm
            product = {this.state.newProduct}
            callbacks={{add: this.addProduct, cancel:this.cancel}}/>

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

                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                    Launch contained modal
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {addProductForm}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
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