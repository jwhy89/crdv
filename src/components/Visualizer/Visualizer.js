import React from 'react';
import { connect } from 'react-redux';
import { Placeholder, Segment, Header, Breadcrumb } from 'semantic-ui-react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import './Visualizer.css';

// import RenderStateInput from '../SelectionComponents/StateDropdown';
// import RenderDistrictInput from '../SelectionComponents/DistrictDropdown';
// import RenderSchoolInput from '../SelectionComponents/SchoolDropdown';

class Visualizer extends Component {

   componentDidMount = () => {
      this.getUrl();
   }

   getUrl = () => {
      // Breaking down URL into an array pathSplit
      const pathSplit = window.location.hash.split('/')
      console.log(pathSplit);

      // Retrieving scope points from URL
      const currentScope = String(pathSplit[2]);
      const datasetYearValue = String(pathSplit[4]);
      const stateValue = String(pathSplit[5]);
      let districtValue = null;
      let schoolValue = null;

      // Parse URL for districtValue and schoolValue
      // This works because first 7 digits of SchoolID are the District ID
      if (String(pathSplit[6]).length === 7) {
         districtValue = String(pathSplit[6]);
      } else if (String(pathSplit[6]).length === 12) {
         districtValue = String(pathSplit[6]).substring(0, 7);
         schoolValue = String(pathSplit[6]);
      }

      // save current scope's relevant value in a variable scopeIdentity
      let scopeIdentity;
      if (currentScope === 'state') {
         scopeIdentity = stateValue;
      } else if (currentScope === 'district') {
         scopeIdentity = districtValue;
      } else if (currentScope === 'school') {
         scopeIdentity = schoolValue;
      }

      // Rebuilding dataset name from URL
      const datasetValueMod = String(pathSplit[3]);
      const datasetValueArray = datasetValueMod.split('_');
      const datasetValue = datasetValueArray.join(' ');

      // Combining scope into a saga-ready payload
      let scopeInfo = { scopeIdentity, datasetValue, datasetYearValue };
      let payload = { currentScope, scopeInfo };

      this.props.dispatch({ type: 'GET_SPECIFIC_DATASET', payload: payload });
   }

   renderGraph = (dataset, i) => {
      let tableData = [
         dataset['American Indian or Alaska Native'],
         dataset['Asian'],
         dataset['Hawaiian/ Pacific Islander'],
         dataset['Hispanic'],
         dataset['Black'],
         dataset['White'],
         dataset['Two or more races']
      ];

      console.log('dataset', i, '--', tableData);

      let data = {
         labels: [
            "American Indian or Alaska Native",
            "Asian",
            "Hawaiian/ Pacific Islander",
            "Hispanic",
            "Black",
            "White",
            "Two or more races"
         ],
         datasets: [{
            label: dataset['Category'],
            data: tableData,
            backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)',
               'rgba(245, 134, 23, 0.2)',
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)',
               'rgba(245, 134, 23, 1)',
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
         }]
      };

      return (
         <Segment>
            <Pie
               data={data}
               // width={400}
               height={400}
               options={{
                  maintainAspectRatio: false,
                  legend: {
                     display: true,
                     position: 'right',
                  },
                  title: {
                     display: true,
                     text: dataset['Category'],
                     fontSize: 25,
                  }
               }}
            />
         </Segment>
      );
   }

   handleGraphRender = () => {
      if (this.props.dataset[0] === "Data") {
         return (
            <section className="Visualizer-graph-placeholder">
               <Placeholder style={{ height: 400, width: 400 }}>
                  <Placeholder.Image />
               </Placeholder>
            </section>
         );
      } else {
         return (this.props.dataset.map((datarow, i) =>
            <div className="Visualizer-div-graph" key={i}>
               {this.renderGraph(datarow, i)}
            </div>
         ));
      }
   }

   render() {
      return (
         <section className="Visualizer-section-body">
            <Header as="h3" textAlign='left'>
               {this.props.datasetValue}
            </Header>

            {/* <RenderStateInput isRequired={true} />
            <RenderDistrictInput />
            <RenderSchoolInput /> */}

            <Breadcrumb>
               <Breadcrumb.Section link>Home</Breadcrumb.Section>
               <Breadcrumb.Divider />
               <Breadcrumb.Section link>Store</Breadcrumb.Section>
               <Breadcrumb.Divider icon='right angle' />
               <Breadcrumb.Section active>
                  Search for:
                  {/* <a href='#'>paper towels</a> */}
               </Breadcrumb.Section>
            </Breadcrumb>

            {this.handleGraphRender()}
         </section >
      );
   }
}

const mapStateToProps = state => ({
   user: state.user,
   dataset: state.currentDataset,
   // stateValue: state.selectedScope.scopeStateReducer,
   // districtValue: state.selectedScope.scopeDistrictReducer,
   // schoolValue: state.selectedScope.scopeSchoolReducer,
   datasetValue: state.selectedScope.scopeDatasetReducer,
   // datasetYearValue: state.selectedScope.scopeDatasetYearReducer,
   // currentScope: state.selectedScope.scopeCurrentLevelReducer,
});

export default connect(mapStateToProps)(withRouter(Visualizer));
