/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TopBar from '../common/components/TopBar';
import { authenticate } from '../modules/auth';

class Home extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Redirect to="/admin/events/" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  authenticate,
  changePage: path => push(path),
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Home);
