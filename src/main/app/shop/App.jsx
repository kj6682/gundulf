import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header.jsx';
import OrderList from './components/OrderList.jsx';
import {get} from './api/client.jsx'
import {post} from './api/client.jsx'
import {put} from './api/client.jsx'
import {deleteObject} from './api/client.jsx'

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
            today: '',
            producer: ''
        };

        this.selectProducerToPlaceOrders = this.selectProducerToPlaceOrders.bind(this)
        this.listMyOrders = this.listMyOrders.bind(this)
        this.createOrder = this.createOrder.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
        this.deleteOrder = this.deleteOrder.bind(this)


    }

    componentDidMount() {
        this.setState({today: new Date().toISOString().slice(0, 10)})
    }

    selectProducerToPlaceOrders(producer) {

        this.setState({producer: producer})

        get(uri_orders_to_producer + producer).then((data) => {
            this.setState({[producer]: data});
        });

    }

    listMyOrders() {
        get(uri_orders).then((data) => {
            this.setState({orders: data});
        });
    }


    createOrder(order) {
        let producer = this.state.producer

        post(uri_orders + '/to/' + producer, order)
            .then(
                () => get(uri_orders_to_producer + producer, {page: 0}).then(
                    (data) => {
                        this.setState({[producer]: data});
                    }
                )
            );
    }

    updateOrder(id, order) {
        let producer = this.state.producer

        put(uri_orders + '/' + id, order)
            .then(
                () => get(uri_orders_to_producer + producer, {page: 0}).then(
                    (data) => {
                        this.setState({[producer]: data});
                    }
                )
            );


    }

    deleteOrder(id) {
        let producer = this.state.producer

        deleteObject(uri_orders, id).then(() => get(uri_orders_to_producer + producer, {page: 0}).then((data) => {
            this.setState({[producer]: data});
        }));

    }


    render() {

        let orderList = <OrderList orders={this.state.orders}
                                   callbacks={{
                                       create: this.createOrder,
                                       update: this.updateOrder,
                                       delete: this.deleteOrder
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