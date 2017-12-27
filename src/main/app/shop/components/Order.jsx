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
        this.handleClick = this.handleClick.bind(this)
        this.onSubmit = this.onSubmit(this)
        this.getValidationState = this.getValidationState.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.sendData = this.sendData.bind(this)

    }

    componentDidMount() {
        this.setState({
                id: this.props.order.id,
                quantity: this.props.order.quantity,
                deadline: this.props.order.deadline
            }
        )
    }

    select() {


    }

    handleClick(e) {
        let attribute = e.target.id
        console.log(attribute)
        console.log(e.target.value)

        this.setState({
            [attribute]: ''
        })
    }

    onSubmit(e) {
       console.log("onSubmit")
    }

    sendData(e) {
        e.preventDefault()
        console.log("sendData")
    }

    handleKeyUp(e) {
        if (e.keyCode == 13) return this.sendData()
    }

    handleChange(e) {
        console.log("handleChange")
        let attribute = e.target.id
        console.log(attribute)
        console.log(e.target.value)

        this.setState({
            [attribute]: e.target.value
        })
    }

    getValidationState() {

        if (this.state.quantity > 0) return 'success';
        return 'error';
    }

    render() {


        return (<tr>
                <td className={"col-md-2"}>{this.props.order.deadline}</td>
                <td className={"col-md-5"}>{this.props.order.product}</td>
                <td className={"col-md-5"}>

                    <form onKeyUp={this.handleKeyUp}>

                        <FormGroup
                            controlId={"quantity"}
                            validationState={this.getValidationState()}
                        >
                            <InputGroup>
                                <FormControl
                                    type="input"
                                    value={this.state.quantity}
                                    placeholder={this.state.quantity}
                                    onChange={this.handleChange}
                                    onClick={this.handleClick}

                                />
                            </InputGroup>

                        </FormGroup>
                    </form>
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

                           
                           
