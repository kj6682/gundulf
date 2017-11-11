import React from 'react'
import PropTypes from 'prop-types';
import AddItemForm from "./AddItemForm.jsx";
import {Button, Panel, Glyphicon, Grid, Row, Col} from 'react-bootstrap';

class AddItem extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            open: false,
            icon: 'plus'
        };
    }

    render() {

        let addItemForm = <AddItemForm
            callbacks={{add: this.props.callbacks.add}}/>

        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={10}>
                            This is the list of the basic products. These products are the components of the commercial products that can
                            be used in orders. Each of these products must be associated with a recipe.
                            These products can be thought more as items or component of richer elements.
                            <p>&nbsp;</p></Col>
                        <Col xs={12} md={2}>
                            <Button onClick={() => this.setState({ open: !this.state.open, icon: (this.state.icon ==='plus')?'minus':'plus' })}>

                                <Glyphicon glyph={this.state.icon} />

                            </Button>
                        </Col>
                    </Row>
                </Grid>

                <Panel collapsible expanded={this.state.open}>

                    {addItemForm}

                </Panel>

            </div>
        );
    }
}
export default AddItem