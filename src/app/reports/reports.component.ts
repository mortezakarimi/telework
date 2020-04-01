import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ReportsService} from '../services/reports.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import * as fromReportList from '../reducers/reports.reducer';
import * as reportListActions from '../actions/reports.actions';
import {ReportTypes} from '../models/report.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public reports$: Observable<fromReportList.State> = this.store.select('reports');

  constructor(private afAuth: AngularFireAuth, private reportService: ReportsService, private store: Store<State>) {
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

  get reportTypes() {
    return ReportTypes;
  }
}
