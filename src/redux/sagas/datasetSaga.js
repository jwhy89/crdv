import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSpecificDataset(action) {
  try {
    const { currentScope, scopeInfo } = action.payload;
    const { scopeIdentity, datasetValue, datasetYearValue } = scopeInfo;

    const urlString = `/api/data/scope/${currentScope}/${scopeIdentity}/${datasetValue}/${datasetYearValue}`;
    const response = yield axios.get(urlString);

    yield put({ type: 'SET_SPECIFIC_DATASET', payload: response.data });
  } catch (error) {
    console.log('specific dataset GET request failed', error);
  }
}

function* scopeSelectionSaga() {
  yield takeLatest('GET_SPECIFIC_DATASET', fetchSpecificDataset);
}

export default scopeSelectionSaga;
