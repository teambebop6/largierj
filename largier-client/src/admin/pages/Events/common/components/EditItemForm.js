import React, { Component } from 'react';

import { Form, Button, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import TopBar from '../../../../common/components/TopBar';

// Fields
import SingleLineTextField from './SingleLineTextField';
import DateField from './DateField';

import '../../../../../../node_modules/pickerjs/dist/picker.css';

class EditItemForm extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      files: [],
    };
  }

  onFileChange(e) {
    const { files } = this.state;

    let file = files.find(f => Object.keys(f)[0] === e.target.name);

    if (file === undefined) {
      file = {};
      file[e.target.name] = e.target.files[0];

      files.push(file);
    } else {
      file[e.target.name] = e.target.files[0];
      const index = files.indexOf(file);
      files[index] = file;
    }

    this.setState({ files });
  }

  onCheckboxChange(e) {
    this.props.item[e.target.name] = e.target.checked;
    this.forceUpdate();
  }

  onChange(e) {
    this.props.item[e.target.name] = e.target.value;
    this.forceUpdate();
  }

  submit(e) {
    e.preventDefault();

    const formData = new FormData();

    if (this.typeField && this.typeField.value) {
      this.props.item.type = this.typeField.value;
    }

    formData.append('item', JSON.stringify(this.props.item));

    // Add files
    this.state.files.forEach((file) => {
      const key = Object.keys(file)[0];
      formData.append(key, file[key]);
    });

    // Refer to parent handler
    // TODO
    // this.props.submit(formData);
    this.props.submit(this.props.item);
  }


  render() {
    const { item } = this.props;

    return (
      <div>
        <TopBar />

        <div className="ui page grid">
          <div className="two column row">
            <div className="column">

              <h3>{this.props.title}</h3>

              <Form encType="multipart/form-data" onSubmit={this.submit}>
                <input
                  name="id"
                  type="hidden"
                  value={item.id}
                  onChange={this.onChange}
                />

                <Form.Field>
                  <label htmlFor="title">
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    value={item.title || ''}
                    onChange={this.onChange}
                  />
                </Form.Field>

                <SingleLineTextField
                  name="location"
                  title="Location"
                  value={item.location || ''}
                  onChange={this.onChange}
                />

                <SingleLineTextField
                  name="venue"
                  title="Venue"
                  value={item.venue || ''}
                  onChange={this.onChange}
                />

                <SingleLineTextField
                  name="link"
                  title="Link"
                  value={item.link || ''}
                  onChange={this.onChange}
                />

                <DateField
                  onChange={this.onChange}
                  value={item.date || ''}
                  title="Date"
                  name="date"
                />

                <input
                  type="hidden"
                  name="type"
                  value="concert"
                  ref={(field) => {
                    this.typeField = field;
                  }}
                />

                <Form.Field>
                  <Checkbox
                    slider
                    checked={item.visible}
                    id="visible"
                    name="visible"
                    label="Visible?"
                    onChange={this.onCheckboxChange}
                  />
                </Form.Field>
                <div className="ui buttons">
                  <Button type="submit" className="ui primary button">Submit</Button>
                  <div className="or" />
                  <button type="cancel" className="ui button">Cancel</button>
                </div>
              </Form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditItemForm.propTypes = {
  title: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

export default EditItemForm;
