import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon, FormGroup, ControlLabel, FormControl, InputGroup} from 'react-bootstrap';

class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "id": "",
            "created": "0001-01-01",
            "deadline": "0001-01-01",
            "quantity": 0,
            "producer": "",
        };

        this.select = this.select.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.getValidationState = this.getValidationState.bind(this)
        this.sendData = this.sendData.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)

    }

    componentDidMount() {
        this.setState({
                "id": this.props.order.id,
                "created": this.props.order.created,
                "deadline": this.props.order.deadline,
                "quantity": this.props.order.quantity,
                "producer": this.props.order.producer
            }
        )
    }

    select(e) {
        let attribute = e.target.id
        console.log('onClick ' + this.state.quantity)

        this.setState({
            quantity: ''
        })
    }


    sendData(e) {

        console.log("sendData " + this.state.quantity)
    }


    handleChange(e) {
        let attribute = e.target.id
        let value = e.target.value

        if (value < 0 || isNaN(value)) {
            console.log("invalid input " + value)
            return
        }
        console.log('before ' + this.state.quantity)
        this.setState({
            quantity: value
        })

    }

    getValidationState() {

        if (this.state.quantity > 0) return 'success';
        return 'error';
    }

    handleKeyUp(e) {
        const key = e.charCode || e.keyCode

        console.log(key);
        if (key == 13) {
            console.log("you  typed enter")
            this.refs.myInput.blur()
            //  e.preventDefault();
            //  e.stopPropagation();
        }

    }

    render() {

        console.log('render  ' + this.state.quantity)
        return (<tr>
                <td className={"col-md-2"}>{this.props.order.deadline}</td>
                <td className={"col-md-5"}>{this.props.order.product}</td>
                <td className={"col-md-5"}>

                    <input ref="myInput" type="text" value={this.state.quantity}
                           onChange={this.handleChange}
                           onClick={this.select}
                           onKeyDown={this.handleKeyUp}
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

                           
                           
