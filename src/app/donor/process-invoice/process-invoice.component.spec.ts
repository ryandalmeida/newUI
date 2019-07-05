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
import 'rxjs/add/observable/of';
import { ProcessInvoiceComponent } from './process-invoice.component';

describe('ProcessInvoiceComponent', () => {
  let component: ProcessInvoiceComponent;
  let fixture: ComponentFixture<ProcessInvoiceComponent>;

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
      declarations: [ ProcessInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInvoiceComponent);
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

  it('Start Date field validity', () => {
    let startDate = component.searchForm.controls['startDate']; 
    expect(startDate.valid).toBeFalsy(); 
  });

  it('End Date field validity', () => {
    let endDate = component.searchForm.controls['endDate']; 
    expect(endDate.valid).toBeFalsy(); 
  });
  
  it('submitting a form', () => {

    expect(component.searchForm.valid).toBeFalsy();

    component.searchForm.controls['arId'].setValue(1);
    component.searchForm.controls['pledgeId'].setValue(2);
    component.searchForm.controls['donorName'].setValue("abc");
    component.searchForm.controls['country'].setValue("India");
    component.searchForm.controls['creditAmount'].setValue(1000);
    component.searchForm.controls['debitAmount'].setValue(500);
    component.searchForm.controls['installmentNo'].setValue(3);
    component.searchForm.controls['startDate'].setValue("2018-08-08");
    component.searchForm.controls['endDate'].setValue("2019-08-08");

    expect(component.searchForm.valid).toBeFalsy();
    
    // Trigger the login function
     component.onPay(1);

     // Now we can check to make sure the values are correct
     expect(component.searchForm.value.arId).toBe(1);
     expect(component.searchForm.value.pledgeId).toBe(2);
     expect(component.searchForm.value.donorName).toBe("abc");
     expect(component.searchForm.value.country).toBe("India");
     expect(component.searchForm.value.creditAmount).toBe(1000);
     expect(component.searchForm.value.debitAmount).toBe(500);
     expect(component.searchForm.value.installmentNo).toBe(3);
     expect(component.searchForm.value.startDate).toBe("2018-08-08");
     expect(component.searchForm.value.endDate).toBe("2019-08-08");
});
});
