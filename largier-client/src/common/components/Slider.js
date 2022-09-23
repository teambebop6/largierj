import React, { Component } from 'react';
import Slider from 'react-slick';

import './../../../node_modules/slick-carousel/slick/slick.css';
import './../../../node_modules/slick-carousel/slick/slick-theme.css';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      role="presentation"
      className={className}
      style={{ ...style, display: 'block', right: '5%' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      role="presentation"
      className={className}
      style={{ ...style, display: 'block', left: '5%' }}
      onClick={onClick}
    />
  );
}

const audio1Src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1388668324&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true';
const audioStyle = {
  fontSize: 10,
  color: '#cccccc',
  lineBreak: 'anywhere',
  wordBreak: 'normal',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
  fontWeight: 100,
};
const audioAuthorUrl = 'https://soundcloud.com/chantal-largier';
const author = 'Chantal Largier';
const tracksUrl = 'https://soundcloud.com/chantal-largier/sets/timeless';
const tracksName = 'Timeless';

const soundCloudIframeTitle = `${tracksName} Soundcloud`;
const spotifyIframeTitle = `${tracksName} Spotify`;

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      lazyLoad: true,
      className: 'center',
      centerMode: true,
      focusOnSelect: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 2,
      slidesToScroll: 1,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 10000,
      pauseOnHover: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            swipeToSlide: true,
          },
        },
      ],
    };
    return (
      <Slider {...settings}>
        <div>
          <div className="videoWrapper">
            <iframe
              title="Video 1"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/zE6a2HL3oec"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        <div>
          <div className="videoWrapper">
            <iframe
              title={soundCloudIframeTitle}
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={audio1Src}
            />
            <div
              style={audioStyle}
            >
              <a
                href={audioAuthorUrl}
                title={author}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#cccccc',
                  textDecoration: 'none',
                }}
              >
                { author }
              </a> ·
              <a
                href={tracksUrl}
                title={tracksName}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ccccccm',
                  textDecoration: 'none',
                }}
              >
                {tracksName}
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="videoWrapper">
            <iframe
              title={spotifyIframeTitle}
              style={{
                borderRadius: '12px',
              }}
              src="https://open.spotify.com/embed/album/2kycyy2GqQMdX62vcOY2ZG?utm_source=generator"
              width="100%"
              height="380"
              frameBorder="0"
              allowFullScreen=""
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        </div>
        <div>
          <div className="videoWrapper">
            <iframe
              title="Video 1"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/9ZB2DrO0t_E"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        <div>
          <div className="videoWrapper">
            <iframe
              title="Video 2"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/1VgdOcGl-q8"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen=""
            />
          </div>
        </div>
        <div>
          <div className="videoWrapper">
            <iframe
              title="Video 3"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/oqXjA0Uh38c"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen=""
            />
          </div>
        </div>
        <div>
          <div className="videoWrapper">
            <iframe
              title="Video 4"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/cnhkhJmc__I"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen=""
            />
          </div>
        </div>
      </Slider>
    );
  }
}
