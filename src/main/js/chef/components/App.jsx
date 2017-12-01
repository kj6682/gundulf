import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './header/Header.jsx';
import SearchBar from './SearchBar.jsx';
import ProductList from './product/ProductList.jsx';

import AddProductForm from "./product/AddProductForm.jsx";

import {get} from './api/client.jsx'
import {post} from './api/client.jsx'
import {deleteObject} from './api/client.jsx'

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Accordion, Panel, Jumbotron, Button,Modal} from 'react-bootstrap';

const api = window.proxy.api;
const producer = window.proxy.producer;

const dummyProduct = {
    "category": "category",
    "created": "0001-01-01",
    "id": 0,
    "name": "name",
    "pieces": "pieces",
    "producer": producer,
    "status": "string"
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {products: [],
                      search4me: '',
                      newProduct: dummyProduct,
                      show: false,
                      producer: producer};

        this.addProduct = this.addProduct.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
        this.search = this.search.bind(this)

        this.close = this.close.bind(this)
        this.cancel = this.cancel.bind(this)

        this.getProducts = this.getProducts.bind(this)
    }

    componentDidMount() {

        get(api.products +'/' + producer /*, { page:2, size:3 }*/ ).then((data) => {
            this.setState({products: data});
        });
    }

    close() {
        this.setState({ show: false });
    }


    search(search4me) {
        this.setState({search4me: search4me})

         get(api.products + '/search/' + producer, {name: [search4me]}).then((data) => {
            this.setState({products: data});
        });
    }

    addProduct(product) {
        var newProduct = JSON.stringify({
            "category": product.category,
            "created": product.created,
            "id": 0,
            "name": product.name,
            "pieces": product.pieces,
            "producer": producer,
            "status": "string"
        })

        post(api.products, newProduct).then(() => get(api.products + '/' + producer, { page: 0 }).then((data) => {
            this.setState({products: data, show: false, newProduct:dummyProduct});
        }));
    }

    removeProduct(id) {
        deleteObject(api.products, id).then(() => get(api.products, {page: 0}).then((data) => {
            this.setState({products: data});
        }));
    }


    cancel(item) {
        this.setState({newProduct: dummyProduct, show: false});
    }


    getProducts(){

        get(api.products, {producer: producer}).then((data) => {
            this.setState({products: data});
        });
    }

    render() {

        let searchBar = <SearchBar search4me={this.state.search4me}
                                   callbacks={{onUserInput: this.search}}/>


        let addProductForm = <AddProductForm
            product = {this.state.newProduct}
            callbacks={{add: this.addProduct, cancel:this.cancel}}/>

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


                <Accordion defaultActiveKey={producer}>

                    <Panel header={producer + " Commercial Products"} eventKey={producer} onSelect={this.getProducts}>

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