import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import Picker from 'pickerjs';
import moment from 'moment';

export default class DateFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      dateUtc: '',
    };
    this.dateChanged = this.dateChanged.bind(this);
  }

  componentDidMount() {
    const pckr = new Picker(document.querySelector('.concertDate'), {
      format: 'MM/DD/YYYY',
      date: this.dateString,
      pick: () => {
        this.dateChanged(pckr.getDate());
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
      this.setState({
        dateUtc: nextProps.value,
        date: moment(nextProps.value).format('YYYY/MM/DD'),
      });
    }
  }

  dateChanged(dateString) {
    this.setState({
      dateUtc: dateString,
    });

    // Fire onChange
    this.props.onChange({
      target: {
        name: 'date',
        value: this.state.dateUtc,
      },
    });
  }

  render() {
    return (
      <Form.Field>

        <label
          htmlFor={this.props.name}
        >
          {this.props.title}
        </label>
        <input
          className="concertDate"
          name={this.props.name}
          type="text"
          value={this.state.date}
        />
        <input
          type="hidden"
          name={`${this.props.name}-utc`}
          value={this.state.dateUtc}
        />

      </Form.Field>
    );
  }
}
