/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';

import { get } from '../../common/helpers/api';
// Common components
import ConcertImageContainer from './components/ConcertImageContainer';
// Resources
import './Home.less';
import Logo from '../../res/images/logoBlack.svg';

import i18n from '../../i18n';

import { licenseYear } from '../../config.json';


const selectLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

class Concerts extends Component {
  constructor() {
    super();
    this.state = {
      upcoming_concerts: [],
      past_concerts: [],
      // photos: [],
    };
  }

  componentDidMount() {
    get('/api/concerts/all').then((res) => {
      this.setState({
        ...res.data,
      });
    }).catch(err => err);
    selectLanguage(this.props.locate || 'en');
  }

  render() {
    return (
      <div>
        <Grid
          className="page"
          style={{
          marginTop: '10px',
        }}
        >
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button as={Link} to="/" floated="left">
                <I18n>{t => t('back')}</I18n>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Image src={Logo} centered size="medium" />
          </Grid.Row>
        </Grid>

        <Grid className="page concerts-grid" id="concerts">
          <Grid.Row className="title-row">
            <h2>
              <I18n>{t => t('concerts')}</I18n>
            </h2>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h3>
                <I18n>{t => t('upcoming-concerts')}</I18n>
              </h3>
              <ConcertImageContainer
                concerts={this.state.upcoming_concerts}
              />
              <h3>
                <I18n>{t => t('past-concerts')}</I18n>
              </h3>
              {
                (this.state.past_concerts && this.state.past_concerts.years) &&
                (
                  this.state.past_concerts.years.map(year => (
                      <div
                        key={year}
                        style={{
                        marginBottom: '2rem',
                      }}
                      >
                        <h4>
                          { String(year) }
                        </h4>
                        <ConcertImageContainer
                          concerts={this.state.past_concerts.concerts[year]}
                        />
                      </div>
                    ))
                )
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid className="page footer-grid">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <p>
                <span>&copy;{licenseYear} chantallargier.com | </span>
                <Link to="/admin">admin</Link>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path || '/login'),
}, dispatch);

const mapStateToProps = state => ({
  locate: state.settings.locate,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Concerts);
