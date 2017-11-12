import React from 'react'
import PropTypes from 'prop-types';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';

const dummyProduct = {
    "category": "category",
    "created": "created",
    "id": 0,
    "name": "name",
    "pieces": "pieces",
    "producer": "producer",
    "status": "string"
}

class AddProduct extends React.Component {

    constructor(props) {
        super(props)

        this.state = dummyProduct;

        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.cancel = this.cancel.bind(this)
        this.defaultState = this.defaultState.bind(this)
        this.getValidationState = this.getValidationState.bind(this)

    }

    componentDidMount() {
        if (this.props.product == null) {
            this.setState(this.defaultState())
        } else {
            this.setState({
                    name: this.props.product.name,
                    category: this.props.product.category,
                    pieces: this.props.product.pieces,
                    producer: this.props.product.producer,
                    created: this.props.product.created
                }
            )
        }
    }

    defaultState() {
        return dummyProduct
    }


    handleChange(e) {
        let attribute = e.target.id
        this.setState({
            [attribute]: e.target.value
        })
    }

    submit(e) {
        let newProduct = {
            name: this.state.name,
            category: this.state.category,
            pieces: this.state.pieces,
            producer: this.state.producer,
            created: this.state.created
        }
        this.props.callbacks.add(newProduct)
        this.setState(this.defaultState())
    }

    cancel(e) {
        this.props.callbacks.cancel();
        this.setState(this.defaultState())
    }

    getValidationState(elem) {
        const length = this.state[elem].length;
        if (length > 5) return 'success';
        else if (length > 3) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    getValidationStatePieces() {

        if (this.state.pieces > 0) return 'success';
        return 'error';
    }

    render() {
        return (
            <form>
                <FormGroup
                    controlId="name"
                    validationState={this.getValidationState('name')}
                >
                    <ControlLabel>Name :</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.name}
                        placeholder={this.state.name}
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback/>

                </FormGroup>

                <FormGroup
                    controlId="category"
                    validationState={this.getValidationState('category')}
                >
                    <ControlLabel>Category :</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.category}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback/>
                </FormGroup>

                <FormGroup
                    controlId="producer"
                    validationState={this.getValidationState('producer')}
                >
                    <ControlLabel>Producer :</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.producer}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback/>
                </FormGroup>

                <FormGroup
                    controlId="pieces"
                    validationState={this.getValidationStatePieces()}
                >
                    <ControlLabel>Number of pieces :</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.pieces}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback/>
                </FormGroup>

                <FormGroup
                    controlId="created"
                    validationState={this.getValidationState('created')}
                >
                    <ControlLabel>Creation Date :</ControlLabel>
                    <FormControl
                        type="date"
                        value={this.state.created}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback/>
                </FormGroup>

                <Button onClick={this.cancel}>
                    Cancel
                </Button>
                <Button bsStyle="primary" onClick={this.submit}>
                    Add
                </Button>

            </form>
        )
    }

}


AddProduct.propTypes = {
    products: PropTypes.object,
    callbacks: PropTypes.object.isRequired
}

export default AddProduct