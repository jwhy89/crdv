import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown } from 'semantic-ui-react';

class DatasetDropdown extends Component {
  // updates datasetValue in selectedScopeReducer
  handleDatasetListChange = (event, { value }) => {
    this.props.dispatch({ type: 'SET_SCOPE_OF_DATASET', payload: value });
    this.props.dispatch({ type: 'SET_YEAR_SELECTION_APPEARANCE', payload: true });
  }

  // Renders either:
  // 1. disabled dropdown menu
  // 2. dropdown of available datasets in selected scope
  render() {
    if (!this.props.showDatasetSelection) {
      return (
        <Form.Field
          control={Dropdown}
          // Checks if property isRequired was passed as true
          required={!!this.props.isRequired}
          search
          selection
          disabled
          fluid
          options={[{ key: 0, value: null, text: null }]}
          placeholder="Dataset"
          label="Dataset"
        />
      );
    }

    const dataSetList = this.props.datasetList;
    const distinctList = [...new Set(dataSetList.map(x => x.table_name))];

    const datasetOptions = distinctList
      .map((x, i) => ({
        key: i + 1,
        value: distinctList[i],
        text: distinctList[i],
      }));

    //  for (const i in distinctList) {
    //    datasetOptions.push({
    //      key: i + 1,
    //      value: distinctList[i],
    //      text: distinctList[i],
    //    });
    //  }

    return (
      <Form.Field
        control={Dropdown}
        // Checks if property isRequired was passed as true
        required={!!this.props.isRequired}
        search
        selection
        fluid
        placeholder="Dataset"
        value={this.props.datasetValue}
        onChange={this.handleDatasetListChange}
        options={datasetOptions}
        label="Dataset"
      />
    );
  }
}

const mapStateToProps = state => ({
  datasetList: state.scopeOption.datasetListReducer,
  datasetValue: state.selectedScope.scopeDatasetReducer,
  showDatasetSelection: state.selectionMenuProgress.showDatasetSelectionReducer,
});

export default connect(mapStateToProps)(DatasetDropdown);
