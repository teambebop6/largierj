import React from 'react';

import { Menu, Popup, Icon } from 'semantic-ui-react';

import './TopLeftLinks.less';

const popupStyle = {
  borderRadius: 0,
  opacity: 0.7,
  padding: '1rem',
};

export default () => (
  (
    <Menu secondary inverted className="topLeftLinksMenu">
      <Menu.Item icon href="mailto:info@chantallargier.com">
        <Icon name="mail" />
      </Menu.Item>
      <Menu.Item icon>

        <Popup
          inverted
          style={popupStyle}
          trigger={<Icon name="weixin" />}
          hoverable
        >
          <p>Wechat Id: chantallargier</p>
        </Popup>
      </Menu.Item>
      <Menu.Item icon href="https://www.facebook.com/Chantal-Largier-1713090868989087/" target="_blank">
        <Icon name="facebook" />
      </Menu.Item>

    </Menu>
  )
);
