import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { deleteEvents } from '../../../../modules/event';

class DeleteItemModal extends Component {
  constructor(props) {
    super(props);
    this.deny = this.deny.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  confirm() {
    this.props.deleteEvents([this.props.itemId]).then(() => {
      this.props.itemDeleted();
      this.props.close();
    }).catch(() => {
      this.props.close();
    });
  }

  deny() {
    this.props.close();
  }

  render() {
    return (
      <div>
        <Modal
          open={this.props.modalOpen}
          size="small"
        >
          <Header
            icon="delete"
            content="Delete item"
          />
          <Modal.Content>
            <p>
              Are you sure to delete this item?
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
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItemModal);
