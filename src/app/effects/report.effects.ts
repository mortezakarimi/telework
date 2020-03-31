import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as ReportsActions from '../actions/reports.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {Report} from '../models/report.model';
import {Store} from '@ngrx/store';
import {State} from '../reducers';

@Injectable()
export class ReportEffects {
  @Effect()
  fetchReports = this.actions$.pipe(ofType(ReportsActions.fetchReports),
    withLatestFrom(this.afAuth.user),
    switchMap(([actionData, userState]) => (
        this.afDatabase.list<Report>(`reports/${userState.uid}`, ref => ref.orderByChild('createdAt')).snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({key: c.payload.key, ...c.payload.val()})).reverse()
          )
        )
      ),
    ),
    map((reports: Report[]) => {
      return ReportsActions.fetchSuccess({reports});
    })
  );

  @Effect()
  addReport = this.actions$.pipe(ofType(ReportsActions.addReport),
    withLatestFrom(this.afAuth.user),
    switchMap(([actionData, userState]) => this.afDatabase.list<Report>(`reports/${userState.uid}`).push(actionData.report)),
    map(() => {
      return ReportsActions.doneAddOrEdit();
    })
  );


  @Effect()
  editReport = this.actions$.pipe(ofType(ReportsActions.editReport),
    withLatestFrom(this.afAuth.user, this.store.select('reports')),
    switchMap(([actionData, userState, reportsState]) => {
        return this.afDatabase.list<Report>(`reports/${userState.uid}`).set(reportsState.editedReportID, {
          ...actionData.report,
          createdAt: reportsState.editedReport.createdAt
        });
      },
    ),
    map(() => {
      return ReportsActions.doneAddOrEdit();
    })
  );


  constructor(private actions$: Actions, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private store: Store<State>) {
  }
}
