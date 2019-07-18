import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

class SchoolDropdown extends Component {
   // updates schoolValue in selectedScopeReducer, currentScope in local state
   // then dispatches request for list of relevant datasets
   handleSchoolListChange = (event, { value }) => {
     const scopeInfo = value;
     const currentScope = 'school';
     const payload = { currentScope, scopeInfo };
     this.props.dispatch({ type: 'GET_DATASET_LIST', payload });
     this.props.dispatch({ type: 'SET_SCOPE_OF_SCHOOL', payload: value });
     this.props.dispatch({ type: 'SET_CURRENT_LEVEL_OF_SCOPE', payload: 'school' });
   }

   // Renders either:
   // 1. loading dropdown menu
   // 2. list of states to select
   render() {
     if (this.props.schoolList[0] === 'School') {
       return (
         <Form.Dropdown
           search
           selection
           disabled
           fluid={this.props.fluid}
           options={[{ key: 0, value: null, text: null }]}
           placeholder="School"
           label={this.props.label}
         />
       );
     }
     const schoolListOptions = this.props.schoolList
       .map((option, i) => ({
         key: i,
         value: option.NCES_school_id,
         text: option.school_name,
       }));

     return (
       <Form.Dropdown
         search
         selection
         fluid={this.props.fluid}
         placeholder="School"
         value={this.props.schoolValue}
         onChange={this.handleSchoolListChange}
         options={schoolListOptions}
         label={this.props.label}
       />
     );
   }
}

const mapStateToProps = state => ({
  schoolList: state.scopeOption.schoolReducer,
  schoolValue: state.selectedScope.scopeSchoolReducer,
});

export default connect(mapStateToProps)(SchoolDropdown);
