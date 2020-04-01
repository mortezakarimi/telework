import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromReportList from './reports.reducer';

export interface State {
  reports: fromReportList.State;
}

export const reducers: ActionReducerMap<State> = {
  reports: fromReportList.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
