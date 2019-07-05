import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatCheckboxModule,
  MatPaginatorModule
} from '@angular/material';

import { ProcessPaymentComponent } from './process-payment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentService } from 'src/app/services/payment.service';
import { Adal6Service, Adal6HTTPService } from 'adal-angular6';

describe('ProcessPaymentComponent', () => {
  let component: ProcessPaymentComponent;
  let fixture: ComponentFixture<ProcessPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessPaymentComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        SignaturePadModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
        ],
        providers: [PaymentService,Adal6Service, {
          provide: Adal6HTTPService,
          useFactory: Adal6HTTPService.factory,
          deps: [Adal6Service]
      },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });


  it('form invalid when empty', () => {
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('Ar Id field validity', () => {
    let arId = component.searchForm.controls['arId']; 
    expect(arId.valid).toBeFalsy(); 
  });

  
  it('Pledge Id field validity', () => {
    let pledgeId = component.searchForm.controls['pledgeId']; 
    expect(pledgeId.valid).toBeFalsy(); 
  });

  it('Invoice Id field validity', () => {
    let invoiceId = component.searchForm.controls['invoiceId']; 
    expect(invoiceId.valid).toBeFalsy(); 
  });

  it('Donor Name field validity', () => {
    let donorName = component.searchForm.controls['donorName']; 
    expect(donorName.valid).toBeFalsy(); 
  });

  it('Country field validity', () => {
    let country = component.searchForm.controls['country']; 
    expect(country.valid).toBeFalsy(); 
  });

  it('Credit Amountfield validity', () => {
    let creditAmount = component.searchForm.controls['creditAmount']; 
    expect(creditAmount.valid).toBeFalsy(); 
  });

  it('Debit Amount field validity', () => {
    let debitAmount = component.searchForm.controls['debitAmount']; 
    expect(debitAmount.valid).toBeFalsy(); 
  });

  it('InstallmentNo field validity', () => {
    let installmentNo = component.searchForm.controls['installmentNo']; 
    expect(installmentNo.valid).toBeFalsy(); 
  });

  it('Payment Date field validity', () => {
    let pymentDate = component.searchForm.controls['pymentDate']; 
    expect(pymentDate.valid).toBeFalsy(); 
  });

  it('Status field validity', () => {
    let status = component.searchForm.controls['status']; 
    expect(status.valid).toBeFalsy(); 
  });

            

it('submitting a form', () => {

    expect(component.searchForm.valid).toBeFalsy();

    component.searchForm.controls['arId'].setValue(1);
    component.searchForm.controls['pledgeId'].setValue(2);
    component.searchForm.controls['invoiceId'].setValue(3);
    component.searchForm.controls['donorName'].setValue("xyz");
    component.searchForm.controls['country'].setValue("India");
    component.searchForm.controls['creditAmount'].setValue(1000);
    component.searchForm.controls['debitAmount'].setValue(5000);
    component.searchForm.controls['installmentNo'].setValue(3);
    component.searchForm.controls['pymentDate'].setValue("2019-08-08");
    component.searchForm.controls['status'].setValue("New");

    expect(component.searchForm.valid).toBeFalsy();
    
    
    // Trigger the login function
     component.paymentReceived();


    // Now we can check to make sure the emitted value is correct
     expect(component.searchForm.value.arId).toBe(1);
     expect(component.searchForm.value.pledgeId).toBe(2);
     expect(component.searchForm.value.invoiceId).toBe(3);
     expect(component.searchForm.value.donorName).toBe("xyz");
     expect(component.searchForm.value.country).toBe("India");
     expect(component.searchForm.value.creditAmount).toBe(1000);
     expect(component.searchForm.value.debitAmount).toBe(5000);
     expect(component.searchForm.value.installmentNo).toBe(3);
     expect(component.searchForm.value.pymentDate).toBe("2019-08-08");
     expect(component.searchForm.value.status).toBe("New");
   
});

});
