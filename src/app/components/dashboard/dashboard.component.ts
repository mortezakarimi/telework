import {Component, OnInit} from '@angular/core';
import * as reportListActions from '../../actions/reports.actions';
import {Store} from '@ngrx/store';
import {State} from '../../reducers';
import {Observable} from 'rxjs';
import * as fromReportList from '../../reducers/reports.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public reports$: Observable<fromReportList.State> = this.store.select('reports');
  constructor( private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(reportListActions.fetchTodayReports());
  }

}
