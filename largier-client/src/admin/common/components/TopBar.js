/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { Menu, Icon, Image, Button } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../../../res/images/logo.png';


const logout = () => {
  localStorage.removeItem('admin');
  push('/login');
};

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <Menu size="large" stackable>
        <Menu.Item>
          <Image size="small" src={Logo} />
        </Menu.Item>

        <Menu.Item
          name="events"
          active={pathname.startsWith('/admin/events/')}
          as={Link}
          to="/admin/events/"
        >
          Events verwalten
        </Menu.Item>
        <Menu.Item
          name="configuration"
          active={pathname.startsWith('/admin/configuration/')}
          as={Link}
          to="/admin/configuration/"
        >
          Configuration
        </Menu.Item>
        <Menu.Menu position="right">
          {
            pathname === '/admin/events/' &&
            (
                <Menu.Item
                  as={Link}
                  to="/admin/events/add"
                >
                  <Button primary>Create New</Button>
                </Menu.Item>
            )
          }
          <Menu.Item
            as={Link}
            to="/"
          >
            <Icon name="home" />
            Back to Homepage
          </Menu.Item>
          <Menu.Item
            icon
            as={Link}
            to="#"
            onClick={logout}
          >
            <Icon name="sign out" />

          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(TopBar);
