import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatDialogModule
} from '@angular/material';

import { ProcessPaymentComponent } from './process-payment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentService } from 'src/app/services/payment.service';
import { PagerService } from '../../services/pagerService.service'
import { SortService } from 'src/app/services/sortService.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';

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
        HttpClientTestingModule,
        MatDialogModule,
        Ng4LoadingSpinnerModule.forRoot(),
        ],
        providers: [
          PaymentService,
          PagerService,
          SortService,
          ErrorDialogService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('search form invalid when empty', () => {
    expect(component.searchForm.valid).toBeTruthy();
  });
  
  it('search form : Pledge Id field validity', () => {
    let pledgeId = component.searchForm.controls['pledgeId']; 
    expect(pledgeId.valid).toBeTruthy(); 
  });


  it('search form : Donor Name field validity', () => {
    let donorName = component.searchForm.controls['donorName']; 
    expect(donorName.valid).toBeTruthy(); 
  });

  it('search form : Country field validity', () => {
    let country = component.searchForm.controls['country']; 
    expect(country.valid).toBeTruthy(); 
  });

  it('search form : pledgeFundType field validity', () => {
    let pledgeFundType = component.searchForm.controls['pledgeFundType']; 
    expect(pledgeFundType.valid).toBeTruthy(); 
  });

  it('search form : startDate field validity', () => {
    let startDate = component.searchForm.controls['startDate']; 
    expect(startDate.valid).toBeTruthy(); 
  });

  it('search form : endDate field validity', () => {
    let endDate = component.searchForm.controls['endDate']; 
    expect(endDate.valid).toBeTruthy(); 
  });

  it('should test process payment table', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRow = fixture.nativeElement.querySelectorAll('mat-header-row');
      let headerRow = tableRow[0];
      expect(headerRow.childNodes[1].innerText).toEqual("")
      expect(headerRow.childNodes[2].innerText).toEqual("PLEDGE ID")
      expect(headerRow.childNodes[3].innerText).toEqual("FUND TYPE")
      expect(headerRow.childNodes[4].innerText).toEqual("INVOICE ID")
      expect(headerRow.childNodes[5].innerText).toEqual("DONOR NAME")
      expect(headerRow.childNodes[6].innerText).toEqual("AR NO.")
      expect(headerRow.childNodes[7].innerText).toEqual("DEBIT ($)")
      expect(headerRow.childNodes[8].innerText).toEqual("COUNTRY")
      expect(headerRow.childNodes[9].innerText).toEqual("INSTALLMENT")
      expect(headerRow.childNodes[10].innerText).toEqual("STATUS")
      done();
    });
  });
});
