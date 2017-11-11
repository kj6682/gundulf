import React from 'react'
import PropTypes from 'prop-types';

class AddProduct extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: 'product',
            category: 'category',
            pieces: '1',
            producer: 'producer',
            created: '2017-07-13',
            isChecked: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.cancel = this.cancel.bind(this)
        this.defaultState = this.defaultState.bind(this)
        this.toggleChange = this.toggleChange.bind(this)
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
        return {
            name: 'product',
            category: 'category',
            pieces: '1',
            producer: 'producer',
            created: '2017-07-13'
        }
    }

    handleClick(e) {
        let attribute = e.target.id
        this.setState({
            [attribute]: ''
        })
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
        if (!this.state.isChecked) {
            this.props.callbacks.close()
        }
        ;
    }

    cancel(e) {
        this.setState(this.defaultState())
        this.props.callbacks.close();
    }

    toggleChange() {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }

    render() {
        return (
            <div>
                <p>Add a new product</p>
                <p><input id="name"     onClick ={this.handleClick} onChange={this.handleChange} value={this.state.name}/></p>
                <p><input id="category" onClick ={this.handleClick} onChange={this.handleChange} value={this.state.category} /></p>
                <p><input id="pieces"   onClick ={this.handleClick} onChange={this.handleChange} value={this.state.pieces} /></p>
                <p><input id="producer" onClick ={this.handleClick} onChange={this.handleChange} value={this.state.producer} /></p>
                <p><input id="created"  onClick ={this.handleClick} onChange={this.handleChange} value={this.state.created} /></p>
                <p><button onClick={this.cancel}>Cancel</button>
                    <button onClick={this.submit}>Add</button>
                </p>
            </div>
        )
    }

}


AddProduct.propTypes = {
    products: PropTypes.object,
    callbacks: PropTypes.object.isRequired
}

export default AddProduct