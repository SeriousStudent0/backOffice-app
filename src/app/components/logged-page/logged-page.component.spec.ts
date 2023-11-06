import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedPageComponent } from './logged-page.component';

describe('LoggedPageComponent', () => {
  let component: LoggedPageComponent;
  let fixture: ComponentFixture<LoggedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedPageComponent]
    });
    fixture = TestBed.createComponent(LoggedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
