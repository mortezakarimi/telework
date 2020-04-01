import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ReportsRoutingModule} from './reports-routing.module';
import {ReportsComponent} from './reports.component';
import {ReportDetailComponent} from './report-detail/report-detail.component';
import {ManageReportComponent} from './manage-report/manage-report.component';
import {ReportListItemComponent} from './report-list-item/report-list-item.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    ReportsComponent,
    ReportDetailComponent,
    ManageReportComponent,
    ReportListItemComponent
  ],
  imports: [
    SharedModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReportListItemComponent
  ]
})
export class ReportsModule {
}
