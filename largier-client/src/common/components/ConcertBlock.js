import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

import ConcertElement from './ConcertElement';

import './ConcertBlock.less';
import { changeLocate } from '../../default/modules/settings';

const ConcertBlock = ({ concerts, locate }) => {
  moment.locale(locate);
  if (!concerts || concerts.length === 0) {
    return (
      <p>-</p>
    );
  }
  return (
    <Table basic="very" className="concertsTable">
      <tbody>
      {
        concerts.map(concert => (
          <ConcertElement
            key={concert.id}
            concert={concert}
            date={moment(concert.date).format('YYYY MMM DD')}
            weekday={moment(concert.date).format('ddd')}
          />
        ))
      }
      </tbody>
    </Table>
  );
};

ConcertBlock.propTypes = {
  concerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  locate: state.settings.locate,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeLocate,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConcertBlock);
