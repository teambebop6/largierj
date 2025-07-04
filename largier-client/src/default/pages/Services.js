import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

import './Services.less'; // Assuming you have a CSS file for styles

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <Grid className="page default-grid" id="servicesAnchor">
        <div className="sectionTitle">
          <h2 className="title"><I18n>{t => t('services')}</I18n></h2>
        </div>

        {
          // flexbox with three columns

          <div className="servicesGrid">
            <div className="serviceItem">
              <h3><I18n>{t => t('service1Title')}</I18n></h3>
              <p><I18n>{t => t('service1Description')}</I18n></p>
            </div>
            <div className="serviceItem">
              <h3><I18n>{t => t('service2Title')}</I18n></h3>
              <p><I18n>{t => t('service2Description')}</I18n></p>
            </div>
            <div className="serviceItem">
              <h3><I18n>{t => t('service3Title')}</I18n></h3>
              <p><I18n>{t => t('service3Description')}</I18n></p>
            </div>
          </div>
        }

        <div className="bioParagraph">
          <p><I18n>{t => t('servicesText1')}</I18n></p>
          <p><I18n>{t => t('servicesText2')}</I18n></p>
          <p><I18n>{t => t('servicesText3')}</I18n></p>
          <p><I18n>{t => t('servicesText4')}</I18n></p>
        </div>
      </Grid>
    );
  }
}

export default Services;
