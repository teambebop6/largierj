import React, { Component } from 'react';
import path from 'path';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditItemForm from './common/components/EditItemForm';
import { post } from '../../../common/helpers/api';
import { apiBasePath } from './common/globals';

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        id: '',
        title: '',
        location: '',
        type: '',
        visible: false,
        date: Date.Now,
        avatar: null,
      },
    };

    this.submit = this.submit.bind(this);
  }

  // Form submit
  submit(data, imageFile) {
    const formData = new FormData();
    formData.append('event', JSON.stringify(data));
    formData.append('file', imageFile);
    const { history } = this.props;

    post(path.join(apiBasePath, '/add2'), formData, {
      headers: {
        Authorization: this.props.authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          history.push('./');
        }
      })
      .catch(err => err);
  }

  render() {
    return (
      <EditItemForm
        submit={this.submit}
        history={this.props.history}
        title="Create new event"
        item={this.state.item}
      />
    );
  }
}

const mapStateToProps = state => ({
  authorization: `Bearer ${state.auth.token}`,
});

Add.propTypes = {
  history: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Add);
