import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import path from 'path';
import moment from 'moment';
import { Checkbox, Button } from 'semantic-ui-react';
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
    };

    // const formData = new FormData();
    // formData.append('item', JSON.stringify(item));

    // Update
    post(path.join(apiBasePath, `/item/visible/${data.item.id}`), item, {
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
      <tr>
        <td>
          {item.title}
        </td>
        <td>
          {item.location}
        </td>
        <td>
          {item.venue}
        </td>
        <td>
          {item.link}
        </td>
        <td>
          {moment(item.date).format('LLLL')}
        </td>

        <td>
          <Checkbox
            slider
            checked={item.visible}
            item={item}
            onChange={this.visibilityChange}
          />
        </td>
        <td>
          <Link to={`./modify/${item.id}`} className="ui icon button">
            <i className="write icon" />
          </Link>

          <Button
            className="red icon remove-item"
            onClick={this.onDeleteItem}
          >
            <i className="remove icon" />
          </Button>

        </td>
      </tr>
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
};

export default connect(mapStateToProps)(ListItemRow);
