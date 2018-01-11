import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Product from './Product.jsx';
import AddProduct from './AddProduct.jsx';

import { Grid, Row } from 'react-bootstrap';

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
                    <Grid>
                        <Row className="show-grid">
                            {products}
                        </Row>

                    </Grid> : <p>no object found for this selection</p>}
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