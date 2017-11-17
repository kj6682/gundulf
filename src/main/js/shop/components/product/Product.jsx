import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon} from 'react-bootstrap';

class Product extends Component {
   constructor(props) {
        super(props);
        this.select= this.select.bind(this);
    }


    select() {

        this.props.callbacks.select({
            name: this.props.product.name,
            category: this.props.product.category,
            pieces: this.props.product.pieces,
            producer: this.props.product.producer,
            created: "2017-10-13"
        })
    }

    render() {
        return (<tr>
                  <td>{this.props.product.name} </td>
                  <td>{this.props.product.pieces}</td>
                  <td>{this.props.product.category}</td>

                  <td>
                      <Button onClick={this.select}>
                          <Glyphicon glyph="plus-sign" />
                      </Button>
                  </td>     
                </tr>
               )
    } 
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  callbacks: PropTypes.object.isRequired,
}
    
export default Product     

                           
                           
