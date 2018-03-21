import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header.jsx';
import OrderList from './components/OrderList.jsx';
import TodoList from './components/TodoList.jsx';

import {get} from './api/client.jsx'

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Accordion, Panel, Jumbotron, Button, Modal} from 'react-bootstrap';

var root;
var producer;

if (!process.env.DEV_SERVER) {
    producer = window.api.producer;
    root = window.api.root;
}
else {
    producer = 'four';
    root = "http://localhost:8080";
}

const uri_orders = root + '/api/orders/producer/' + producer;
const uri_orders_todo = uri_orders + '/todo';

const uri_products = root + '/api/products/' + producer;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            orders: [],
            todos: [],
            search4me: '',
            show: false,
            producer: producer,
            today: ''
        };


        this.getOrders = this.getOrders.bind(this)
        this.getTodoList = this.getTodoList.bind(this)

        this.filter = this.filter.bind(this)
    }

    componentWillMount() {
        this.setState({today: new Date().toISOString().slice(0, 10)})
        get(uri_orders_todo).then((data) => {
            this.setState({todos: data});
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




    render() {

        let orderList = <OrderList orders={this.state.orders}
                                   filterText={this.state.search4me}/>

        let todoList = <TodoList todos={this.state.todos}
                                 filterText={this.state.search4me}/>

        return (
            <div className='container'>

                <Jumbotron>

                    <Header/>

                </Jumbotron>


                <Accordion defaultActiveKey="todos">


                    <Panel header={"ToDo"} eventKey="todos" onSelect={this.getTodoList}>

                        {todoList}

                    </Panel>


                    <Panel header={"Ordres"} eventKey="orders" onSelect={this.getOrders}>

                        {orderList}

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