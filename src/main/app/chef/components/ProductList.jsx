import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Product from './Product.jsx';
import AddProduct from './AddProduct.jsx';

import { Table } from 'react-bootstrap';

class ProductList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        let filteredProducts = this.props.products.filter(
            (product) => product.name.indexOf(this.props.filterText) !== -1
        ).sort(
            (a, b) => {
                if( a.name > b.name) return 1
                if( a.name < b.name) return -1
                return parseInt(a.pieces)-parseInt(b.pieces)
            });
        ;

        var products = filteredProducts.map(product =>
            <Product
                key={product.name + product.pieces}
                product={product}
                callbacks={this.props.callbacks}/>
        );

        let addProduct = <AddProduct
            product = {this.props.product}
            callbacks={this.props.callbacks}/>


        return (
            <div>

                {addProduct}

                {(this.props.products.length > 0) ?
                    <Table responsive striped bordered condensed hover>
                        <tbody>
                        <tr>
                            <th>Produit</th>
                            <th>Pieces             </th>
                            <th>Producteur           </th>
                            <th>valide du          </th>
                            <th>au                 </th>
                            <th></th>
                        </tr>
                        {products}
                        </tbody>
                    </Table> : <p>no object found for this selection</p>}
            </div>
        )
    }
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    filterText: PropTypes.string,
    callbacks: PropTypes.object.isRequired
}

export default ProductList