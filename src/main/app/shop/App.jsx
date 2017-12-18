import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import ProductList from './components/product/ProductList.jsx';
import OrderForm from './components/order/OrderForm.jsx'
import {get} from './api/client.jsx'
import {getByName} from './api/client.jsx'

import {Accordion, Panel, Jumbotron, Button, Modal, FormGroup} from 'react-bootstrap';

const isProduction = process.env.NODE_ENV === 'production'
var config = require('./config.json')
var api = (isProduction) ? config.prod.api : config.dev.api


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            items: [],
            search4me: '',
            show: false,
            producer: '',
            product: ''
        };

        this.search = this.search.bind(this)
        this.selectProducer = this.selectProducer.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.createOrder = this.createOrder.bind(this)
    }

    componentDidMount() {
      this.setState({today: new Date().toISOString().slice(0,10)})
    }


    search(search4me) {
        var params = {name: [search4me]}
        this.setState({search4me: search4me})

        getByName(api.products, params).then((data) => {
            this.setState({products: data});
        });

    }

    selectProducer(producer) {

        this.setState({producer: producer});

        get(api.products, {producer: producer}).then((data) => {
            this.setState({products: data});
        });
    }

    openModal(product) {
        this.setState({product: product, show: true});
    }

    closeModal() {
        this.setState({show: false});
    }

    createOrder(order){
        console.log('create order name ' + order.name)
        console.log('create order cate ' + order.category)
        console.log('create order prod ' + order.producer)
        console.log('create order piec ' + order.pieces)
        console.log('create order quan ' + order.quantity)
        console.log('create order date ' + order.date)
        this.closeModal()
    }

    render() {

        let searchBar = <SearchBar search4me={this.state.search4me}
                                   callbacks={{onUserInput: this.search}}/>


        let productList = <ProductList products={this.state.products}
                                       product={this.state.newProduct}
                                       callbacks={{
                                           select: this.openModal
                                       }}/>

        let modal = <Modal show={this.state.show}
                           onHide={this.closeModal}
                           container={this}
                           aria-labelledby="contained-modal-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">{this.state.product.producer}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>{this.state.product.name} {this.state.product.pieces}</h1>
                <OrderForm
                    name={this.state.product.name}
                    category={this.state.product.category}
                    producer={this.state.product.producer}
                    pieces={this.state.product.pieces}
                    quantity={'0'}
                    date= {this.state.today}
                    callbacks={{add: this.createOrder,
                                       cancel:this.closeModal}}/>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>

        return (
            <div className='container'>

                <Jumbotron>

                    <Header/>

                    {searchBar}

                </Jumbotron>


                <Accordion defaultActiveKey="1">

                    <Panel header="My orders" eventKey="" onSelect={this.selectProducer}>

                        <h1>my orders</h1>

                    </Panel>

                    <Panel header="Four" eventKey="Four" onSelect={this.selectProducer}>

                        {productList}

                    </Panel>

                    <Panel header="Cake" eventKey="Cake" onSelect={this.selectProducer}>

                        {productList}

                    </Panel>

                    <Panel header="entremtes" eventKey="Entremets" onSelect={this.selectProducer}>

                        {productList}

                    </Panel>

                    <Panel header="chocolat" eventKey="Chocolats" onSelect={this.selectProducer}>

                        {productList}

                    </Panel>

                </Accordion>

                {modal}


            </div>
        )
    }
}

App.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    items: PropTypes.arrayOf(PropTypes.object)
}

export default App