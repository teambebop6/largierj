import React, { Component } from 'react';

import { Table } from 'semantic-ui-react';
import '../../../node_modules/moment/locale/de';

export default class ConcertElement extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    const concert = { ...this.props.concert };

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
      <Table.Row>
        <Table.Cell width="two">{ this.props.date }</Table.Cell>
        <Table.Cell width="two">{ this.props.weekday }</Table.Cell>
        <Table.Cell>{concert.title}</Table.Cell>
        <Table.Cell width="three">{concert.venue}</Table.Cell>
        <Table.Cell>{concert.location}</Table.Cell>
        <Table.Cell width="two">
          <ConcertLink link={concert.link} />
        </Table.Cell>
      </Table.Row>
    );
  }
}
