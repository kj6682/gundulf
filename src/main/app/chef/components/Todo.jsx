import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Glyphicon} from 'react-bootstrap';

class Todo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<tr>
                <td className={"col-md-2"}>{this.props.todo.deadline}</td>
                <td className={"col-md-5"}>{this.props.todo.product}</td>
                <td className={"col-md-5"}>{this.props.todo.quantity}</td>
            </tr>
        )
    }
}




Todo.propTypes = {
    todo: PropTypes.object.isRequired,
}

export default Todo

                           
                           
