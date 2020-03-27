import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireAuthGuard, AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register/register.component';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireAuthGuardModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([])
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
