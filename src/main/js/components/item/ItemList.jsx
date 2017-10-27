import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from './Item.jsx';

class ItemList extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        var items = this.props.items.map(item =>
            <Item
                key={item.id}
                item={item}
                callbacks={this.props.callbacks}
            />
        );
        return (
            <div>
                {(this.props.items.length > 0) ?

                    <table>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Producer</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {items}
                        </tbody>
                    </table> : <p>no object found for this selection</p>}
            </div>
        )
    }
}

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    callbacks: PropTypes.object.isRequired
}

export default ItemList