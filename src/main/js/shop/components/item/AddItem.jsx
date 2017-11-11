import React from 'react'
import PropTypes from 'prop-types';

class AddItem extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      name: 'product',
      category: 'category',
      producer: 'producer',
    }
   
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.defaultState = this.defaultState.bind(this)

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
  
  handleClick(e) {
    let attribute = e.target.id
    this.setState({
      [attribute]: ''
    })
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

  render() {
    return (
    <div>
      <p>Add a new base product</p>
      <p><input id="name"     onClick ={this.handleClick} onChange={this.handleChange} value={this.state.name}/></p>
      <p><input id="category" onClick ={this.handleClick} onChange={this.handleChange} value={this.state.category} /></p>
      <p><input id="producer" onClick ={this.handleClick} onChange={this.handleChange} value={this.state.producer} /></p>
      <p><button onClick={this.cancel}>Cancel</button>
         <button onClick={this.submit}>Add</button></p>
    </div>
    )
  }
}


AddItem.propTypes = {

  callbacks: PropTypes.object.isRequired
}

export default AddItem