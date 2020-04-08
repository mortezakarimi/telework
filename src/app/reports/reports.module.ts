import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ReportsRoutingModule} from './reports-routing.module';
import {ReportsComponent} from './reports.component';
import {ReportDetailComponent} from './report-detail/report-detail.component';
import {ManageReportComponent} from './manage-report/manage-report.component';
import {ReportListItemComponent} from './report-list-item/report-list-item.component';
import {SharedModule} from '../shared/shared.module';
import {UnlessDirective} from './directives/unless/unless.directive';


@NgModule({
  declarations: [
    ReportsComponent,
    ReportDetailComponent,
    ManageReportComponent,
    ReportListItemComponent,
    UnlessDirective
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
