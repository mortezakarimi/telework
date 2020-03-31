export enum ReportTypes {
  checkIn,
  FirstDay,
  MidDay,
  EndDay
}

export enum ReportItemsStatus {
  WorkInProgress,
  Done
}

export class ReportItem {
  constructor(public content, public status: ReportItemsStatus = ReportItemsStatus.WorkInProgress) {
  }
}

export class Report {
  readonly key: string;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(public type: ReportTypes, public title, public items: ReportItem[]) {
    if (undefined === this.createdAt) {
      this.createdAt = new Date().getTime();
    }
    this.updatedAt = new Date().getTime();
  }
}
