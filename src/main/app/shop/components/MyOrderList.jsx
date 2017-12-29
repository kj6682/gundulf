import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MyOrder from './MyOrder.jsx';


import { Table } from 'react-bootstrap';

class MyOrderList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {


        var orders = this.props.orders.map(order =>
            <MyOrder
                key={order.id+order.deadLineAndProduct}
                order={order}
                callbacks={this.props.callbacks}/>
        );

        return (
            <div>


                {(this.props.orders.length > 0) ?
                    <Table responsive striped bordered condensed hover>
                        <tbody>
                        <tr>
                            <th>deadline</th>
                            <th>product</th>
                            <th>quantity</th>
                            <th></th>
                        </tr>
                        {orders}
                        </tbody>
                    </Table> : <p>no object found for this selection</p>}
            </div>
        )

    }
}

MyOrderList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.object),
    callbacks: PropTypes.object.isRequired
}

export default MyOrderList