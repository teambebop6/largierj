import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import path from 'path';
import moment from 'moment';
import { Checkbox, Button, Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { post } from '../../../../../common/helpers/api';
import { apiBasePath } from '../globals';

class ListItemRow extends Component {
  constructor(props) {
    super(props);
    this.visibilityChange = this.visibilityChange.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  onDeleteItem() {
    this.props.deleteItem(this.props.item);
  }

  visibilityChange(e, data) {
    const item = {
      visible: data.checked,
      ids: [data.item.id],
    };

    // const formData = new FormData();
    // formData.append('item', JSON.stringify(item));

    // Update
    post(path.join(apiBasePath, 'visible'), item, {
      headers: {
        Authorization: this.props.authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          this.props.item.visible = data.checked;
          this.forceUpdate();
        }
      })
      .catch(err => err);
  }

  render() {
    const { item } = this.props;

    return (
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox
            item={item}
            onChange={this.props.onSelected}
            checked={this.props.checked}
          />
        </Table.Cell>
        <Table.Cell>
          {item.title}
        </Table.Cell>
        <Table.Cell>
          {item.location}
        </Table.Cell>
        <Table.Cell>
          {item.venue}
        </Table.Cell>
        <Table.Cell>
          {item.link}
        </Table.Cell>
        <Table.Cell>
          {moment(item.date).format('LLLL')}
        </Table.Cell>

        <Table.Cell>
          <Checkbox
            slider
            checked={item.visible}
            item={item}
            onChange={this.visibilityChange}
          />
        </Table.Cell>
        <Table.Cell>
          <Button.Group>
            <Link to={`./modify/${item.id}`} className="ui icon button">
              <i className="write icon" />
            </Link>
            <Button icon onClick={this.onDeleteItem} color="red">
              <Icon className="remove icon" />
            </Button>
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}

const mapStateToProps = state => ({
  authorization: `Bearer ${state.auth.token}`,
});

ListItemRow.propTypes = {
  item: PropTypes.object.isRequired,
  authorization: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(ListItemRow);
