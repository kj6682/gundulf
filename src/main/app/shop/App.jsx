import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header.jsx';
import OrderList from './components/OrderList.jsx';
import {get} from './api/client.jsx'

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
const uri_orders_to_producer = api.orders + '/shop/' + shop + '/products/';

class App extends React.Component {

    constructor(props) {
        super(props);
        // noinspection JSAnnotator
        this.state = {
            orders: [],
            four: [],
            entremetes: [],
            chocolat: [],
            tartes: [],
            today: '',
            producer: ''
        };

        this.selectProducerToPlaceOrders = this.selectProducerToPlaceOrders.bind(this)
        this.listMyOrders = this.listMyOrders.bind(this)
        this.createOrder = this.createOrder.bind(this)
    }

    componentDidMount() {
        this.setState({today: new Date().toISOString().slice(0, 10)})
    }

    selectProducerToPlaceOrders(producer) {

        this.setState({producer: producer});


        get(uri_orders_to_producer + producer).then((data) => {
            this.setState({orders: data});
        });
        //neither robust nor elegant
    }

    listMyOrders() {
        get(uri_orders).then((data) => {
            this.setState({orders: data});
        });
    }


    createOrder(order) {
        console.log('create order name ' + order.name)
        console.log('create order cate ' + order.category)
        console.log('create order prod ' + order.producer)
        console.log('create order piec ' + order.pieces)
        console.log('create order quan ' + order.quantity)
        console.log('create order date ' + order.date)
    }

    render() {


        let orderList = <OrderList orders={this.state.orders}
                                   callbacks={{}}/>


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

                        {orderList}

                    </Panel>

                    <Panel header="tartes" eventKey="tartes" onSelect={this.selectProducerToPlaceOrders}>

                        {orderList}

                    </Panel>

                    <Panel header="entremetes" eventKey="entremets" onSelect={this.selectProducerToPlaceOrders}>

                        {orderList}

                    </Panel>

                    <Panel header="chocolat" eventKey="chocolat" onSelect={this.selectProducerToPlaceOrders}>

                        {orderList}

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