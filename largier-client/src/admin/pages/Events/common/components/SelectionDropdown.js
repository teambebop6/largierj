import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'

function DropdownField({title, name, options}){
  return(
    <Form.Field>
      <label>{title}</label>
      <Dropdown name={name} placeholder='Please select' fluid selection options={options} />
    </Form.Field>
  )
}

export default class EventSelectionDropdown extends Component{

  state = {
    selectedItem: null
  }

  render(){
    return <DropdownField {...this.props} />
  }
}
