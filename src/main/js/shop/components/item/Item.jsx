import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Item extends Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.select = this.select.bind(this)
    }

    remove() {
        this.props.callbacks.remove(this.props.item.id);
    }

    select() {

        this.props.callbacks.select({
            name: this.props.item.name,
            category: this.props.item.category,
            pieces: 0,
            producer: this.props.item.producer,
            created: "2017-10-13"
        })
    }

    render() {
        return (<tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.category}</td>
                <td>{this.props.item.producer}</td>
                <td>
                    <button onClick={this.select}>
                        +
                    </button>
                </td>
                <td>
                    <button onClick={this.remove}>
                        X
                    </button>
                </td>
            </tr>
        )
    }
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    callbacks: PropTypes.object.isRequired
}

export default Item

                           
                           
