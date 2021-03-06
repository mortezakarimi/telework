import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ReportsService} from '../services/reports.service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getReports, State} from '../reducers';
import * as fromReportList from '../reducers/reports.reducer';
import * as reportListActions from './actions/reports.actions';
import {ReportTypes} from './report.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public reports$: Observable<fromReportList.State> = this.store.pipe(select(getReports));

  constructor(private store: Store<State>) {
  }

  get reportTypes() {
    return ReportTypes;
  }

  ngOnInit() {
    this.store.dispatch(reportListActions.fetchReports());
  }

  manageReport(reportID) {
    this.store.dispatch(reportListActions.startEdit({reportID}));
  }

  addReport() {
    this.store.dispatch(reportListActions.startAdd());
  }
}
