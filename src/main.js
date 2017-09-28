import React, { Component } from 'react';
import { render } from 'react-dom';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    componentDidMount() {
    
        //fetch('http://i-products.herokuapp.com/api/products')
        fetch('http://localhost:9000/api/products')
            .then((response) => response.json())
            .then((responseData) => {
                 console.log(responseData);
                 this.setState({products: responseData._embedded.products});
        })
        .catch(err => {
            console.log(err);
        });    
    }

    render() {
        return (
            <ProductList products={this.state.products}/>
    )
    }
}

class ProductList extends React.Component{
    render() {
        var products = this.props.products.map(product =>
            <Product key={product._links.self.href} product={product}/>
        );
        return (
            <table>
            <tbody>
            <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Pieces.</th>
            <th>producer</th>
            </tr>
            {products}
            </tbody>
            </table>
    )
    }
}
class Product extends React.Component{
    render() {
        return (
            <tr>
            <td>{this.props.product.name}</td>
            <td>{this.props.product.category}</td>
            <td>{this.props.product.pieces}</td>
            <td>{this.props.product.producer}</td>
        </tr>
    )
    }
}

render( <App />, document.getElementById('root'))

