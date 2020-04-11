import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'agoDate'
})
export class AgoDatePipe implements PipeTransform {
  private static intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  constructor(private datePipe: DatePipe) {
  }

  transform(value: any, maxIntervalAgo = 'day', format?: string, timezone?: string, locale?: string): string | null {
    if (value) {
      const seconds = Math.floor(((new Date()).getTime() - (new Date(value)).getTime()) / 1000);
      if (seconds < 59) {
        return 'Just now';
      }

      let counter;
      for (const i in AgoDatePipe.intervals) {
        if (AgoDatePipe.intervals.hasOwnProperty(maxIntervalAgo) && // check requested interval exist
          AgoDatePipe.intervals[maxIntervalAgo] >= AgoDatePipe.intervals[i] && // max interval selected converted
          seconds <= AgoDatePipe.intervals[maxIntervalAgo] // show only until requested interval
        ) {

          counter = Math.floor(seconds / AgoDatePipe.intervals[i]);
          if (counter > 0) {
            if (counter === 1) {
              return counter + ' ' + i + ' ago'; // singular (1 day ago)
            } else {
              return counter + ' ' + i + 's ago'; // plural (2 days ago)
            }
          }
        }
      }
      return this.datePipe.transform(value, format, timezone, locale);
    }
  }
}
