import React from 'react';
import Gallery from 'react-photo-gallery';
import moment from 'moment';
import ConcertImage from './ConcertImage';

const ConcertImageContainer = ({
  concerts,
}) => {
  const photos = [];
  concerts.forEach((c) => {
    photos.push({
      src: `${window.location.origin}${c.imageURI}`,
      width: c.imageWidth,
      height: c.imageHeight,
      title: c.title,
      location: c.location,
      venue: c.venue,
      link: c.link,
      date: moment(c.date).format('YYYY MMM DD'),
      weekday: moment(c.date).format('ddd'),
    });
  });

  return (<Gallery
    photos={photos}
    renderImage={({
        index, left, top, key, photo,
      }) => (
          <ConcertImage
            key={key + index}
            margin="2px"
            index={index}
            photo={photo}
            left={left}
            top={top}
          />
      )}
  />);
};

export default ConcertImageContainer;
