import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header.jsx';
import OrderList from './components/OrderList.jsx';
import {get} from './api/client.jsx'
import {post} from './api/client.jsx'
import {put} from './api/client.jsx'
import {deleteObject} from './api/client.jsx'

import {Accordion, Panel, Jumbotron, Button, Modal, FormGroup, Row, Col} from 'react-bootstrap';

var config = require('./components/config.json')
var api;
var shop;

if (!process.env.DEV_SERVER) {
    shop = window.proxy.shop;
    api = window.proxy.api;
}
else {
    shop = 'paris';
    api =
        {
            orders: "http://localhost:8080/api/orders"
        }
}


const uri_orders = api.orders + '/shop/' + shop;
const uri_orders_to_producer = uri_orders + '/products/';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            four: [],
            entremets: [],
            chocolat: [],
            tartes: [],
            today: ''
        };

        this.listMyOrders = this.listMyOrders.bind(this)
        this.updateMyOrder = this.updateMyOrder.bind(this)
        this.deleteMyOrder = this.deleteMyOrder.bind(this)

        this.listOrdersPerProducer = this.listOrdersPerProducer.bind(this)
        this.createOrder = this.createOrder.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
        this.deleteOrder = this.deleteOrder.bind(this)


    }

    componentDidMount() {
        this.setState({today: new Date().toISOString().slice(0, 10)})
    }


    listMyOrders() {
        get(uri_orders)
            .then((data) => {
                this.setState({orders: data});
            });
    }

    updateMyOrder(id, producer, jsonOrder) {

        put(uri_orders + '/' + id, jsonOrder)
            .then(
                () => get(uri_orders).then(
                    (data) => {
                        this.setState({orders: data, [producer]: []});
                    }
                )
            );
    }

    deleteMyOrder(id, producer) {

        deleteObject(uri_orders, id).then(() => get(uri_orders).then((data) => {
            this.setState({orders: data});
        }));

    }

    listOrdersPerProducer(producer) {

        get(uri_orders_to_producer + producer)
            .then((data) => {
                this.setState({[producer]: data});
            });

    }

    createOrder(producer, jsonOrder) {

        post(uri_orders + '/to/' + producer, jsonOrder)
            .then(
                () => get(uri_orders_to_producer + producer, {page: 0}).then(
                    (data) => {
                        this.setState({[producer]: data});
                    }
                )
            );
    }

    updateOrder(id, producer, jsonOrder) {

        put(uri_orders + '/' + id, jsonOrder)
            .then(
                () => get(uri_orders_to_producer + producer, {page: 0}).then(
                    (data) => {
                        this.setState({[producer]: data, orders:[]});
                    }
                )
            );

    }

    deleteOrder(id, producer) {

        deleteObject(uri_orders, id).then(() => get(uri_orders_to_producer + producer, {page: 0}).then((data) => {
            this.setState({[producer]: data});
        }));

    }


    render() {

        let myOrderList = <OrderList orders={this.state.orders}
                                     callbacks={{
                                         create: this.createOrder,
                                         update: this.updateMyOrder,
                                         delete: this.deleteMyOrder
                                     }}/>


        let fourOrderList = <OrderList orders={this.state.four}
                                       callbacks={{
                                           create: this.createOrder,
                                           update: this.updateOrder,
                                           delete: this.deleteOrder
                                       }}/>

        let tartesOrderList = <OrderList orders={this.state.tartes}
                                         callbacks={{
                                             create: this.createOrder,
                                             update: this.updateOrder,
                                             delete: this.deleteOrder
                                         }}/>

        let entremetsOrderList = <OrderList orders={this.state.entremets}
                                            callbacks={{
                                                create: this.createOrder,
                                                update: this.updateOrder,
                                                delete: this.deleteOrder
                                            }}/>

        let chocolatOrderList = <OrderList orders={this.state.chocolat}
                                           callbacks={{
                                               create: this.createOrder,
                                               update: this.updateOrder,
                                               delete: this.deleteOrder
                                           }}/>


        return (
            <div className='container'>

                <Jumbotron>

                    <Header/>

                </Jumbotron>

                <Row className="show-grid">
                    <Col xs={12} md={4}>

                        {config.lorem}

                    </Col>
                    <Col xs={12} md={8}>
                        <Accordion defaultActiveKey="1">

                            <Panel header="My orders" eventKey="" onSelect={this.listMyOrders}>

                                <p>{config.my_orders}</p>

                                {myOrderList}

                            </Panel>
                        </Accordion>

                        <p>{config.products_and_orders}</p>

                        <Accordion defaultActiveKey="1">
                            <Panel header="Four" eventKey="four" onSelect={this.listOrdersPerProducer}>

                                {fourOrderList}

                            </Panel>

                            <Panel header="Tartes" eventKey="tartes" onSelect={this.listOrdersPerProducer}>

                                {tartesOrderList}

                            </Panel>

                            <Panel header="Entremets" eventKey="entremets" onSelect={this.listOrdersPerProducer}>

                                {entremetsOrderList}

                            </Panel>

                            <Panel header="Chocolat" eventKey="chocolat" onSelect={this.listOrdersPerProducer}>

                                {chocolatOrderList}

                            </Panel>

                        </Accordion>

                    </Col>
                </Row>


            </div>
        )
    }
}

App.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
}

export default App