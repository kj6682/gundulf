import React from 'react'
import PropTypes from 'prop-types';
import {FormGroup, FromGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

const today = new Date()

class OrderForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            quantity: '',
            date: ''
        }

        this.submit = this.submit.bind(this)
        this.cancel = this.cancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.validateDate = this.validateDate.bind(this)
        this.validateNumber = this.validateNumber.bind(this)

    }

    componentDidMount() {
        console.log(this.props.date)
        this.setState({date: this.props.date })


    }

    handleChange(e) {
        let attribute = e.target.id
        this.setState({
            [attribute]: e.target.value
        })
    }

    submit(e) {
        let order = {
            name: this.props.name,
            category: this.props.category,
            producer: this.props.producer,
            pieces: this.props.pieces,
            quantity: this.state.quantity,
            date: this.state.date
        }
        this.props.callbacks.add(order)
    }

    cancel(){
        this.props.callbacks.cancel()
    }

    validateNumber(elem) {
        const length = this.state[elem].length;
        if (length <= 0 ) return 'error';
        const value = this.state[elem]
        if( this.state[elem] <= 0 || this.state[elem] > 1000) return 'error'
        return 'success';
    }

    validateDate(elem) {
        var parts = this.state[elem].split("-");
        var dt = new Date(parseInt(parts[0], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[2], 10));
        var today100 = today.getTime() + (100* 86400000)

        if(dt > (today100) || dt < today) return 'error'

        return 'success';
    }

    render() {
        return (
            <form>

                <FormGroup
                    controlId="quantity"
                    validationState={this.validateNumber('quantity')}
                >
                    <ControlLabel>Quantity</ControlLabel>
                    <FormControl
                        type="number"
                        value={this.state.quantity}
                        placeholder={''}
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback/>

                </FormGroup>

                <FormGroup
                    controlId="date"
                    validationState={this.validateDate('date')}
                >
                    <ControlLabel>Date :</ControlLabel>
                    <FormControl
                        type="date"
                        value={this.state.date}
                        placeholder="Enter date"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback/>
                </FormGroup>

                <Button onClick={this.cancel}>
                    Cancel
                </Button>
                <Button onClick={this.submit}>
                    Add
                </Button>
            </form>
        )
    }
}


OrderForm.propTypes = {

    callbacks: PropTypes.object.isRequired
}

export default OrderForm