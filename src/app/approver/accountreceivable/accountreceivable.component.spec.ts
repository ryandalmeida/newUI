import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  MatSortModule ,
  MatCheckboxModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountreceivableComponent } from './accountreceivable.component';
import { AccountreceivableService } from 'src/app/services/accountreceivable.service';

describe('InitiateAccountReceiviableComponent', () => {
  let component: AccountreceivableComponent;
  let fixture: ComponentFixture<AccountreceivableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountreceivableComponent ],
      imports: [
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
  ReactiveFormsModule,
  FormsModule,
  BrowserAnimationsModule,
  HttpClientTestingModule,
  MatCheckboxModule ],
  providers: [AccountreceivableService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountreceivableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test accountReceivable table', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRow = fixture.nativeElement.querySelectorAll('mat-header-row');
      let headerRow = tableRow[0];
      expect(headerRow.childNodes[1].innerText).toEqual("PLEDGE NO.")
      expect(headerRow.childNodes[2].innerText).toEqual("PLEDGE TYPE")
      expect(headerRow.childNodes[3].innerText).toEqual("PLEDGE FUND TYPE")
      expect(headerRow.childNodes[4].innerText).toEqual("AMOUNT")
      expect(headerRow.childNodes[5].innerText).toEqual("INSTALLMENTS")
      expect(headerRow.childNodes[6].innerText).toEqual("PAYMENT PERIOD")
      expect(headerRow.childNodes[7].innerText).toEqual("START DATE")
      expect(headerRow.childNodes[8].innerText).toEqual("END DATE")
      done();
    });
  });

  it('create accountReceivable submit form invalid when empty', () => {
    expect(component.initiateARForm.valid).toBeFalsy();
  });
   
  it('create accountReceivable submit form : pledgeId field validity', () => {
    let errors = {};
    let pledgeId = component.initiateARForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeFalsy();
    pledgeId.setValue(3);
    errors = pledgeId.errors || {};
    expect(errors['required']).toBeFalsy();
  });


  it('create accountReceivable submit form : country field validity', () => {
    let errors = {};
    let country = component.initiateARForm.controls['country'];
    expect(country.valid).toBeFalsy();
    country.setValue("India");
    errors = country.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create accountReceivable submit form : accountNo field validity', () => {
    let errors = {};
    let accountNo = component.initiateARForm.controls['accountNo'];
    expect(accountNo.valid).toBeFalsy();
    accountNo.setValue(12345);
    errors = accountNo.errors || {};
    expect(errors['required']).toBeFalsy();
  });


  it('create accountReceivable submit form : bankName field validity', () => {
    let errors = {};
    let bankName = component.initiateARForm.controls['bankName'];
    expect(bankName.valid).toBeFalsy();
    bankName.setValue("Carbon Emission Reduction");
    errors = bankName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  
  it('create accountReceivable submit form : startDate field validity', () => {
    let errors = {};
    let startDate = component.initiateARForm.controls['startDate'];
    expect(startDate.valid).toBeFalsy();
    startDate.setValue("26-10-2018");
    errors = startDate.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create accountReceivable submit form : endDate field validity', () => {
    let errors = {};
    let endDate = component.initiateARForm.controls['endDate'];
    expect(endDate.valid).toBeFalsy();
    endDate.setValue("26-10-2018");
    errors = endDate.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create accountReceivable submit form : amount field validity', () => {
    let errors = {};
    let amount = component.initiateARForm.controls['amount'];
    expect(amount.valid).toBeFalsy();
    amount.setValue(10000);
    errors = amount.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create accountReceivable submit form : paymentPeriod field validity', () => {
    let errors = {};
    let paymentPeriod = component.initiateARForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeFalsy();
    paymentPeriod.setValue(10);
    errors = paymentPeriod.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create accountReceivable submit form : installments field validity', () => {
    let errors = {};
    let installments = component.initiateARForm.controls['installments'];
    expect(installments.valid).toBeFalsy();
    installments.setValue(10);
    errors = installments.errors || {};
    expect(errors['required']).toBeFalsy();
  });


  it('search accountreceiviable form : pledgeFundType field validity', () => {
    let pledgeFundType = component.searchForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeTruthy();
  });

  it('search accountreceiviable form : donorName field validity', () => {
    let donorName = component.searchForm.controls['donorName'];
    expect(donorName.valid).toBeTruthy();
  });

  it('search accountreceiviable form : country field validity', () => {
    let country = component.searchForm.controls['country'];
    expect(country.valid).toBeTruthy();
  });

  it('search accountreceiviable form : Status field validity', () => {
    let Status = component.searchForm.controls['Status'];
    expect(Status.valid).toBeTruthy();
  });

  it('search accountreceiviable form invalid when empty', () => {
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('search accountreceiviable form : pledgeNo field validity', () => {
    let pledgeNo = component.searchForm.controls['pledgeNo'];
    expect(pledgeNo.valid).toBeTruthy();
  });

  
  it('search accountreceiviable form : startDate field validity', () => {
    let startDate = component.searchForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('search accountreceiviable form : endDate field validity', () => {
    let endDate = component.searchForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('search accountreceiviable form : programName field validity', () => {
    let programName = component.searchForm.controls['programName'];
    expect(programName.valid).toBeTruthy();
  });

  it('search accountreceiviable form : amount field validity', () => {
    let amount = component.searchForm.controls['amount'];
    expect(amount.valid).toBeTruthy();
  });

  it('search accountreceiviable form : paymentPeriod field validity', () => {
    let paymentPeriod = component.searchForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeTruthy();
  });

  it('search accountreceiviable form : installments field validity', () => {
    let installments = component.searchForm.controls['installments'];
    expect(installments.valid).toBeTruthy();
  });


});//end
