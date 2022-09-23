/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import Logo from '../../../res/images/logo.png';


const logout = () => {
  localStorage.removeItem('admin');
  push('/login');
};

export default class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="large" stackable>
        <Menu.Item>
          <Image size="small" src={Logo} />
        </Menu.Item>

        <Menu.Item
          name="events"
          active={activeItem === 'events'}
          onClick={this.handleItemClick}
          as={Link}
          to="/admin/events/"
        >
          Events verwalten
        </Menu.Item>
        <Menu.Item
          name="configuration"
          active={activeItem === 'configuration'}
          onClick={this.handleItemClick}
          as={Link}
          to="/admin/configuration/"
        >
          Configuration
        </Menu.Item>
        <Menu.Menu position="right">
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
