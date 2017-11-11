import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon} from 'react-bootstrap';

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
                    <Button onClick={this.select}>
                        <Glyphicon glyph="plus" />
                    </Button>
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

Item.propTypes = {
    item: PropTypes.object.isRequired,
    callbacks: PropTypes.object.isRequired
}

export default Item

                           
                           
