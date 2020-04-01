import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {Report} from '../reports/report.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private listRef: AngularFireList<Report>;

  constructor(private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
    const userId = this.afAuth.auth.currentUser.uid;
    this.listRef = this.afDatabase.list(`reports/${userId}`, ref => ref.orderByChild('createdAt'));
  }

  public getReportListForUser() {
    return this.listRef.valueChanges().pipe(map(s => s.reverse()));
  }

  public addReport(report: Report) {
    this.listRef.push(report);
  }
}
