import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo.jsx';
import { Table } from 'react-bootstrap';
var config = require('./config.json')

class TodoList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        var orders = this.props.todos.map(todo =>
            <Todo
                key={todo.product}
                todo={todo}/>
        );


        return (
            <div>
                <p>{config.todos}</p>

                {(this.props.todos.length > 0) ?
                    <Table responsive striped bordered condensed hover>
                        <tbody>
                        <tr>
                            <th>Deadline            </th>
                            <th>Product             </th>
                            <th>Quantity            </th>
                        </tr>
                        {orders}
                        </tbody>
                    </Table> : <p>no object found for this selection</p>}
            </div>
        )
    }
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
}

export default TodoList