import {createAction, props} from '@ngrx/store';
import {Report} from '../models/report.model';

export const fetchReports = createAction('[Report list] fetch reports');
export const fetchSuccess = createAction('[Report list] fetch success reports', props<{ reports: Report[] }>());

export const startAdd = createAction('[Report list] Start Adding report');
export const addReport = createAction('[Report list] Adding report', props<{ report: Report }>());

export const startEdit = createAction('[Report list] Start editing report', props<{ reportID: string }>());
export const editReport = createAction('[Report list] Editing report', props<{ report: Report }>());

export const doneAddOrEdit = createAction('[Report list] Done adding or editing report');
export const stopAddOrEdit = createAction('[Report list] Stop adding or editing report');
