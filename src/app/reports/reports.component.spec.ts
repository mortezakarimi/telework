import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {MemoizedSelector} from '@ngrx/store';

import {ReportsComponent} from './reports.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {of, Subject} from 'rxjs';
import {User} from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {Report, ReportTypes} from './report.model';
import * as fromApp from '../reducers';
import * as fromReportList from '../reducers/reports.reducer';
import {By} from '@angular/platform-browser';
import {ReportListItemComponent} from './report-list-item/report-list-item.component';
import {ManageReportComponent} from './manage-report/manage-report.component';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let mockStore: MockStore;
  let mockReportsSelector: MemoizedSelector<fromApp.State, fromReportList.State>;
  const authStub: any = {
    authState: new Subject<User>(),
    auth: {
      currentUser: {
        uid: '12345'
      },
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

  const initialState: fromReportList.State = {
    reports: [
      new Report(ReportTypes.checkIn, 'Test title', []),
      new Report(ReportTypes.FirstDay, 'Test title2', [])
    ],
    editedReport: null,
    editedReportID: null,
    showForm: false
  };
  let mockAuth: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsComponent],
      providers: [
        provideMockStore(),
        {provide: AngularFireAuth, useValue: authStub},
        {provide: AngularFireDatabase, useValue: AngularFireDatabaseStub},
        {provide: AngularFirestore}
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;

    mockAuth = TestBed.get(AngularFireAuth);
    mockStore = TestBed.inject(MockStore);

    mockReportsSelector = mockStore.overrideSelector(
      fromApp.getReports,
      initialState
    );
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Report items count', () => {
    component.reports$.subscribe((reportsObj) => {
      expect(reportsObj.reports.length).toEqual(2);
    });
  });

  it('Check reports component element exist', () => {
    expect(fixture.debugElement.queryAll(By.css('app-report-list-item')).length).toEqual(2);
  });

  it('Check reports component element exist', () => {
    expect(fixture.debugElement.queryAll(By.css('app-report-list-item')).length).toEqual(2);
  });

  it('Check add button exist on initial state', () => {
    fixture.detectChanges();
    const addBtn = fixture.debugElement.query(By.css('#addReportBtn'));
    expect(addBtn).toBeTruthy();
    expect(addBtn.nativeElement.textContent).toBe('Add Report');
  });

  it('Check add button hidden when form show', () => {
    mockReportsSelector.setResult({...initialState, showForm: true});
    mockStore.refreshState();
    fixture.detectChanges();
    const addBtn = fixture.debugElement.query(By.css('#addReportBtn'));
    expect(addBtn).toBeNull();
  });
});

export class AngularFireDatabaseStub {
  list(query: string): any {
    return {
      valueChanges() {
        return of([
          {
            date: 12345,
            name: 'Hello World'
          },
          {
            date: 456779,
            name: 'Hola Mundo'
          }
        ]);
      }
    };
  }
}
