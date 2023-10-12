import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSectionComponent } from './login-section.component';

describe('LoginSectionComponent', () => {
  let component: LoginSectionComponent;
  let fixture: ComponentFixture<LoginSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSectionComponent]
    });
    fixture = TestBed.createComponent(LoginSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
