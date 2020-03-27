import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() brand: string;

  public user: User;

  constructor(private authService: AuthService, private database: AngularFireDatabase) {
  }

  ngOnInit(): void {
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
          console.log('token refresh');
          user.getIdToken(true);
        };
        // Subscribe new listener to changes on that node.
        metadataRef.on('value', callback);
        console.log('user data:', user);
        this.user = user;
      }
    });
  }

  logout() {
    this.authService.doLogout();
  }
}
