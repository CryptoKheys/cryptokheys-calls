import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateCallComponent } from './admin-update-call.component';

describe('AdminUpdateCallComponent', () => {
  let component: AdminUpdateCallComponent;
  let fixture: ComponentFixture<AdminUpdateCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
