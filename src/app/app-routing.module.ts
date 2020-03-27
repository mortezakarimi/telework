import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register/register.component';
import {AngularFireAuthGuard, hasCustomClaim, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToItems}
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToItems}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
