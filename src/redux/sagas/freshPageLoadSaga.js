import { put, takeLatest } from 'redux-saga/effects';

function* setSelectedScopeFresh(action) {
  try {
    const { currentScope, scopeInfo } = action.payload;
    const {
      stateValue,
      districtValue,
      schoolValue,
      datasetValue,
      datasetYearValue,
    } = scopeInfo;

    // Preparing a payload for 'GET_DATASET_LIST' saga
    let datasetListPayload;
    if (currentScope === 'state') {
      datasetListPayload = { currentScope, scopeInfo: stateValue };
    } else if (currentScope === 'district') {
      datasetListPayload = { currentScope, scopeInfo: districtValue };
    } else if (currentScope === 'school') {
      datasetListPayload = { currentScope, scopeInfo: schoolValue };
    }

    yield put({ type: 'GET_DATASET_LIST', payload: datasetListPayload });

    // Saga calls
    yield put({ type: 'GET_STATE_LIST' });
    yield put({ type: 'GET_DISTRICT_LIST', payload: stateValue });

    // Verifies that there is a districtValue at all
    if (districtValue) {
      yield put({ type: 'GET_SCHOOL_LIST', payload: districtValue });
    }

    // Reducer calls
    yield put({ type: 'SET_SCOPE_OF_STATE', payload: stateValue });
    yield put({ type: 'SET_SCOPE_OF_DISTRICT', payload: districtValue });
    yield put({ type: 'SET_SCOPE_OF_SCHOOL', payload: schoolValue });
    yield put({ type: 'SET_SCOPE_OF_DATASET', payload: datasetValue });
    yield put({ type: 'SET_SCOPE_OF_DATASET_YEAR', payload: Number(datasetYearValue) });
    yield put({ type: 'SET_CURRENT_LEVEL_OF_SCOPE', payload: currentScope });

    yield put({ type: 'SET_YEAR_SELECTION_APPEARANCE', payload: true });
    yield put({ type: 'SET_DATASET_SELECTION_APPEARANCE', payload: true });
    yield put({ type: 'SET_CONTINUE_BUTTON_APPEARANCE', payload: true });
  } catch (error) {
    console.log('Error setting selected scope from scratch:', error);
  }
}

function* registrationSaga() {
  yield takeLatest('SET_SELECTED_SCOPE_FRESH', setSelectedScopeFresh);
}

export default registrationSaga;
