import React from 'react';

import InstagramIcon from '../../res/images/Instagram_icon.png';

import Hero from '../../res/images/homepage-hero-optimized.jpeg';
import PageTitle from './components/PageTitle';


const LandingPage = () => {
  const pageStyle = {
    backgroundImage: `url(${Hero})`,
    height: '100vh',
    backgroundColor: '#2e1d1a', // fallback color from image palette
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const backgroundStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textShadow: '0 2px 8px rgba(0,0,0,0.6)',
    flexGrow: 1,
  };

  const overlayStyle = {
    padding: '4rem',
    borderRadius: '12px',
    textAlign: 'center',
    lineHeight: 'normal',
  };

  return (
    <div style={pageStyle}>
      <div style={backgroundStyle}>
        <div style={overlayStyle}>
          <PageTitle style={{ display: 'flex', flexDirection: 'column' }} />
          <div style={{
            fontWeight: 'normal', marginTop: '1rem', gap: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
          >
            <span>We&apos;re currently composing something beautiful for you.</span>
            <span>My new website is on the way.</span>
            <span>Stay tuned for the official launch!</span>
          </div>
        </div>

        {
          // Meanwhile, you can follow me on Instagram
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem',
          }}
          >
            <a href="https://instagram.com/chantal_largier_" style={{ color: '#ffe1d6', textDecoration: 'none', marginLeft: '5px' }}>
              <img src={InstagramIcon} width={70} height={70} alt="Instagram" />
            </a>
            Meanwhile, you can follow me on Instagram.

            {
              // Please check out my Youtube channel too
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                Please check out my YouTube channel too:
                <iframe
                  style={{ marginTop: '1rem', textAlign: 'center', display: 'block' }}
                  width="300"
                  height="200"
                  src="https://www.youtube.com/embed/b5sIslt7Mt0?si=UW4iWUAGoR-uAkH4"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            }
            {
              // Or contact me via email
              <div style={{ marginTop: '1rem' }}>
                Or contact me via email at
                <a href="mailto:me@chantallargier.com" style={{ color: '#ffe1d6', textDecoration: 'none', marginLeft: '5px' }}>
                  me@chantallargier.com
                </a>
              </div>
            }
          </div>
        }
      </div>
      <div>
        <p style={{
          marginTop: 'auto', color: '#ffe1d6', textAlign: 'center', padding: '1rem',
        }}
        >
          © 2025 Chantal Largier. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
