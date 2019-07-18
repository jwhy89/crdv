import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import scopeOption from './scopeOptionReducer';
import currentDataset from './currentDatasetReducer';
import selectedScope from './selectedScopeReducer';
import selectionMenuProgress from './selectionMenuProgressReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  scopeOption, // will store the names of states, relevant districts, and relevant schools
  currentDataset, // stores current dataset to be visualized
  selectedScope, // stores information regarding the current selected scope of data
  selectionMenuProgress, // stores booleans that determine if user can progress in selection menu
});

export default rootReducer;
