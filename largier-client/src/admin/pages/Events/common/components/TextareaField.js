import React from 'react';

import { Form } from 'semantic-ui-react';

export default function Textarea(props){
  return (
    <Form.Field>
      <label>{props.title}</label>
      <textarea 
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      >
      </textarea>
    </Form.Field>
  )
}
