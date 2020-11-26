import {
  LOAD_API,
  SET_DATA,
  START_FETCH,
  LOAD_CONFIRMED_API,
  SET_CONFIRMED_DATA,
  LOAD_CONFIRMED_BY_REGION_API,
  SET_CONFIRMED_BY_REGION_API,
  SET_INPUT,
  LOAD_API_ERROR,
} from './constants';

export function loadApi() {
  return {
    type: LOAD_API,
  };
}

export function loadConfirmedApi() {
  return {
    type: LOAD_CONFIRMED_API,
  };
}

export function loadConfirmedRegionApi() {
  return {
    type: LOAD_CONFIRMED_BY_REGION_API,
  };
}

export function setApiError(error) {
  return {
    type: LOAD_API_ERROR,
    error,
  };
}

export function startFetch() {
  return {
    type: START_FETCH,
    loading: true,
  };
}

export function setData(dataApi) {
  return {
    type: SET_DATA,
    payload: dataApi,
  };
}

export function setConfirmedData(dataApi) {
  return {
    type: SET_CONFIRMED_DATA,
    confirmed: dataApi,
  };
}

export function setConfirmedRegionData(dataApi) {
  return {
    type: SET_CONFIRMED_BY_REGION_API,
    confirmedRegion: dataApi,
  };
}

export function setInput(input) {
  return {
    type: SET_INPUT,
    input,
  };
}
