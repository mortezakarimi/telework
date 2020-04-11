import {AgoDatePipe} from './ago-date.pipe';
import {DatePipe} from '@angular/common';
import {async} from '@angular/core/testing';

describe('AgoDatePipe', () => {
  let now;
  let angularDate: DatePipe;
  let pipe: AgoDatePipe;
  beforeEach(async(() => {
    now = Math.round(new Date().getTime());
    console.error(new Date(now));
    angularDate = new DatePipe('en');
    pipe = new AgoDatePipe(angularDate);
  }));
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Check if datetime less than one min ago', () => {
    expect(pipe.transform(now - (50 * 1000))).toBe('Just now');
  });

  it('Check if datetime less than one hour and more than one minute ago', () => {
    expect(pipe.transform(now - (50 * 60 * 1000))).toMatch(/(\d+ minutes? ago)/gm);
  });

  it('Check if datetime less than one day and more than one hour ago', () => {
    expect(pipe.transform(now - (23 * 60 * 60 * 1000))).toMatch(/(\d+ hours? ago)/gm);
  });

  it('Check if datetime less than one week and more than one day ago', () => {
    expect(pipe.transform(now - (6 * 24 * 60 * 60 * 1000), 'week')).toMatch(/(\d+ days? ago)/gm);
  });

  it('Check if datetime less than one month and more than one week ago', () => {
    expect(pipe.transform(now - (27 * 24 * 60 * 60 * 1000), 'month')).toMatch(/(\d+ weeks? ago)/gm);
  });

  it('Check if datetime less than one year and more than one month ago', () => {
    expect(pipe.transform(now - (6 * 30 * 24 * 60 * 60 * 1000), 'year')).toMatch(/(\d+ months? ago)/gm);
  });

  it('Check if datetime more than one year ago', () => {
    expect(pipe.transform(now - (12 * 31 * 24 * 60 * 60 * 1000), 'year')).toEqual(angularDate.transform(now - (12 * 31 * 24 * 60 * 60 * 1000)));
  });
});
