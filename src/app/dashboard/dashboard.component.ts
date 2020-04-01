import {Component, OnInit} from '@angular/core';
import * as reportListActions from '../reports/actions/reports.actions';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {Observable} from 'rxjs';
import * as fromReportList from '../reducers/reports.reducer';
import {ReportTypes} from '../reports/report.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public reports$: Observable<fromReportList.State> = this.store.select('reports');

  constructor(private store: Store<State>) {
  }

  get reportTypes() {
    return ReportTypes;
  }

  ngOnInit(): void {
    this.store.dispatch(reportListActions.fetchTodayReports());
  }

  getTypeName(type) {
    const list = ['Check in', 'First report', 'Second report', 'Last report'];
    return list[type];
  }
}
