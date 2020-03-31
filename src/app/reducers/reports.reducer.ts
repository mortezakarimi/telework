import {Action, createReducer, on} from '@ngrx/store';
import * as ReportListActions from '../actions/reports.actions.js';
import {Report} from '../models/report.model';

export interface State {
  reports: Report[];
  editedReport: Report;
  editedReportID: string;
  showForm: boolean;
}

export const initialState: State = {
  reports: [],
  editedReport: null,
  editedReportID: null,
  showForm: false
};

const reportsReducer = createReducer(
  initialState,
  on(ReportListActions.fetchSuccess, (state, action) => ({
    ...state, reports: [...action.reports]
  })),
  on(ReportListActions.startAdd, (state, action) => ({...state, showForm: true, editedReport: null, editedReportID: null})),
  on(ReportListActions.addReport, (state, action) => ({
    ...state,
    reports: [...state.reports, action.report],
    showForm: false,
    editedReport: null,
    editedReportID: null
  })),
  on(ReportListActions.startEdit, (state, action) => {
    const index = state.reports.findIndex((report) => {
      return report.key === action.reportID;
    });
    if (-1 === index) {
      return {
        ...state,
        showForm: false,
        editedReportID: null,
        editedReport: null
      };
    }
    return {
      ...state,
      showForm: true,
      editedReportID: action.reportID,
      editedReport: {...state.reports[index]}
    };
  }),
  on(ReportListActions.editReport, (state, action) => {
    return {...state, showForm: false};
  }),
  on(ReportListActions.doneAddOrEdit, (state, action) => {
    return {
      ...state,
      editedReport: null,
      editedReportID: null,
      showForm: false
    };
  }),
  on(ReportListActions.stopAddOrEdit, (state, action) => ({
    ...state,
    editedReport: null,
    editedReportID: null,
    showForm: false
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return reportsReducer(state, action);
}
