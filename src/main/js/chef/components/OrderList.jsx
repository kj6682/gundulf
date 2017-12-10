import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Order from './Order.jsx';

import { Table } from 'react-bootstrap';

class OrderList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        var orders = this.props.orders.map(order =>
            <Order
                key={order.id}
                order={order}/>
        );


        return (
            <div>

                {(this.props.orders.length > 0) ?
                    <Table responsive striped bordered condensed hover>
                        <tbody>
                        <tr>
                            <th>Product             </th>
                            <th>Pieces             </th>
                            <th>Quantity             </th>
                            <th>deadline             </th>
                            <th>Shop             </th>

                            <th></th>
                        </tr>
                        {orders}
                        </tbody>
                    </Table> : <p>no object found for this selection</p>}
            </div>
        )
    }
}

OrderList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.object),
}

export default OrderList