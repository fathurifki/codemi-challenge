/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  SET_DATA,
  START_FETCH,
  SET_CONFIRMED_DATA,
  SET_CONFIRMED_BY_REGION_API,
  SET_INPUT,
  LOAD_API_ERROR,
} from './constants';

export const initialState = {
  data: false,
  confirmedData: false,
  confirmedDataRegion: false,
  loading: false,
  input: 'ID',
  error: false,
};

const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_FETCH:
        draft.loading = true;
        break;

      case SET_DATA:
        draft.loading = false;
        draft.data = action.payload;
        break;

      case LOAD_API_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;

      case SET_CONFIRMED_DATA:
        draft.loading = false;
        draft.confirmedData = action.confirmed;
        break;

      case SET_CONFIRMED_BY_REGION_API:
        draft.loading = false;
        draft.confirmedDataRegion = action.confirmedRegion;
        break;

      case SET_INPUT:
        draft.input = action.input;
        break;

      default:
        return state;
    }
  });

export default dashboardReducer;
