import { combineReducers } from 'redux';

const scopeStateReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SCOPE_OF_STATE':
      return action.payload;
    default:
      return state;
  }
};

const scopeDistrictReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SCOPE_OF_DISTRICT':
      return action.payload;
    default:
      return state;
  }
};

const scopeSchoolReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SCOPE_OF_SCHOOL':
      return action.payload;
    default:
      return state;
  }
};

const scopeDatasetReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SCOPE_OF_DATASET':
      return action.payload;
    default:
      return state;
  }
};

const scopeDatasetYearReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SCOPE_OF_DATASET_YEAR':
      return action.payload;
    default:
      return state;
  }
};

const scopeCurrentLevelReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_CURRENT_LEVEL_OF_SCOPE':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  scopeStateReducer,
  scopeDistrictReducer,
  scopeSchoolReducer,
  scopeDatasetReducer,
  scopeDatasetYearReducer,
  scopeCurrentLevelReducer,
});

export default rootReducer;
