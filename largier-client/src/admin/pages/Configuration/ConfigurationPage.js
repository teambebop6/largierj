/**
 * Created by Henry Huang on 2018/8/6.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Form } from 'semantic-ui-react';
import TopBar from '../../common/components/TopBar';
import { fetchConfiguration, saveConfiguration } from '../../modules/configuration';

class ConfigurationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configuration: props.configuration,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchConfiguration();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      configuration: nextProps.configuration,
    });
  }

  onChange(e, { name, value }) {
    this.setState({
      configuration: this.state.configuration.map((c) => {
        if (c.name === name) {
          return {
            ...c,
            value,
          };
        }
        return c;
      }),
    });
  }

  onSubmit() {
    this.props.saveConfiguration(this.state.configuration);
  }

  render() {
    const options = [];

    let i = 0;
    while (i < 10) {
      i += 1;
      const iStr = String(i);
      options.push({
        key: iStr,
        text: iStr,
        value: iStr,
      });
    }

    return (
      <div>
        <TopBar />
        <Grid className="page">
          <Grid.Row>
            <Grid.Column>
              <h1>Configuration</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form disabled>
                <Form.Group widths="equal">
                  {
                    this.state.configuration &&
                    (
                      this.state.configuration.map(c => (
                          <Form.Select
                            key={c.name}
                            fluid
                            label={c.title}
                            name={c.name}
                            options={options}
                            placeholder={c.title}
                            value={c.value}
                            onChange={this.onChange}
                            disabled={this.props.isSaving || this.props.isFetching}
                          />
                        ))
                    )
                  }
                </Form.Group>
                <Form.Button onClick={this.onSubmit}>Save</Form.Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authorization: `Bearer ${state.auth.token}`,
  configuration: state.configuration.configurationFetched,
  isSaving: state.configuration.isSaving,
  isFetching: state.configuration.isFetching,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchConfiguration,
  saveConfiguration,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);
