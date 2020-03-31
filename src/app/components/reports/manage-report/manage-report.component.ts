import {Component, OnDestroy, OnInit} from '@angular/core';
import {Report, ReportItem, ReportItemsStatus, ReportTypes} from '../../../models/report.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReportsService} from '../../../services/reports.service';
import * as reportListActions from '../../../actions/reports.actions';
import {Store} from '@ngrx/store';
import {State} from '../../../reducers';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-report',
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.scss']
})
export class ManageReportComponent implements OnInit, OnDestroy {
  public editingMode = false;
  private title;
  public reportForm: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    type: [null, [Validators.required]],
    items: this.fb.array([
      this.createReportItem()
    ], [Validators.required, Validators.minLength(1)])
  });

  constructor(private fb: FormBuilder, private reportService: ReportsService, private store: Store<State>, private modalService: NgbModal) {
    const type = this.calculateCurrentSuggestedType();
    this.reportForm.patchValue({type});
  }

  ngOnInit(): void {
    this.store.select('reports').subscribe((stateData) => {
      if (stateData.showForm) {
        if (null === stateData.editedReport) {
          this.resetForm();
          this.editingMode = false;
        } else {
          this.editingMode = true;
          this.items.clear();
          stateData.editedReport.items.forEach((value, index) => {
            this.items.push(this.createReportItem(value));
          });
          this.title = stateData.editedReport.title;
          this.reportForm.patchValue({
            title: stateData.editedReport.title,
            type: stateData.editedReport.type
          });
        }
      } else {
        this.editingMode = false;
      }
    });
  }

  get items() {
    return this.reportForm.get('items') as FormArray;
  }

  createReportItem(reportItem: ReportItem = {content: null, status: ReportItemsStatus.WorkInProgress}): FormGroup {
    return this.fb.group({
      content: [reportItem.content, [Validators.required]],
      status: [reportItem.status, [Validators.required]]
    });
  }

  addReportItem() {
    const control = this.createReportItem();
    this.items.push(control);
  }

  get reportTypeList() {
    return ReportTypes;
  }

  get reportItemStatusList() {
    return ReportItemsStatus;
  }

  submitReport() {
    if (this.reportForm.invalid) {
      return false;
    }
    const reportForm = this.reportForm.getRawValue() as Report;
    const report = new Report(reportForm.type, reportForm.title, reportForm.items);
    if (this.editingMode) {
      this.store.dispatch(reportListActions.editReport({report}));
    } else {
      this.store.dispatch(reportListActions.addReport({report}));
    }
    // this.store.dispatch(reportsActions.storeReports());
    this.resetForm();
  }

  private resetForm() {
    const type = this.calculateCurrentSuggestedType();
    this.items.clear();
    this.items.push(this.createReportItem());
    this.reportForm.patchValue({
      title: null,
      type,
    });
  }

  private calculateCurrentSuggestedType() {
    const now = new Date();
    const firstDay = new Date().setHours(0, 0, 0, 0);
    const midDay = new Date().setHours(12, 0, 0, 0);
    const endDay = new Date().setHours(18, 0, 0, 0);

    let type = ReportTypes.FirstDay;
    if (now.getTime() < midDay && now.getTime() > firstDay) {
      type = ReportTypes.FirstDay;
    } else if (now.getTime() > midDay && now.getTime() < endDay) {
      type = ReportTypes.MidDay;
    } else if (now.getTime() > endDay) {
      type = ReportTypes.EndDay;
    }
    return type;
  }

  onCancelEdit() {
    this.store.dispatch(reportListActions.stopAddOrEdit());
  }

  ngOnDestroy(): void {
    this.store.dispatch(reportListActions.stopAddOrEdit());
  }

  get formTitle() {

    return this.editingMode ? 'Edit ' + this.title : 'Add report';
  }

  removeItem(itemIndex: number) {
    this.items.removeAt(itemIndex);
  }
}
