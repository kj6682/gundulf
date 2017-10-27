import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import Header from './Header.jsx';
import SearchBar from './SearchBar.jsx';
import ProductList from './product/ProductList.jsx';
import AddProduct from './product/AddProduct.jsx';
import ItemList from './item/ItemList.jsx';
import AddItem from "./item/AddItem.jsx";

import {get} from './api/client.jsx'
import {getByName} from './api/client.jsx'
import {post} from './api/client.jsx'
import {deleteObject} from './api/client.jsx'
var api = require('config').api

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};




class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {products: [], items: [], search4me: '', modalIsOpen: false, newProduct : ''};

        this.selectItem = this.selectItem.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
        this.search = this.search.bind(this)

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount() {
        /*var params = {
            size: '2',
            page: '2'
        };*/
        var params = {}

        get(api.products, params).then((data) => {
            this.setState({products: data});
        });

        get(api.items, params).then((data) => {
            this.setState({items: data});
        });
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
            "status": "string"})

        post(api.products, newProduct).then(() => get(api.products, {page: 0}).then((data) => {
            this.setState({products: data});
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
        console.log(item)
    }

    openModal(item) {
        this.setState({modalIsOpen: true, newProduct: item});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {

        let comp_addItem = <AddItem
            callbacks={{add:this.addItem}}/>

        let comp_addProduct = <AddProduct
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            product = {this.state.newProduct}
            callbacks={{add:this.addProduct, close:this.closeModal}}/>

        let comp_searchBar = <SearchBar search4me={this.state.search4me}
                                        callbacks={{onUserInput: this.search}}/>

        let comp_itemList = <ItemList items={this.state.items}
                                      callbacks={{
                                          remove: this.removeItem,
                                          select: this.openModal
                                      }}/>

        let comp_productList = <ProductList products={this.state.products}
                                            callbacks={{
                                                remove: this.removeProduct
                                            }}/>


        return (
            <div className='container'>

                <div className="header col-12">
                    <Header/>
                    {comp_searchBar}
                    <p></p>

                </div>

                <div className="container">
                    <h2>Base Products</h2>

                    <div className="main col-10">
                        {comp_itemList}
                    </div>
                    <div className="col-2">
                        {comp_addItem}
                    </div>

                </div>

                <div className="container">
                    <h2>Commercial Products   <button onClick={this.openModal}>+</button></h2>

                    <div className=" col-1">
                        <p className="smalltext"></p>
                    </div>
                    <div className="main col-10">
                        {comp_productList}
                    </div>
                    <div className=" col-1">
                        <p className="smalltext"></p>
                    </div>
                </div>



                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Add New Product"
                >
                    {comp_addProduct}

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