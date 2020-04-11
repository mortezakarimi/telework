import {UnlessDirective} from './unless.directive';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

@Component({
  template: `<h2 id="unless" *appUnless="show">Something to hidden</h2>
  <h2 id="if" *ngIf="show">Something to show</h2>`
})
class TestComponent {
  public show = true;
}

describe('UnlessDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let unlessElement;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [UnlessDirective, TestComponent]
    })
      .createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should show ngIf element when show is true', () => {
    component.show = true;
    fixture.detectChanges(); // initial binding
    unlessElement = fixture.debugElement.queryAll(By.css('#unless'));
    expect(unlessElement.length).toBe(0);
  });

  it('should show unless element when show is false', () => {
    component.show = false;
    fixture.detectChanges(); // initial binding
    unlessElement = fixture.debugElement.queryAll(By.css('#unless'));
    expect(unlessElement.length).toBe(1);
  });

});
