/**
 * Created by Henry Huang.
 */
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import { ControlBar, Player } from 'video-react';
import StructuredData from 'react-google-structured-data';
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

import { get } from '../../common/helpers/api';
// Common components
import TopLeftLinks from '../../common/components/TopLeftLinks';
import TopRightLinks from '../../common/components/TopRightLinks';
import Nav from '../../common/components/Nav';
import Footer from '../../common/components/Footer/Footer';
import SimpleSlider from '../../common/components/Slider';
import ConcertImageContainer from './components/ConcertImageContainer';

// Resources
import './Home.less';
import Logo from '../../res/images/logoWhite.svg';
import Avatar from '../../res/images/avatar.jpg';
import Header from '../../res/images/homepage-hero-optimized.jpeg';
import Video from '../../res/images/largier.mp4';
import InstagramIcon from '../../res/images/instagram.svg';
import PlayerIcon from '../../res/images/player.svg';

import i18n from '../../i18n';
import Services from './Services';
import PageTitle from './components/PageTitle';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming_concerts: [],
      past_concerts: [],
    };
  }

  componentDidMount() {
    get('/api/concerts').then((res) => {
      this.setState(res.data);
    }).catch(err => err);
    i18n.changeLanguage(this.props.locate || 'en');
  }

  render() {
    return (
      <div>


        <Fab
          icon={
            <PlayerIcon width={50} alt="Play music" />
          }
          mainButtonStyles={{
            backgroundColor: 'white',
            bottom: '74px',
          }}
          onClick={() => {
            window.open('https://on.soundcloud.com/vQ2N8RdFw28KTTjg6');
          }}
        />

        <Fab
          icon={
            <InstagramIcon width={50} alt="Go go my Instagram" />
          }
          mainButtonStyles={{
            backgroundColor: 'white',
          }}
          onClick={() => {
            window.open('https://instagram.com/chantal_largier_');
          }}
        />

        <PageTitle />

        <Nav />


        <div className="headerPicture" style={{ backgroundImage: `url(${Header})` }}>
          <div className="headerContent">
            <TopLeftLinks />
            <TopRightLinks />
            <Player
              fluid="false"
              height="100vh"
              playsInline
              autoPlay
              muted
              loop
              poster="headerChurch.png"
              src={Video}
            >
              <ControlBar disabled />
            </Player>

            <div className="headerTextContent">
              <Image className="logo" src={Logo} centered />
            </div>
          </div>
        </div>


        <Services />


        { /*  BIO */}

        <Grid className="page default-grid" id="bioAnchor">
          <div className="sectionTitle">
            <h2 className="title">Bio</h2>
          </div>
          <div className="bioParagraph col-2">
            <p><I18n>{t => t('bio3')}</I18n></p>
            <p><I18n>{t => t('bio4')}</I18n></p>
            <p><I18n>{t => t('bio5')}</I18n></p>
            <p><I18n>{t => t('bio6')}</I18n></p>
            <p><I18n>{t => t('bio7')}</I18n></p>
            <p><I18n>{t => t('bio8')}</I18n></p>
            <p><I18n>{t => t('bio9')}</I18n></p>
            <p><I18n>{t => t('bio10')}</I18n></p>
            <p><I18n>{t => t('bio11')}</I18n></p>
            { /* <p><I18n>{t => t('bio1')}</I18n></p>
            <p><I18n>{t => <div dangerouslySetInnerHTML={{ __html: t('bio2') }} /> }</I18n></p>
            */
            }

          </div>
          <div className="largierAvatar col-2">
            <Image src={Avatar} />
          </div>
        </Grid>

        { /* CONCERTS */}


        <Grid className="page default-grid concertsBlock" id="concerts">
          <Grid.Row>
            <Grid.Column>
              <h2 className="title">Concerts</h2>
              <h3>
                <I18n>{t => t('upcoming-concerts')}</I18n>
              </h3>
              <ConcertImageContainer
                concerts={this.state.upcoming_concerts}
              />
              <h3>
                <I18n>{t => t('past-concerts')}</I18n>
              </h3>
              <ConcertImageContainer
                concerts={this.state.past_concerts}
              />
              <Link to="/concerts" className="link">
                <I18n>{t => t('show-all-concerts')}</I18n>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid className="page default-grid" id="media">
          <Grid.Row>
            <Grid.Column>
              <h2 className="title">Media</h2>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <div className="mediaSection">
          <SimpleSlider />
        </div>

        <Footer />

        <StructuredData
          type="Person"
          data={{
            name: 'Chantal Largier',
            nationality: 'Switzerland',
            gender: 'Female',
            description: 'Swiss Pianist Chantal Largier is a talented, versatile and admired artist, who knows how to impress and fascinate the audience through her interpretation and a real passion for music. Her goal is to find the true spirit of music and to share it with her audience.',
            jobTitle: 'Swiss Pianist',
            url: 'https://www.chantallargier.com',
            image: 'https://www.chantallargier.com/avatar.jpg',
            sameAs: [
              'https://www.facebook.com/Chantal-Largier-1713090868989087/',
              'https://www.youtube.com/channel/UCTtRvi4HOBtmSqzJ-QrKOjQ',
            ],
          }}
        />

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path || '/login'),
}, dispatch);

const mapStateToProps = state => ({
  locate: state.settings.locate,
  upcomingNum: state.configuration,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
