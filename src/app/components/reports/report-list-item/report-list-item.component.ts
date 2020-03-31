import {Component, Input, OnInit} from '@angular/core';
import {ReportTypes} from '../../../models/report.model';

@Component({
  selector: 'app-report-list-item',
  templateUrl: './report-list-item.component.html',
  styleUrls: ['./report-list-item.component.scss']
})
export class ReportListItemComponent implements OnInit {
  @Input() report;

  constructor() {
  }

  ngOnInit(): void {
  }

  get reportTypes() {
    return ReportTypes;
  }

  getTypeName(type) {
    const list = ['Check in', 'First report', 'Second report', 'Last report'];
    return list[type];
  }

}
