import {User} from 'firebase/app';
import {TestBed} from '@angular/core/testing';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subject} from 'rxjs';

import {AuthService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';

describe('AuthService', () => {
  let service: AuthService;
  let mock: any;
  const email = 'email';
  const password = 'password';

  const authStub: any = {
    authState: new Subject<User>(),
    auth: {
      signInWithEmailAndPassword() {
        return Promise.resolve();
      },
      createUserWithEmailAndPassword() {
        return Promise.resolve();
      },
      signOut() {
        return Promise.resolve();
      },
      signInWithPopup() {
        return Promise.resolve();
      }
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: AngularFireAuth, useValue: authStub},
        {provide: AngularFirestore}
      ]
    });
    mock = TestBed.get(AngularFireAuth);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call signInWithPasswordAndEmail', () => {
    const spy = spyOn(authStub.auth, 'signInWithEmailAndPassword').and.callThrough();
    mock.auth = authStub.auth;

    service.doEmailLogin({email, password});

    expect(spy).toHaveBeenCalledWith(email, password);
  });

  it('should call doGoogleLogin', () => {
    const spy = spyOn(authStub.auth, 'signInWithPopup').and.callThrough();
    mock.auth = authStub.auth;

    service.doGoogleLogin();

    expect(spy).toHaveBeenCalled();
  });


  it('should call doRegister', () => {
    const spy = spyOn(authStub.auth, 'createUserWithEmailAndPassword').and.callThrough();
    mock.auth = authStub.auth;

    service.doRegister({email, password});

    expect(spy).toHaveBeenCalledWith(email, password);
  });

  it('should call doLogout', () => {
    const spy = spyOn(authStub.auth, 'signOut').and.callThrough();
    mock.auth = authStub.auth;

    service.doLogout();

    expect(spy).toHaveBeenCalled();
  });


  it('should call doLogout', () => {
    const spy = spyOn(authStub.auth, 'signOut').and.callThrough();
    mock.auth = authStub.auth;

    service.doLogout();

    expect(spy).toHaveBeenCalled();
  });

});
