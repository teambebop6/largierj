/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Table,
  Button,
  Container,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import TopBar from '../../common/components/TopBar';
import { get } from '../../../common/helpers/api';

import DeleteItemModal from './common/components/DeleteItemModal';
import HandleMultipleItemsModal from './common/components/HandleMultipleItemsModal';
import ListItemRow from './common/components/ListItemRow';

import { apiBasePath } from './common/globals';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      deleteItemId: null,
      deleteModalOpen: false,
      multipleItemsModalOpen: false,
      multipleEvent: '',
      // eslint-disable-next-line react/no-unused-state
      itemsSelected: [],
    };

    this.loadItems = this.loadItems.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    this.showItems = this.showItems.bind(this);
    this.hideItems = this.hideItems.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.unCheckAll = this.unCheckAll.bind(this);
  }

  componentDidMount() {
    this.loadItems();
  }

  // eslint-disable-next-line class-methods-use-this
  onSelectItem(event, target) {
    const { item } = target;
    const index = this.state.itemsSelected.findIndex(ele => ele.id === item.id);
    const items = this.state.itemsSelected;
    if (index === -1) {
      items.push(item);
    } else {
      items.splice(index, 1);
    }
    this.setState({
      itemsSelected: items,
    });
  }

  deleteItem(item) {
    this.setState({
      deleteModalOpen: true,
      deleteItemId: item.id,
    });
  }

  checkAll() {
    this.setState({
      itemsSelected: [...this.state.items],
    });
  }

  unCheckAll() {
    this.setState({
      itemsSelected: [],
    });
  }

  deleteItems() {
    this.setState({
      multipleItemsModalOpen: true,
      multipleEvent: 'delete',
    });
  }

  showItems() {
    this.setState({
      multipleItemsModalOpen: true,
      multipleEvent: 'show',
    });
  }

  hideItems() {
    this.setState({
      multipleItemsModalOpen: true,
      multipleEvent: 'hide',
    });
  }

  loadItems() {
    const promiseGetEvents = get(apiBasePath, {
      headers: {
        Authorization: this.props.authorization,
      },
    });
    Promise.all([promiseGetEvents])
      .then(([events]) => {
        if (!events) return;
        this.setState({ items: events });
      });
  }

  render() {
    return (
      <div>
        <TopBar />

        <DeleteItemModal
          itemId={this.state.deleteItemId}
          modalOpen={this.state.deleteModalOpen}
          close={() => {
            this.setState({
              deleteModalOpen: false,
            });
          }}
          itemDeleted={this.loadItems}
        />

        <HandleMultipleItemsModal
          items={this.state.itemsSelected}
          event={this.state.multipleEvent}
          modalOpen={this.state.multipleItemsModalOpen}
          close={() => {
            this.setState({ multipleItemsModalOpen: false, multipleEvent: '' });
          }}
          onEventFinished={this.loadItems}
        />

        <Container fluid>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column floated="left">
                <Button.Group>
                  <Button
                    basic
                    disabled={this.state.itemsSelected.length === this.state.items.length}
                    onClick={this.checkAll}
                  >
                    Select All
                  </Button>
                  <Button
                    basic
                    disabled={this.state.itemsSelected.length === 0}
                    onClick={this.unCheckAll}
                  >
                    Deselect All
                  </Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column style={{
                textAlign: 'right',
              }}
              >

                <Button
                  content="Delete Selected"
                  color="red"
                  icon="remove"
                  labelPosition="left"
                  disabled={this.state.itemsSelected.length === 0}
                  onClick={this.deleteItems}
                />

                <Button
                  content="Show Selected"
                  disabled={this.state.itemsSelected.length === 0}
                  icon="eye"
                  labelPosition="left"
                  onClick={this.showItems}
                />

                <Button
                  basic
                  content="Hide Selected"
                  disabled={this.state.itemsSelected.length === 0}
                  icon="toggle off"
                  labelPosition="left"
                  onClick={this.hideItems}
                />

              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Table style={{
                marginLeft: '3%',
                marginRight: '3%',
              }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Location</Table.HeaderCell>
                    <Table.HeaderCell>Venue</Table.HeaderCell>
                    <Table.HeaderCell>Link</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Visible</Table.HeaderCell>
                    <Table.HeaderCell>VAktionen</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {
                    this.state.items.map(item =>
                        (
                            <ListItemRow
                              key={item.id}
                              item={item}
                              deleteItem={this.deleteItem}
                              onSelected={this.onSelectItem}
                              checked={
                                  this.state.itemsSelected.findIndex(ele => ele.id === item.id) !== -1
                                }
                            />
                        ))
                  }
                </Table.Body>
              </Table>
            </Grid.Row>
          </Grid>

        </Container>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  authorization: `Bearer ${state.auth.token}`,
});

List.propTypes = {
  authorization: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(List);
