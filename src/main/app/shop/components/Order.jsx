import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon} from 'react-bootstrap';

class Order extends Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
    }


    select() {


    }

    render() {


        return (<tr>
                  <td>{this.props.order.deadline}</td>
                  <td>{this.props.order.product}</td>
                  <td>{this.props.order.quantity}</td>
                </tr>
        )
    }
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
    callbacks: PropTypes.object.isRequired,
}

export default Order

                           
                           
