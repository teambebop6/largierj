import React, { Component } from 'react';

import { Form, Button, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ImageUploading from 'react-images-uploading';

import TopBar from '../../../../common/components/TopBar';

// Fields
import SingleLineTextField from './SingleLineTextField';
import DateField from './DateField';

import '../../../../../../node_modules/pickerjs/dist/picker.css';

class EditItemForm extends Component {
  constructor(props) {
    super(props);

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.submit.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.state = {
      images: [],
    };
  }

  onChange2(imageList, addUpdateIndex) {
    // data for submit
    console.log(imageList, addUpdateIndex);
    this.setState({
      images: imageList,
    });
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
    const imageFile = (this.state.images && this.state.images[0]) ?
      this.state.images[0].file :
      null;
    this.props.submit(this.props.item, imageFile);
  }

  cancel() {
    const { history } = this.props;
    history.goBack();
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

              <Form encType="multipart/form-data">
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
                  {
                    this.props.item.imageURI &&
                    <img
                      className="ui fluid image bordered"
                      src={this.props.item.imageURI}
                      alt=""
                    />
                  }
                  {
                    !this.props.item.imageURI &&
                    <ImageUploading
                      multiple
                      value={this.state.images}
                      onChange={this.onChange2}
                      maxNumber={1}
                      dataURLKey="data_url"
                      acceptType={['jpg', 'png', 'jpeg']}
                    >
                      {({
                          imageList,
                          onImageUpload,
                          onImageUpdate,
                          onImageRemove,
                          // isDragging,
                          dragProps,
                        }) => (
                        // write your building UI
                        <div>
                          {
                            (!this.props.item.imageURI &&
                              (!this.state.images || this.state.images.length === 0)) &&
                            <button
                              className="ui button right floated"
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Choose picture
                            </button>
                          }
                          {imageList.map((image, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={index} className="image-item">
                              <img
                                className="ui fluid image bordered"
                                src={image.data_url}
                                alt=""
                              />
                              <div
                                className="ui basic buttons right floated"
                                style={{
                                  marginTop: 10,
                                }}
                              >
                                <button
                                  className="ui button"
                                  onClick={() => onImageUpdate(index)}
                                >
                                  Update
                                </button>
                                <button
                                  className="ui button"
                                  onClick={() => onImageRemove(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ImageUploading>
                  }
                </Form.Field>
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
                <div className="ui inverted divider" />
                <div className="ui buttons">
                  <Button className="ui primary button" onClick={this.submit}>Submit</Button>
                  <div className="or" />
                  <button type="cancel" className="ui button" onClick={this.cancel}>Cancel</button>
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
  history: PropTypes.object.isRequired,
};

export default EditItemForm;
