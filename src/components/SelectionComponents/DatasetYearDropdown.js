import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown } from 'semantic-ui-react';

class DatasetYearDropdown extends Component {
  // updates datasetYearValue in selectedScopeReducer
  handleDatasetYearListChange = (event, { value }) => {
    this.props.dispatch({ type: 'SET_SCOPE_OF_DATASET_YEAR', payload: value });
    this.props.dispatch({ type: 'SET_CONTINUE_BUTTON_APPEARANCE', payload: true });
  }

  // Renders either:
  // 1. disabled dropdown menu
  // 2. dropdown of available years matching the selected dataset
  render() {
    if (!this.props.showYearSelection) {
      return (
        <Form.Field
          control={Dropdown}
          // Checks if property isRequired was passed as true
          required={!!this.props.isRequired}
          search
          selection
          fluid
          disabled
          options={[{ key: 0, value: null, text: null }]}
          placeholder="Year"
          label="Year"
        />
      );
    }

    const dataSetList = this.props.datasetList;
    const datasetYearOptions = dataSetList
      .filter((x, i) => dataSetList[i].table_name === this.props.datasetValue)
      .map((x, i) => ({
        key: i + 1,
        value: dataSetList[i].Year,
        text: dataSetList[i].Year,
      }));

    return (
      <Form.Field
        control={Dropdown}
        // Checks if property isRequired was passed as true
        required={!!this.props.isRequired}
        search
        selection
        fluid
        placeholder="Year"
        value={this.props.datasetYearValue}
        onChange={this.handleDatasetYearListChange}
        options={datasetYearOptions}
        label="Year"
      />
    );
  }
}

const mapStateToProps = state => ({
  datasetList: state.scopeOption.datasetListReducer,
  datasetValue: state.selectedScope.scopeDatasetReducer,
  datasetYearValue: state.selectedScope.scopeDatasetYearReducer,
  showYearSelection: state.selectionMenuProgress.showYearSelectionReducer,
});

export default connect(mapStateToProps)(DatasetYearDropdown);
