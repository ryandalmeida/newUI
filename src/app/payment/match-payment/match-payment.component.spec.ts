import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatchPaymentComponent } from './match-payment.component';

describe('MatchPaymentComponent', () => {
  let component: MatchPaymentComponent;
  let fixture: ComponentFixture<MatchPaymentComponent>;

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
      declarations: [ MatchPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
     component.completed();

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
