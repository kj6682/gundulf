import React from 'react'
import PropTypes from 'prop-types';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';

class AddItemForm extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      name: 'product',
      category: 'category',
      producer: 'producer',
    }
   
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.defaultState = this.defaultState.bind(this)

    this.getValidationState = this.getValidationState.bind(this)

  }
  
  componentDidMount(){
      this.setState(this.defaultState())
  }   
    
  defaultState(){
      return {
      name: 'product',
      category: 'category',
      producer: 'producer',
    }
  }    

  handleChange(e) {
    let attribute = e.target.id
    this.setState({
      [attribute]: e.target.value
    })
  }

  submit(e) {
    let newItem = {
      name: this.state.name,
      category: this.state.category,
      producer: this.state.producer,
    }
    this.props.callbacks.add(newItem)
    this.setState(this.defaultState())  
  }
  
  cancel(e) {
    this.setState(this.defaultState())  
  }

  getValidationState(elem) {
    const length = this.state[elem].length;
    if (length > 5) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }


  render() {
    return (
    <form>

      <FormGroup
          controlId="name"
          validationState={this.getValidationState('name')}
      >
        <FormControl
            type="text"
            value={this.state.name}
            placeholder={this.state.name}
            onChange={this.handleChange}
        />
        <FormControl.Feedback />

      </FormGroup>

      <FormGroup
          controlId="category"
          validationState={this.getValidationState('category')}
      >
        <FormControl
            type="text"
            value={this.state.category}
            placeholder="Enter text"
            onChange={this.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>

      <FormGroup
          controlId="producer"
          validationState={this.getValidationState('producer')}
      >
        <FormControl
            type="text"
            value={this.state.producer}
            placeholder="Enter text"
            onChange={this.handleChange}
        />
        <FormControl.Feedback />
      </FormGroup>

      <Button  onClick={this.cancel}>
        Cancel
      </Button>
      <Button  bsStyle="primary"onClick={this.submit}>
        Add
      </Button>


    </form>
    )
  }
}


AddItemForm.propTypes = {

  callbacks: PropTypes.object.isRequired
}

export default AddItemForm