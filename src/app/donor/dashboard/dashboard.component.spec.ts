import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatGridListModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Adal6HTTPService, Adal6Service } from 'adal-angular6';
import { DashboardComponent } from './dashboard.component';
import { PledgeService } from '../../services/pledge.service';
import { PagerService } from '../../services/pagerService.service'

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatGridListModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [DashboardComponent],
      providers: [PledgeService,PagerService, Adal6Service, {
        provide: Adal6HTTPService,
        useFactory: Adal6HTTPService.factory,
        deps: [Adal6Service]
      },]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test dashboard table', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRow = fixture.nativeElement.querySelectorAll('mat-header-row');
      let headerRow = tableRow[0];
      expect(headerRow.childNodes[1].innerText).toEqual("PLEDGE NO.")
      expect(headerRow.childNodes[2].innerText).toEqual("PROGRAM NAME")
      expect(headerRow.childNodes[3].innerText).toEqual("PLEDGE FUND TYPE")
      expect(headerRow.childNodes[4].innerText).toEqual("AMOUNT")
      expect(headerRow.childNodes[5].innerText).toEqual("INSTALLMENTS")
      expect(headerRow.childNodes[6].innerText).toEqual("PAYMENT PERIOD")
      expect(headerRow.childNodes[7].innerText).toEqual("START DATE")
      expect(headerRow.childNodes[8].innerText).toEqual("END DATE")

      done();
    });
  });


  it('create pledge form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('create pledge form : country field validity', () => {
    let errors = {};
    let country = component.registerForm.controls['country'];
    expect(country.valid).toBeFalsy();
    country.setValue("India");
    errors = country.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : programName field validity', () => {
    let errors = {};
    let programName = component.registerForm.controls['programName'];
    expect(programName.valid).toBeFalsy();
    programName.setValue("Carbon Emission Reduction");
    errors = programName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : pledgeFundType field validity', () => {
    let errors = {};
    let pledgeFundType = component.registerForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeFalsy();
    pledgeFundType.setValue("Regular");
    errors = pledgeFundType.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : startDate field validity', () => {
    let errors = {};
    let startDate = component.registerForm.controls['startDate'];
    expect(startDate.valid).toBeFalsy();
    startDate.setValue("26-10-2018");
    errors = startDate.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : endDate field validity', () => {
    let errors = {};
    let endDate = component.registerForm.controls['endDate'];
    expect(endDate.valid).toBeFalsy();
    endDate.setValue("26-10-2018");
    errors = endDate.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : amount field validity', () => {
    let errors = {};
    let amount = component.registerForm.controls['amount'];
    expect(amount.valid).toBeFalsy();
    amount.setValue(10000);
    errors = amount.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : paymentPeriod field validity', () => {
    let errors = {};
    let paymentPeriod = component.registerForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeFalsy();
    paymentPeriod.setValue(10);
    errors = paymentPeriod.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : installments field validity', () => {
    let errors = {};
    let installments = component.registerForm.controls['installments'];
    expect(installments.valid).toBeFalsy();
    installments.setValue(10);
    errors = installments.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('search pledge form invalid when empty', () => {
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('search pledge form : pledgeNo field validity', () => {
    let pledgeNo = component.searchForm.controls['pledgeNo'];
    expect(pledgeNo.valid).toBeTruthy();
  });

  it('search pledge form : pledgeFundType field validity', () => {
    let pledgeFundType = component.searchForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeTruthy();
  });

  it('search pledge form : startDate field validity', () => {
    let startDate = component.searchForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('search pledge form : endDate field validity', () => {
    let endDate = component.searchForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('search pledge form : programName field validity', () => {
    let programName = component.searchForm.controls['programName'];
    expect(programName.valid).toBeTruthy();
  });

  it('search pledge form : amount field validity', () => {
    let amount = component.searchForm.controls['amount'];
    expect(amount.valid).toBeTruthy();
  });

  it('search pledge form : paymentPeriod field validity', () => {
    let paymentPeriod = component.searchForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeTruthy();
  });

  it('search pledge form : installments field validity', () => {
    let installments = component.searchForm.controls['installments'];
    expect(installments.valid).toBeTruthy();
  });
});
