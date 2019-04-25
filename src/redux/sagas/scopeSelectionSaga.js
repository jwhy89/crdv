import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchStateList() {
  try {
    const response = yield axios.get('/api/data/state');
    yield put({ type: 'SET_STATE_LIST', payload: response.data });
  } catch (error) {
    console.log('list of states GET request failed', error);
  }
}

function* fetchDistrictList(action) {
  try {
    let state = action.payload;
    const response = yield axios.get(`/api/data/${state}/district`);
    yield put({ type: 'SET_DISTRICT_LIST', payload: response.data });
  } catch (error) {
    console.log('list of districts GET request failed', error);
  }
}

function* scopeSelectionSaga() {
  yield takeLatest('GET_STATE_LIST', fetchStateList);
  yield takeLatest('GET_DISTRICT_LIST', fetchDistrictList);
}

export default scopeSelectionSaga;
