import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import ProductList from './components/ProductList.jsx';
import OrderList from './components/OrderList.jsx';

import AddProductForm from "./components/AddProductForm.jsx";

import {get} from './api/client.jsx'
import {post} from './api/client.jsx'
import {deleteObject} from './api/client.jsx'

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Accordion, Panel, Jumbotron, Button, Modal} from 'react-bootstrap';

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
        this.state = {
            products: [],
            orders: [],
            search4me: '',
            newProduct: dummyProduct,
            show: false,
            producer: producer
        };

        this.addProduct = this.addProduct.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
        this.search = this.search.bind(this)

        this.close = this.close.bind(this)
        this.cancel = this.cancel.bind(this)

        this.getProducts = this.getProducts.bind(this)
        this.getOrders = this.getOrders.bind(this)
        this.getOrdersGroupedByProduct = this.getOrdersGroupedByProduct.bind(this)

    }

    componentWillMount() {
        const uri = api.orders + '/producer/' + producer
        get(uri).then((data) => {
            this.setState({orders: data});
        });
    }

    close() {
        this.setState({show: false});
    }


    search(search4me) {
        this.setState({search4me: search4me})

        const uri = api.products + '/' + producer + '/search'
        get(uri, {name: [search4me]}).then((data) => {

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
        const uri = api.products +'/'+ producer
        post(uri, newProduct).then(
            () => get(uri, {page: 0}).then(
                (data) => {
                    this.setState({products: data, show: false, newProduct: dummyProduct});
                }
            )
        );
    }

    removeProduct(id) {
        const uri = api.products +'/'+ producer
        deleteObject(uri, id).then(() => get(api.products, producer, {page: 0}).then((data) => {
            this.setState({products: data});
        }));
    }


    cancel(item) {
        this.setState({newProduct: dummyProduct, show: false});
    }


    getProducts() {
        const uri = api.products +'/'+ producer
        get(uri).then((data) => {
            this.setState({products: data});
        });
    }

    getOrders() {
        const uri = api.orders + '/producer/' + producer
        get(uri).then((data) => {
            this.setState({orders: data});
        });
    }

    getOrdersGroupedByProduct() {
        const uri = api.orders + '/producer/' + producer + '/group_by_product'
        get(uri).then((data) => {
            this.setState({orders: data});
        });
    }

    render() {
        let searchBar = <SearchBar search4me={this.state.search4me}
                                   callbacks={{onUserInput: this.search}}/>


        let addProductForm = <AddProductForm
            product={this.state.newProduct}
            callbacks={{add: this.addProduct, cancel: this.cancel}}/>

        let productList = <ProductList products={this.state.products}
                                       product={this.state.newProduct}
                                       callbacks={{
                                           add: this.addProduct,
                                           cancel: this.cancel,
                                           remove: this.removeProduct
                                       }}/>

        let orderList = <OrderList orders={this.state.orders}/>

        return (
            <div className='container'>

                <Jumbotron>

                    <Header/>

                    {searchBar}

                </Jumbotron>


                <Accordion defaultActiveKey="orders">

                    <Panel header={producer + " Commercial Products"} eventKey="products" onSelect={this.getProducts}>

                        {productList}

                    </Panel>


                    <Panel header={producer + " Orders"} eventKey="orders" onSelect={this.getOrders}>

                        {orderList}

                    </Panel>

                    <Panel header={producer + " ToDos"} eventKey="todo" onSelect={this.getOrdersGroupedByProduct}>

                        {orderList}

                    </Panel>

                </Accordion>


                <Modal
                    show={this.state.show}
                    onHide={this.close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Create a new product from the selected
                            item</Modal.Title>
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