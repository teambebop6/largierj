/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import {
  deleteEvents,
  hideEvents,
  showEvents
} from '../../../../modules/event';
import PropTypes from 'prop-types';

class HandleMultipleItemsModal extends Component {
  constructor(props) {
    super(props);
    this.deny = this.deny.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  confirm() {
    const { event } = this.props;
    let eventHandler = this.props.deleteEvents;
    switch (event) {
      case 'show': {
        eventHandler = this.props.showEvents;
        break;
      }
      case 'hide': {
        eventHandler = this.props.hideEvents;
        break;
      }
      case 'delete':
      default:
        break;
    }
    if (eventHandler) {
      eventHandler(this.props.items.map(item => item.id)).then(() => {
        this.props.onEventFinished();
        this.props.close();
      }).catch(() => {
        this.props.close();
      });
    } else {
        this.props.close();
    }
  }

  deny() {
    this.props.close();
  }

  render() {

    const titles = this.props.items.map(item => item.title).join(', ');

    const { event } = this.props;

    let icon = 'delete';
    let content = 'Delete items';

    switch (event) {
      case 'show': {
        icon = 'eye';
        content = 'Show items';
        break;
      }
      case 'hide': {
        icon = 'toggle off';
        content = 'Hide items';
        break;
      }
      case 'delete':
      default:
        break;
    }

    return (
      <div>
        <Modal
          open={this.props.modalOpen}
          size="small"
        >
          <Header
            icon={icon}
            content={content}
          />
          <Modal.Content>
            <p>
              Are you sure to {this.props.event} <b>{titles}</b>?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="red"
              onClick={this.deny}
            >
              <Icon
                name="remove"
              />
              No
            </Button>
            <Button
              color="green"
              onClick={this.confirm}
            >
              <Icon
                name="checkmark"
              />
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authorization: `Bearer ${state.auth.token}`,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteEvents,
  showEvents,
  hideEvents,
}, dispatch);

HandleMultipleItemsModal.propTypes = {
  items: PropTypes.array.isRequired,
  event: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  onEventFinished: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleMultipleItemsModal);
