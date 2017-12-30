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

        let filteredTodos = this.props.orders.filter(
            (order) => order.product.indexOf(this.props.filterText) !== -1
        ).sort(
            (a, b) => {
                if( a.deadline > b.deadline) return 1
                if( a.deadline < b.deadline) return -1
                var aa = a.product.split("-")
                var bb = b.product.split("-")
                if( aa[0] > bb[0] ) return 1
                if( aa[0] < bb[0] ) return -1

                return parseInt(aa[1])-parseInt(bb[1])
            });

        var orders = filteredTodos.map(todo =>
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