import React from 'react';

import { Menu } from 'semantic-ui-react';

import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../node_modules/moment/locale/de';

import i18n from '../../i18n';

import './TopRightLinks.less';
import { changeLocate } from '../../default/modules/settings';

class TopRightLinks extends React.Component {
  constructor(props) {
    super(props);
    this.selectLanguage = this.selectLanguage.bind(this);
  }

  selectLanguage(lng) {
    moment.locale(lng);
    i18n.changeLanguage(lng);
    const { changeLocate: changeLocateFunc } = this.props;
    // invoke reducer method to change redux state
    changeLocateFunc(lng);
  }

  render() {
    return (
      <Menu secondary inverted className="topRightLinksMenu">
        <Menu.Item link onClick={() => this.selectLanguage('en')}>
          EN
        </Menu.Item>
        <Menu.Item link onClick={() => this.selectLanguage('de')}>
          DE
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  locate: state.settings.locate,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeLocate,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopRightLinks);
