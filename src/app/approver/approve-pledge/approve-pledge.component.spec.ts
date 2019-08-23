import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePledgeComponent } from './approve-pledge.component';

describe('ApprovePledgeComponent', () => {
  let component: ApprovePledgeComponent;
  let fixture: ComponentFixture<ApprovePledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
