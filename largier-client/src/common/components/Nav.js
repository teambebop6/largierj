import React from 'react';

import { Grid, Menu } from 'semantic-ui-react';

import { I18n } from 'react-i18next';

import './Nav.less';

const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
};

export default () => (
  (
    <Grid className="page sticky top fixed nav-grid">
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Menu className="compact secondary inverted main-menu">
            <Menu.Item link onClick={() => scrollTo('bioAnchor')}>
              <I18n>{t => t('bio')}</I18n>
            </Menu.Item>
            <Menu.Item link onClick={() => scrollTo('concerts')}>
              <I18n>{t => t('concerts')}</I18n>
            </Menu.Item>
            <Menu.Item link onClick={() => scrollTo('media')}>
              <I18n>{t => t('media')}</I18n>
            </Menu.Item>

          </Menu>

        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
);
