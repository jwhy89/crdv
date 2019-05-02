import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Header } from 'semantic-ui-react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SelectionPage.css';

import RenderStateInput from '../SelectionComponents/StateDropdown';
import RenderDistrictInput from '../SelectionComponents/DistrictDropdown';
import RenderSchoolInput from '../SelectionComponents/SchoolDropdown';
import RenderDatasetInput from '../SelectionComponents/DatasetDropdown';
import RenderDatasetYearInput from '../SelectionComponents/DatasetYearDropdown';


class SelectionPage extends Component {

   state = {
      allowContinue: false,
      showYearSelection: false,
   }

   // Function handles URL pathing
   goToVisualizer = (payload) => {
      let { currentScope } = payload;
      let { scopeIdentity, datasetValue, datasetYearValue } = payload.scopeInfo;

      // Convert datasetValue into a string with underscores
      let datasetValueArray = datasetValue.split(' ');
      let datasetValueMod = datasetValueArray.join('_');
      // Save url into a string
      let urlString = `/visualizer/${currentScope}/${scopeIdentity}/${datasetValueMod}/${datasetYearValue}`;
      // Push urlString onto history stack
      this.props.history.push(urlString);
   }

   // Handles activation of form submission button
   handleSubmit = () => {
      const {
         stateValue,
         districtValue,
         schoolValue,
         datasetValue,
         datasetYearValue,
         currentScope
      } = this.props;

      // Define scope as a variable scopeIdentity
      let scopeIdentity;
      if (currentScope === 'state') {
         scopeIdentity = stateValue;
      } else if (currentScope === 'district') {
         scopeIdentity = districtValue;
      } else if (currentScope === 'school') {
         scopeIdentity = schoolValue;
      }

      // save scope information in object scopeInfo
      const scopeInfo = { scopeIdentity, datasetValue, datasetYearValue };

      // Save data in object payload and send as arguement to goToVisualizer
      const payload = { currentScope, scopeInfo };
      this.goToVisualizer(payload);
   }

   // Loads list of states after component mounts
   componentDidMount = () => {
      this.props.dispatch({ type: 'GET_STATE_LIST' });
   }

   // updates stateValue in selectedScopeReducer, currentScope in local state
   // then dispatches request for list of relevant districts
   handleStateListChange = (event, { value }) => {
      this.props.dispatch({ type: 'GET_DISTRICT_LIST', payload: value });
      this.props.dispatch({ type: 'SET_SCOPE_OF_STATE', payload: value });
      this.props.dispatch({ type: 'SET_CURRENT_LEVEL_OF_SCOPE', payload: 'state' });
   }

   // updates districtValue in selectedScopeReducer, currentScope in local state
   // then dispatches request for list of relevant schools
   handleDistrictListChange = (event, { value }) => {
      this.props.dispatch({ type: 'GET_SCHOOL_LIST', payload: value });
      this.props.dispatch({ type: 'SET_SCOPE_OF_DISTRICT', payload: value });
      this.props.dispatch({ type: 'SET_CURRENT_LEVEL_OF_SCOPE', payload: 'district' });
   }

   // updates schoolValue in selectedScopeReducer, currentScope in local state
   // then dispatches request for list of relevant datasets
   handleSchoolListChange = (event, { value }) => {
      // destructures everything except schoolValue and currentScope
      // schoolValue is passed as the prop 'value'
      // currentScope isn't set until setState, which is after the dispatch
      const { stateValue, districtValue } = this.props;
      const scopeInfo = { stateValue, districtValue, schoolValue: value };
      const currentScope = 'school';
      const payload = { currentScope, scopeInfo };
      this.props.dispatch({ type: 'GET_DATASET_LIST', payload: payload });
      this.props.dispatch({ type: 'SET_SCOPE_OF_SCHOOL', payload: value });
      this.props.dispatch({ type: 'SET_CURRENT_LEVEL_OF_SCOPE', payload: 'school' });

      this.setState({
         allowContinue: true,
      });
   }

   // updates datasetValue in selectedScopeReducer
   handleDatasetListChange = (event, { value }) => {
      this.props.dispatch({ type: 'SET_SCOPE_OF_DATASET', payload: value });

      this.setState({
         showYearSelection: true,
      });
   }

   // updates datasetYearValue in selectedScopeReducer
   handleDatasetYearListChange = (event, { value }) => {
      this.props.dispatch({ type: 'SET_SCOPE_OF_DATASET_YEAR', payload: value });
   }

   render() {
      return (
         <section className="SelectionPage-section">
            <Segment>
               <Header as='h1'>Select Scope of Data</Header>

               <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                     <RenderStateInput
                        stateValue={this.props.stateValue}
                        handleStateListChange={this.handleStateListChange}
                        isRequired={true}/>
                     <RenderDistrictInput
                        districtValue={this.props.districtValue}
                        handleDistrictListChange={this.handleDistrictListChange}/>
                  </Form.Group>

                  <RenderSchoolInput
                     schoolValue={this.props.schoolValue}
                     handleSchoolListChange={this.handleSchoolListChange}/>

                  <Form.Group widths="equal">
                     <RenderDatasetInput
                        datasetValue={this.props.datasetValue}
                        handleDatasetListChange={this.handleDatasetListChange}
                        allowContinue={this.state.allowContinue}/>
                     <RenderDatasetYearInput
                        datasetYearValue={this.props.datasetYearValue}
                        handleDatasetYearListChange={this.handleDatasetYearListChange}
                        showYearSelection={this.state.showYearSelection}
                        datasetValue={this.props.datasetValue}/>
                  </Form.Group>

                  {this.state.allowContinue ?
                     <Form.Button
                        type="submit"
                        primary
                        fluid>
                        Continue
                  </Form.Button> :
                     <Form.Button
                        type="button"
                        primary
                        disabled
                        fluid>
                        Continue
                  </Form.Button>}

               </Form>
            </Segment>
         </section>
      );
   }
}

const mapStateToProps = state => ({
   user: state.user,
   stateValue: state.selectedScope.scopeStateReducer,
   districtValue: state.selectedScope.scopeDistrictReducer,
   schoolValue: state.selectedScope.scopeSchoolReducer,
   datasetValue: state.selectedScope.scopeDatasetReducer,
   datasetYearValue: state.selectedScope.scopeDatasetYearReducer,
   currentScope: state.selectedScope.scopeCurrentLevelReducer,
});

export default connect(mapStateToProps)(withRouter(SelectionPage));
