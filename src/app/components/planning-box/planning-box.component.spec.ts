import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningBoxComponent } from './planning-box.component';

describe('PlanningBoxComponent', () => {
  let component: PlanningBoxComponent;
  let fixture: ComponentFixture<PlanningBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanningBoxComponent]
    });
    fixture = TestBed.createComponent(PlanningBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
