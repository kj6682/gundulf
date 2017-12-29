import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon, FormGroup, ControlLabel, FormControl, InputGroup} from 'react-bootstrap';

class MyOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "order": '',
            "quantity": 0
        };

        this.select = this.select.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.sendData = this.sendData.bind(this)
        this.remove = this.remove.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)

    }

    componentDidMount() {
        this.setState({
                "order":this.props.order,
                "quantity":this.props.order.quantity
            }
        )
    }

    select(e) {
        let attribute = e.target.id

        this.setState({
            quantity: ''
        })
    }


    sendData(e) {

        let o = this.state.order
        o.quantity = this.state.quantity
        o.executed = 0

        var order = JSON.stringify({
            "id": o.id,
            "created": o.created,
            "deadline": o.deadline,
            "producer": o.producer,
            "product": o.product,
            "shop": o.shop,
            "quantity": o.quantity
        })

        if ((o.id === 0) && (o.quantity > 0)) {
            this.props.callbacks.create(order)
            return
        }
        if ((o.id !== 0) && (o.quantity > 0)) {
            this.props.callbacks.update(o.id, order)
            return
        }
        this.setState({
            quantity: this.props.order.quantity
        })
    }

    remove(e) {

        let o = this.state.order
        if ( o.id !== 0 ) {
            this.props.callbacks.delete(o.id)
            return
        }
        this.setState({
            quantity: this.props.order.quantity
        })
    }


    handleChange(e) {
        let attribute = e.target.id
        let value = e.target.value

        if (value < 0 || isNaN(value)) {
            this.setState({
                quantity: this.props.order.quantity
            })
            return
        }
        this.setState({
            quantity: value
        })

    }


    handleKeyDown(e) {
        const ESC = 27
        const ENTER = 13
        const key = e.charCode || e.keyCode

        if (key == ESC) {
            this.setState({
                quantity: this.props.order.quantity
            })
            this.refs.myInput.blur()

        }

        if (key == ENTER) {
            this.refs.myInput.blur()
        }


    }

    render() {

        return (<tr>
                <td className={"col-md-2"}>{this.props.order.deadline}</td>
                <td className={"col-md-5"}>{this.props.order.product}</td>
                <td className={"col-md-5"}>

                    <input ref="myInput" type="text" value={this.state.quantity}
                           onChange={this.handleChange}
                           onClick={this.select}
                           onKeyDown={this.handleKeyDown}
                           onBlur={this.sendData}/>

                </td>
                <td>
                    <Button onClick={this.remove}>
                        <Glyphicon glyph="remove-sign" />
                    </Button>
                </td>
            </tr>
        )
    }
}

MyOrder.propTypes = {
    order: PropTypes.object.isRequired,
    callbacks: PropTypes.object.isRequired,
}

export default MyOrder

                           
                           
