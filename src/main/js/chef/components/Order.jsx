import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon} from 'react-bootstrap';

class Order extends Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    remove() {
        this.props.callbacks.remove(this.props.order.id);
    }


    render() {
        return (<tr>
                <td>{this.props.order.product}</td>
                <td>{this.props.order.pieces}</td>
                <td>{this.props.order.quantity}</td>
                <td>{this.props.order.deadline}</td>
                <td>{this.props.order.shop}</td>
                <td>
                    <Button onClick={this.remove}>
                        <Glyphicon glyph="remove-sign"/>
                    </Button>
                </td>
            </tr>
        )
    }
}




Order.propTypes = {
    order: PropTypes.object.isRequired,
}

export default Order

                           
                           
