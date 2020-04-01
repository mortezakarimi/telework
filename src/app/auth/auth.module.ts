import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AuthComponent} from './auth.component';
import {RouterModule} from '@angular/router';
import {AngularFireAuthGuard, redirectLoggedInTo} from '@angular/fire/auth-guard';
import {SharedModule} from '../shared/shared.module';

const redirectLoggedInToItems = () => redirectLoggedInTo(['']);

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: AuthComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToItems, registration: false}
      },
      {
        path: 'register',
        component: AuthComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToItems, registration: true}
      }
    ]),
    FontAwesomeModule
  ]
})
export class AuthModule {
}
