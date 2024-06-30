import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, ListItem, ListIcon, ListContent, List } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

import { licenseYear } from '../../../config.json';

export default () => (
  (
    <div>
      <Grid className="page default-grid impressumSection" id="impressumAnchor">
        <List>
          <ListItem>
            <ListContent><I18n>{t => t('contact')}</I18n></ListContent>
          </ListItem>
          <ListItem>
            <ListContent />
          </ListItem>
          <ListItem>
            <ListIcon name="user" />
            <ListContent>Chantal Largier</ListContent>
          </ListItem>
          <ListItem>
            <ListIcon name="marker" />
            <ListContent>Bahnhofplatz 12</ListContent>
          </ListItem>
          <ListItem>
            <ListIcon />
            <ListContent>6440 Brunnen</ListContent>
          </ListItem>
          <ListItem>
            <ListIcon name="mail" />
            <ListContent>
              <a href="mailto:info@chantallargier.com">info@chantallargier.com</a>
            </ListContent>
          </ListItem>
        </List>
      </Grid>
      <Grid className="page default-grid">
        <Grid.Row>
          <Grid.Column textAlign="center">
            <p>
              <span>&copy;{licenseYear} chantallargier.com | </span>
              <Link to="/admin" className="link">admin</Link>
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
);
