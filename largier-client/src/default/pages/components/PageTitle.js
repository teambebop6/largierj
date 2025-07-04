import React from 'react';

const PageTitle = (props) => {
  const titleStyle = {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: '5rem',
    fontWeight: 100,
    fontFamily: 'Montserrat, sans-serif',
    textAlign: 'center',
  };

  const subtitleStyle = {
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    fontFamily: 'Montserrat, sans-serif',
  };

  return (
    <div>
      {
        // Title
        <div style={props.style}>
          <div style={titleStyle}>
            Chantal Largier
          </div>

          <div style={subtitleStyle}>
            Pianist & Composer
          </div>
        </div>
      }
    </div>
  );
};

export default PageTitle;
