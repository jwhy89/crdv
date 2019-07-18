import { combineReducers } from 'redux';

const showDatasetSelectionReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_DATASET_SELECTION_APPEARANCE':
      return action.payload;
    default:
      return state;
  }
};

const showYearSelectionReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_YEAR_SELECTION_APPEARANCE':
      return action.payload;
    default:
      return state;
  }
};

const allowContinueReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_CONTINUE_BUTTON_APPEARANCE':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  showDatasetSelectionReducer,
  showYearSelectionReducer,
  allowContinueReducer,
});

export default rootReducer;
