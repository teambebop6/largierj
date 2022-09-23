import React from 'react';

import { Form } from 'semantic-ui-react';

const SingleLineTextField = props => (
  <Form.Field>
    <label
      htmlFor={props.name}
    >
      {props.title}
    </label>
    <input
      name={props.name}
      type="text"
      value={props.value}
      onChange={props.onChange}
    />
  </Form.Field>
);

export default SingleLineTextField;
