import { createSelector } from 'reselect';
import { initialState } from './reducer';
export const selectDashboardReducer = () => state =>
  state.dashboard || initialState;

export const getDataApi = () =>
  createSelector(
    selectDashboardReducer(),
    state => state.data,
  );

export const getDataConfirmedApi = () =>
  createSelector(
    selectDashboardReducer(),
    state => state.confirmedData,
  );

export const getDataConfirmedRegionApi = () =>
  createSelector(
    selectDashboardReducer(),
    state => state.confirmedDataRegion,
  );

export const getInput = () =>
  createSelector(
    selectDashboardReducer(),
    state => state.input,
  );

export default {
  getDataApi,
  getDataConfirmedApi,
  getDataConfirmedRegionApi,
  getInput,
};
