import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterDetailBoxComponent } from './center-detail-box.component';

describe('CenterDetailBoxComponent', () => {
  let component: CenterDetailBoxComponent;
  let fixture: ComponentFixture<CenterDetailBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CenterDetailBoxComponent]
    });
    fixture = TestBed.createComponent(CenterDetailBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
