import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CallCreateComponent } from "./call-create.component";

describe("CallCreateComponent", () => {
  let component: CallCreateComponent;
  let fixture: ComponentFixture<CallCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallCreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
