import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap';

class Product extends Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    remove() {
        this.props.callbacks.remove(this.props.product.name, this.props.product.pieces);
    }


    render() {
        return (

                <Col xs={12} md={3} className='card'>

                        <div className="container">
                            <h4><b>{this.props.product.name}</b> ({this.props.product.pieces})</h4>

                            <p>{this.props.product.producer}</p>
                            <p>valide du : {this.props.product.startDate}</p><p> au : {this.props.product.endDate} </p>
                            <Button onClick={this.remove}>
                                <Glyphicon glyph="remove-sign"/>
                            </Button>
                        </div>


                </Col>

        )
    }
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
    callbacks: PropTypes.object.isRequired,
}

export default Product     

                           
                           
