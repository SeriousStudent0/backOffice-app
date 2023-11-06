import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCentersComponent } from './menu-centers.component';

describe('MenuCentersComponent', () => {
  let component: MenuCentersComponent;
  let fixture: ComponentFixture<MenuCentersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCentersComponent]
    });
    fixture = TestBed.createComponent(MenuCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
