import { call, put, takeLatest, all, fork, select } from 'redux-saga/effects';
import {
  LOAD_API,
  LOAD_CONFIRMED_API,
  LOAD_CONFIRMED_BY_REGION_API,
} from './constants';
import {
  setData,
  startFetch,
  setConfirmedData,
  setConfirmedRegionData,
  setApiError,
} from './actions';

import request from '../../utils/request';
import { getInput } from './selector';

export function* handleRequest() {
  const requestUrl = `https://covid19.mathdro.id/api`;

  yield put(startFetch());
  try {
    const result = yield call(request, requestUrl);
    const { confirmed, recovered, deaths } = result;
    const finalResult = { confirmed, recovered, deaths };
    yield put(setData(finalResult));
  } catch (error) {
    yield put(setApiError(error));
  }
}

export function* handleConfirmedRequest() {
  const showRow = 10;
  const requestUrl = `https://covid19.mathdro.id/api/confirmed`;

  yield put(startFetch());
  try {
    const result = yield call(request, requestUrl);
    const dataResult =
      result && result.filter((val, i) => i < showRow).map((data, i) => data);
    yield put(setConfirmedData(dataResult));
  } catch (error) {
    yield put(setApiError(error));
  }
}

export function* handleConfirmedRegionRequest() {
  const countryInput = yield select(getInput());
  const requestUrl = `https://covid19.mathdro.id/api/countries/${countryInput}`;

  yield put(startFetch());
  try {
    const result = yield call(request, requestUrl);
    const { confirmed, recovered, deaths } = result;
    const finalResult = { confirmed, recovered, deaths };
    yield put(setConfirmedRegionData(finalResult));
  } catch (error) {
    yield put(setApiError(error));
  }
}

function* watchRequest() {
  yield takeLatest(LOAD_API, handleRequest);
  yield takeLatest(LOAD_CONFIRMED_API, handleConfirmedRequest);
  yield takeLatest(LOAD_CONFIRMED_BY_REGION_API, handleConfirmedRegionRequest);
}

export default function* rootSaga() {
  yield all([fork(watchRequest)]);
}
