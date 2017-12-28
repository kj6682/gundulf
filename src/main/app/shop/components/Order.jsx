import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon, FormGroup, ControlLabel, FormControl, InputGroup} from 'react-bootstrap';

class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "order": '',
            "quantity": 0
        };

        this.select = this.select.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.sendData = this.sendData.bind(this)
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
        this.props.callbacks.create(o)
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
        const key = e.charCode || e.keyCode

        if (key == 27) {
            this.setState({
                quantity: this.props.order.quantity
            })
            this.refs.myInput.blur()

        }
        if (key == 13) {
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
            </tr>
        )
    }
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
    callbacks: PropTypes.object.isRequired,
}

export default Order

                           
                           
