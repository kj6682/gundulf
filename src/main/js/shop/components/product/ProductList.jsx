import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Product from './Product.jsx';

class ProductList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var products = this.props.products.map(product =>
            <Product
                key={product.id}
                product={product}
                callbacks={this.props.callbacks}/>
        );


        return (
            <div>
                {(this.props.products.length > 0) ?
                    <table>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Category           </th>
                            <th>Pieces             </th>
                            <th>Producer           </th>
                            <th></th>
                        </tr>
                        {products}
                        </tbody>
                    </table> : <p>no object found for this selection</p>}
            </div>
        )
    }
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    callbacks: PropTypes.object.isRequired
}

export default ProductList