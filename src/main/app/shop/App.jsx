import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header.jsx';
import OrderList from './components/OrderList.jsx';
import {get} from './api/client.jsx'
import {post} from './api/client.jsx'
import {put} from './api/client.jsx'

import {Accordion, Panel, Jumbotron, Button, Modal, FormGroup} from 'react-bootstrap';

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
        // noinspection JSAnnotator
        this.state = {
            orders: [],
            four: [],
            entremets: [],
            chocolat: [],
            tartes: [],
            today: ''
        };

        this.selectProducerToPlaceOrders = this.selectProducerToPlaceOrders.bind(this)
        this.listMyOrders = this.listMyOrders.bind(this)
        this.createOrder = this.createOrder.bind(this)
    }

    componentDidMount() {
        this.setState({today: new Date().toISOString().slice(0, 10)})
    }

    selectProducerToPlaceOrders(producer) {

        let container = producer
        get(uri_orders_to_producer + producer).then((data) => {
            this.setState({[container]: data});
        });

    }

    listMyOrders() {
        get(uri_orders).then((data) => {
            this.setState({orders: data});
        });
    }


    createOrder(order) {
        let producer = order.producer

        var newOrder = JSON.stringify({
            "id": 0,
            "created": order.created,
            "deadline": order.deadline,
            "producer": order.producer,
            "product": order.product,
            "shop": order.shop,
            "quantity": order.quantity
        })

        if (order.id === 0) {
            post(uri_orders + '/to/' + producer, newOrder)
                .then(
                    () => get(uri_orders_to_producer + producer, {page: 0}).then(
                        (data) => {
                            this.setState({[producer]: data});
                        }
                    )
                );
        } else {
            put(uri_orders + '/' + order.id, newOrder)
                .then(
                    () => get(uri_orders_to_producer + producer, {page: 0}).then(
                        (data) => {
                            this.setState({[producer]: data});
                        }
                    )
                );
        }


    }

    render() {


        let orderList = <OrderList orders={this.state.orders}
                                   callbacks={{create: this.createOrder}}/>


        let fourOrderList = <OrderList orders={this.state.four}
                                       callbacks={{create: this.createOrder}}/>

        let tartesOrderList = <OrderList orders={this.state.tartes}
                                         callbacks={{create: this.createOrder}}/>

        let entremetsOrderList = <OrderList orders={this.state.entremets}
                                            callbacks={{create: this.createOrder}}/>

        let chocolatOrderList = <OrderList orders={this.state.chocolat}
                                           callbacks={{create: this.createOrder}}/>


        return (
            <div className='container'>

                <Jumbotron>

                    <Header/>

                </Jumbotron>


                <Accordion defaultActiveKey="1">

                    <Panel header="My orders" eventKey="" onSelect={this.listMyOrders}>

                        {orderList}

                    </Panel>

                    <Panel header="four" eventKey="four" onSelect={this.selectProducerToPlaceOrders}>

                        {fourOrderList}

                    </Panel>

                    <Panel header="tartes" eventKey="tartes" onSelect={this.selectProducerToPlaceOrders}>

                        {tartesOrderList}

                    </Panel>

                    <Panel header="entremets" eventKey="entremets" onSelect={this.selectProducerToPlaceOrders}>

                        {entremetsOrderList}

                    </Panel>

                    <Panel header="chocolat" eventKey="chocolat" onSelect={this.selectProducerToPlaceOrders}>

                        {chocolatOrderList}

                    </Panel>

                </Accordion>


            </div>
        )
    }
}

App.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
}

export default App