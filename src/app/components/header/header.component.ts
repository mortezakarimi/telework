import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {Store} from '@ngrx/store';
import {State} from '../../reducers';
import * as reportListActions from '../../actions/reports.actions';
import {map} from 'rxjs/operators';
import {ReportTypes} from '../../models/report.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() brand: string;

  public user: User;
  public isCheckIn = false;

  constructor(private authService: AuthService, private database: AngularFireDatabase, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.select('reports').pipe(
      map(reportsState => (reportsState.reports))
    ).subscribe((reports) => {
      const index = reports.findIndex((value) => value.type === ReportTypes.checkIn);
      this.isCheckIn = index !== -1;
    });
    let callback = null;
    let metadataRef = null;
    this.authService.getUser().onAuthStateChanged((user: User) => {
      // Remove previous listener.
      if (callback) {
        metadataRef.off('value', callback);
      }
      // On user login add new listener.
      if (user) {
        // Check if refresh is required.
        metadataRef = this.database.database.ref('metadata/' + user.uid + '/refreshTime');
        callback = (snapshot) => {
          // Force refresh to pick up the latest custom claims changes.
          // Note this is always triggered on first call. Further optimization could be
          // added to avoid the initial trigger when the token is issued and already contains
          // the latest claims.
          user.getIdToken(true);
        };
        // Subscribe new listener to changes on that node.
        metadataRef.on('value', callback);
        this.user = user;
      }
    });
  }

  logout() {
    this.authService.doLogout();
  }

  doImHere() {
    if (!this.isCheckIn) {
      this.store.dispatch(reportListActions.iAmHereReport());
    }
  }
}
