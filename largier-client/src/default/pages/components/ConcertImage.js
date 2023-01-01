import React, { useState } from 'react';
import { Dimmer, Header } from 'semantic-ui-react';

const imgStyle = {
  transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s',
};
const cont = {
  backgroundColor: '#eee',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
};

const ConcertImage = ({
  // index,
  photo,
  margin,
  direction,
  top,
  left,
}) => {
  const [infoShow, setInfoShow] = useState(false);

  if (direction === 'column') {
    cont.position = 'absolute';
    cont.left = left;
    cont.top = top;
  }

  const ConcertLink = (params) => {
    const { link } = params;
    if (link) {
      return (
          <a className="link" href={link} target="_blank" rel="noopener noreferrer">Link</a>
      );
    }

    return <div />;
  };

  return (
      <div
        style={{
          margin, height: photo.height, width: photo.width, ...cont,
        }}
        onMouseEnter={() => {
          setInfoShow(true);
        }}
        onMouseLeave={() => {
          setInfoShow(false);
        }}
      >
        <Dimmer active={infoShow}>
          <Header as="h4" inverted>
            { photo.title }
          </Header>
          <Header as="h4" inverted>
            { photo.date }, { photo.weekday }
          </Header>
          <p>
            { photo.venue } <br />
            { photo.location } <br />
            <ConcertLink link={photo.link} />
          </p>
        </Dimmer>
        <div
          className="ui fluid image"
        >
          <img
            alt={photo.title}
            {...photo}
            style={
                { ...imgStyle }
              }
          />
          <div className="ui bottom attached label">
            { photo.title }
            <br />
            { photo.date }
          </div>
        </div>
      </div>
  );
};

export default ConcertImage;
