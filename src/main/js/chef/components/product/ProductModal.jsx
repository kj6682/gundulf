import React from 'react'
import PropTypes from 'prop-types';

import {Button, Modal} from 'react-bootstrap';

class ProductModal extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            show: false,
        };
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    componentDidMount() {
        this.setState({show: this.props.show})
    }

    open(){
        console.log(this.props.callbacks)
        this.props.callbacks.open()
    }

    close(){
        console.log(this.props.callbacks)
        this.props.callbacks.close()
    }

    render() {

        return (
            <Modal
                show={this.state.show}
                onHide={this.close}
                container={this}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.product}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ProductModal