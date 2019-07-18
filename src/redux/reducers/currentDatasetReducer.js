const specificDatasetReducer = (state = ['Data'], action) => {
  switch (action.type) {
    case 'SET_SPECIFIC_DATASET':
      return action.payload;
    default:
      return state;
  }
};

export default specificDatasetReducer;
