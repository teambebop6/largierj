/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { authenticate } from '../../modules/auth';
import Logo from '../../../res/images/logo_squared.png';
import './LoginPage.less';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
      },
    };
    this.onChange = (e) => {
      const { value } = this.state;
      value[e.target.name] = e.target.value;
      this.setState({
        value,
      });
    };
    this.onSubmit = (e) => {
      e.preventDefault();
      const { authenticate: ath, changePage } = props;
      const { username, password } = this.state.value;
      ath(username, password).then(() => {
        changePage('/admin/events/');
      });
    };
  }

  render() {
    return (
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src={Logo} />
              {' '}Login to Dashboard
            </Header>
            <Form size="large" method="post">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={this.state.value.username}
                  name="username"
                  onChange={this.onChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.value.password}
                  name="password"
                  onChange={this.onChange}
                />
                <Button
                  color="teal"
                  fluid
                  size="large"
                  disabled={this.props.isAuthenticating}
                  onClick={this.onSubmit}
                >
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  isAuthenticating: state.auth.isAuthenticating,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  authenticate,
  changePage: path => push(path),
}, dispatch);

Login.propTypes = {
  isAuthenticating: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
