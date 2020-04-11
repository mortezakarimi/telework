import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromReportList from './reports.reducer';

export interface State {
  reports: fromReportList.State;
}

export const reducers: ActionReducerMap<State> = {
  reports: fromReportList.reducer
};

export const selectReports = (state: State) => state.reports;

export const getReports = createSelector(
  selectReports,
  (state: fromReportList.State) => state
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
