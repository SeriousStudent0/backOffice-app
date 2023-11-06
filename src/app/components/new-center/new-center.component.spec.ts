import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCenterComponent } from './new-center.component';

describe('NewCenterComponent', () => {
  let component: NewCenterComponent;
  let fixture: ComponentFixture<NewCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCenterComponent]
    });
    fixture = TestBed.createComponent(NewCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
