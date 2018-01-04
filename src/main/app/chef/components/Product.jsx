import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon} from 'react-bootstrap';

class Product extends Component {
   constructor(props) {
        super(props);
        this.remove= this.remove.bind(this);
    }
    
    remove(){
        this.props.callbacks.remove(this.props.product.name, this.props.product.pieces);
    }
    
    
    render() {
        return (<tr>
                  <td>{this.props.product.name}</td>
                  <td>{this.props.product.pieces}</td>
                  <td>{this.props.product.producer}</td>
                  <td>{this.props.product.startDate}</td>
                  <td>{this.props.product.endDate}</td>

                <td>
                      <Button onClick={this.remove}>
                          <Glyphicon glyph="remove-sign" />
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

                           
                           
