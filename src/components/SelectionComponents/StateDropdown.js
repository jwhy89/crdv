import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown } from 'semantic-ui-react';

class StateDropdown extends Component {
  // updates stateValue in selectedScopeReducer, currentScope in local state
  // then dispatches request for list of relevant districts
  handleStateListChange = (event, { value }) => {
    const scopeInfo = value;
    const currentScope = 'state';
    const payload = { currentScope, scopeInfo };
    this.props.dispatch({ type: 'GET_DATASET_LIST', payload });
    this.props.dispatch({ type: 'GET_DISTRICT_LIST', payload: value });
    this.props.dispatch({ type: 'SET_SCOPE_OF_STATE', payload: value });
    this.props.dispatch({ type: 'SET_CURRENT_LEVEL_OF_SCOPE', payload: 'state' });
    this.props.dispatch({ type: 'SET_DATASET_SELECTION_APPEARANCE', payload: true });
  }

  // Renders either:
  // 1. loading dropdown menu
  // 2. list of states to select
  render() {
    if (this.props.stateList[0] === 'state') {
      return (
        <Form.Field
          control={Dropdown}
          // Checks if property isRequired was passed as true
          required={!!this.props.isRequired}
          search
          selection
          options={[{ key: 0, value: null, text: null }]}
          placeholder="State"
          label={this.props.label}
          disabled
          loading
        />
      );
    }
    const stateListOptions = this.props.stateList
      .map((option, i) => ({
        key: i,
        value: option.state,
        text: option.state_name,
      }));

    return (
      <Form.Field
        control={Dropdown}
        // Checks if property isRequired was passed as true
        required={!!this.props.isRequired}
        search
        selection
        placeholder="State"
        value={this.props.stateValue}
        onChange={this.handleStateListChange}
        options={stateListOptions}
        label={this.props.label}
      />
    );
  }
}

const mapStateToProps = state => ({
  stateList: state.scopeOption.stateReducer,
  stateValue: state.selectedScope.scopeStateReducer,
});

export default connect(mapStateToProps)(StateDropdown);
