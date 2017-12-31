import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import ProductList from './components/ProductList.jsx';
import OrderList from './components/OrderList.jsx';
import TodoList from './components/TodoList.jsx';

import AddProductForm from "./components/AddProductForm.jsx";

import {get} from './api/client.jsx'
import {post} from './api/client.jsx'
import {deleteObject} from './api/client.jsx'

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Accordion, Panel, Jumbotron, Button, Modal} from 'react-bootstrap';

var api;
var producer;

if (!process.env.DEV_SERVER) {
    producer = window.proxy.producer;
    api = window.proxy.api;
}
else {
    producer = 'four';
    api =
        {
            products: "http://localhost:8080/api/products",
            items: "http://localhost:8080/api/items",
            orders: "http://localhost:8080/api/orders"
        }
}

const uri_orders = api.orders + '/producer/' + producer;
const uri_orders_todo = uri_orders + '/todo';
const uri_products = api.products + '/' + producer;
const uri_products_search = uri_products + '/search';

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
            todos: [],
            search4me: '',
            newProduct: dummyProduct,
            show: false,
            producer: producer
        };

        this.addProduct = this.addProduct.bind(this)
        this.removeProduct = this.removeProduct.bind(this)

        this.close = this.close.bind(this)
        this.cancel = this.cancel.bind(this)

        this.getProducts = this.getProducts.bind(this)
        this.getOrders = this.getOrders.bind(this)
        this.getTodoList = this.getTodoList.bind(this)

        this.filter = this.filter.bind(this)
    }

    componentWillMount() {

        get(uri_orders_todo).then((data) => {
            this.setState({todos: data});
        });
    }

    getProducts() {
        get(uri_products).then((data) => {
            this.setState({products: data});
        });
    }

    getOrders() {
        get(uri_orders).then((data) => {
            this.setState({orders: data});
        });
    }

    getTodoList() {

        get(uri_orders_todo).then((data) => {
            this.setState({todos: data});
        });
    }

    filter(searchTerm){
        this.setState({search4me:searchTerm})
    }

    close() {
        this.setState({show: false});
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

        post(uri_products, newProduct).then(
            () => get(uri_products, {page: 0}).then(
                (data) => {
                    this.setState({products: data, show: false, newProduct: dummyProduct});
                }
            )
        );
    }

    removeProduct(id) {
        deleteObject(uri_products, id).then(() => get(uri_products, {page: 0}).then((data) => {
            this.setState({products: data});
        }));
    }


    cancel(item) {
        this.setState({newProduct: dummyProduct, show: false});
    }

    render() {
        let searchBar = <SearchBar filterText={this.state.search4me}
                                   callbacks={{
                                       onUserInput: this.filter,
                                   }}/>

        let addProductForm = <AddProductForm
            product={this.state.newProduct}
            callbacks={{add: this.addProduct, cancel: this.cancel}}/>

        let productList = <ProductList products={this.state.products}
                                       product={this.state.newProduct}
                                       filterText={this.state.search4me}
                                       callbacks={{
                                           add: this.addProduct,
                                           cancel: this.cancel,
                                           remove: this.removeProduct
                                       }}/>

        let orderList = <OrderList orders={this.state.orders}
                                   filterText={this.state.search4me}/>

        let todoList = <TodoList todos={this.state.todos}
                                 filterText={this.state.search4me}/>

        return (
            <div className='container'>

                <Jumbotron>

                    <Header/>

                    {searchBar}

                </Jumbotron>


                <Accordion defaultActiveKey="todos">


                    <Panel header={"ToDo"} eventKey="todos" onSelect={this.getTodoList}>

                        {todoList}

                    </Panel>


                    <Panel header={"Orders"} eventKey="orders" onSelect={this.getOrders}>

                        {orderList}

                    </Panel>

                    <Panel header={"Commercial Products"} eventKey="products" onSelect={this.getProducts}>

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