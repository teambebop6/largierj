import React, { Component } from 'react';
import { connect } from 'react-redux';
import path from 'path';
import EditItemForm from './common/components/EditItemForm';
import { get, post } from '../../../common/helpers/api';
import { apiBasePath } from './common/globals';

class Modify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
        id: '',
        title: '',
        detail: '',
        visible: false,
        imageURI: null,
      },
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    get(path.join(apiBasePath, `/item/${this.props.match.params.id}?update=true`), {
      headers: {
        Authorization: this.props.authorization,
      },
    }).then((res) => {
      console.log(res);
      this.setState({ item: res.data });
    });
  }

  // Form submit
  submit(data, imageFile, onFail) {
    // TODO update do not support update imageURI now
    const { history } = this.props;

    const formData = new FormData();
    formData.append('event', JSON.stringify(data));
    formData.append('file', imageFile);

    // Update
    post(path.join(apiBasePath, `/item/${this.state.item.id}`), formData, {
      headers: {
        Authorization: this.props.authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          history.push('../');
        }
      })
      .catch((err) => {
        console.error(err);
        if (onFail) {
          onFail();
        }
      });
  }

  render() {
    return (
      <EditItemForm
        item={this.state.item}
        history={this.props.history}
        submit={this.submit}
        title="Modify event"
      />
    );
  }
}

const mapStateToProps = state => ({
  authorization: `Bearer ${state.auth.token}`,
  item: state.event.eventFetched,
});

export default connect(mapStateToProps)(Modify);
