import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

class DistrictDropdown extends Component {
   // updates districtValue in selectedScopeReducer, currentScope in local state
   // then dispatches request for list of relevant schools
   handleDistrictListChange = (event, { value }) => {
     const scopeInfo = value;
     const currentScope = 'district';
     const payload = { currentScope, scopeInfo };
     this.props.dispatch({ type: 'GET_DATASET_LIST', payload });
     this.props.dispatch({ type: 'GET_SCHOOL_LIST', payload: value });
     this.props.dispatch({ type: 'SET_SCOPE_OF_DISTRICT', payload: value });
     this.props.dispatch({ type: 'SET_CURRENT_LEVEL_OF_SCOPE', payload: 'district' });
   }

   // Renders either:
   // 1. loading dropdown menu
   // 2. list of states to select
   render() {
     if (this.props.districtList[0] === 'District') {
       return (
         <Form.Dropdown
           search
           selection
           disabled
           options={[{ key: 0, value: null, text: null }]}
           placeholder="District"
           label={this.props.label}
         />
       );
     }
     const districtListOptions = this.props.districtList.map((option, i) => ({
       key: i,
       value: option.NCES_district_id,
       text: option.LEA_name,
     }));

     return (
       <Form.Dropdown
         search
         selection
         placeholder="District"
         value={this.props.districtValue}
         onChange={this.handleDistrictListChange}
         options={districtListOptions}
         label={this.props.label}
       />
     );
   }
}

const mapStateToProps = state => ({
  districtList: state.scopeOption.districtReducer,
  districtValue: state.selectedScope.scopeDistrictReducer,
});

export default connect(mapStateToProps)(DistrictDropdown);
