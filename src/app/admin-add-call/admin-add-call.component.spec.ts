import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCallComponent } from './admin-add-call.component';

describe('AdminAddCallComponent', () => {
  let component: AdminAddCallComponent;
  let fixture: ComponentFixture<AdminAddCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
