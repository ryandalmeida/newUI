import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorHomeComponent } from './donor-home.component';

describe('DonorHomeComponent', () => {
  let component: DonorHomeComponent;
  let fixture: ComponentFixture<DonorHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
