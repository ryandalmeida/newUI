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
import { Observable, of } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { MsAdalAngular6Service, AuthenticationGuard, MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { ErrorDialogComponent } from 'src/app/error-dialog/errordialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';

describe('ProcessPaymentComponent', () => {
  let component: ProcessPaymentComponent;
  let fixture: ComponentFixture<ProcessPaymentComponent>;
  let errorDialogService: ErrorDialogService;

  const processPaymentServiceStub = {
    processPaymentServicePageloadSuccessResponse : {
      error:false,
      data:[{
        arId: 16,
        billingDate: "2019-07-08",
        country: "United States",
        creditAmount: 10000,
        debit: 1428,
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-20",
        installmentNo: 1,
        invoiceId: 2,
        pledgeFundType: "Regular",
        pledgeId: 11,
        startDate: "2019-07-03",
        status: "Paid"
      },
      {
        arId: 17,
        billingDate: "2019-07-08",
        country: "United States",
        creditAmount: 550,
        debit: 275,
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-14",
        installmentNo: 1,
        invoiceId: 3,
        pledgeFundType: "Regular",
        pledgeId: 12,
        startDate: "2019-07-05",
        status: "Paid"
      }]
    }, 
    processPaymentServicePageloadErrorResponse: {
      errorMessage: 'Record not found'
    },
    processPaymentServiceSearchSuccessResponse : {
      error:false,
      data:[{
        arId: 17,
        billingDate: "2019-07-08",
        country: "United States",
        creditAmount: 550,
        debit: 275,
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-14",
        installmentNo: 1,
        invoiceId: 3,
        pledgeFundType: "Regular",
        pledgeId: 12,
        startDate: "2019-07-05",
        status: "Paid"
      }]
    }, 
    processPaymentServiceSearchErrorResponse: {
      errorMessage: 'Record not found'
    },
    processPaymentServiceSubmitData : [{
      arId: 20,
      billingDate: "2019-07-09",
      country: "Australia",
      creditAmount: 1500,
      debit: 100,
      donorName: "Vignesh Rasappan",
      endDate: "2020-07-09",
      installmentNo: 1,
      invoiceId: 6,
      pledgeFundType: "Additional Contribution",
      pledgeId: 21,
      startDate: "2019-07-09",
      status: "Paid"
    }],
    processPaymentServiceSubmitSuccessResponse :{
      error : false,
      data : "SUCCESS"
    },
    processPaymentServiceSubmitErrorResponse:{
      data: "FAILURE"
    }
  } 

  class ProcessPaymentServiceMock{
    public getAllProcessPayments() : Observable<any> {
      if(processPaymentServiceStub.processPaymentServicePageloadSuccessResponse.error){
        return _throw(processPaymentServiceStub.processPaymentServicePageloadErrorResponse.errorMessage)
      }
      return of(processPaymentServiceStub.processPaymentServicePageloadSuccessResponse.data);
    }

    public submitPayment() : Observable<any> {
      if(processPaymentServiceStub.processPaymentServiceSubmitSuccessResponse.error){
        return _throw(processPaymentServiceStub.processPaymentServiceSubmitErrorResponse.data)
      }
      return of(processPaymentServiceStub.processPaymentServiceSubmitSuccessResponse.data);
    }

    public searchPayment() : Observable<any> {
      if(processPaymentServiceStub.processPaymentServiceSearchSuccessResponse.error){
        return _throw(processPaymentServiceStub.processPaymentServiceSearchErrorResponse.errorMessage)
      }
      return of(processPaymentServiceStub.processPaymentServiceSearchSuccessResponse.data);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessPaymentComponent, ErrorDialogComponent, SuccessDialogComponent ],
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
        MsAdalAngular6Module.forRoot(
          {
            tenant: '02aa9fc1-18bc-4798-a020-e01c854dd434',
            clientId: 'b0f49dbf-f119-4483-9850-1c47b19235a5',
            redirectUri: window.location.origin,
            endpoints: {
              'https://wbg-bpm-apim.azure-api.net': 'b0f49dbf-f119-4483-9850-1c47b19235a5',
              'api': 'b0f49dbf-f119-4483-9850-1c47b19235a5'
            },
            navigateToLoginRequestUrl: false,
            cacheLocation: 'sessionStorage'
          }
        ) 
        ],
        providers: [
          { provide: PaymentService, useClass: ProcessPaymentServiceMock, useValue: processPaymentServiceStub},
          PagerService,
          SortService,
          ErrorDialogService,
          MsAdalAngular6Service,
          AuthenticationGuard,]
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ErrorDialogComponent, SuccessDialogComponent]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    errorDialogService = TestBed.get(ErrorDialogService);
  });

  it('should test pageload()', () => {
    component.pageLoad();
  }); 

  it('should test pageload() : error', () => {
    processPaymentServiceStub.processPaymentServicePageloadSuccessResponse.error = true;
    component.pageLoad();
    errorDialogService.openDialog('Record not found');
    errorDialogService.dialog.closeAll();
  }); 

  it('should test selectRow()', () => {
    component.selectRow(null);
  }); 

  it('should test onCancel()', () => {
    component.onCancel();
  }); 

  it('should test cancelProcessPaymentSearch()', () => {
    component.cancelProcessPaymentSearch();
  }); 

  it('should test store()', () => {
    component.checkedRows = processPaymentServiceStub.processPaymentServiceSubmitData;
    component.store();
  }); 

  it('should test searchProcessPayment()', () => {
    component.searchProcessPayment();
  });

  it('should test searchProcessPayment(): error', () => {
    processPaymentServiceStub.processPaymentServiceSearchSuccessResponse.error = true;
    component.searchProcessPayment();
    errorDialogService.dialog.closeAll();
  });

  it('should test paymentReceived()', () => {
    component.checkedRows = processPaymentServiceStub.processPaymentServiceSubmitData;
    component.paymentReceived();
  }); 

  it('should test paymentReceived() : error', () => {
    component.checkedRows = processPaymentServiceStub.processPaymentServiceSubmitData;
    processPaymentServiceStub.processPaymentServiceSubmitSuccessResponse.error = true;
    component.paymentReceived();
    errorDialogService.openDialog(null);
    errorDialogService.dialog.closeAll();
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
      expect(headerRow.childNodes[2].innerText).toEqual("Pledge Id")
      expect(headerRow.childNodes[3].innerText).toEqual("Fund Type")
      expect(headerRow.childNodes[4].innerText).toEqual("Invoice Id")
      expect(headerRow.childNodes[5].innerText).toEqual("Donor Name")
      expect(headerRow.childNodes[6].innerText).toEqual("Ar Id")
      expect(headerRow.childNodes[7].innerText).toEqual("($) Debit")
      expect(headerRow.childNodes[8].innerText).toEqual("Country")
      expect(headerRow.childNodes[9].innerText).toEqual("Installment")
      expect(headerRow.childNodes[10].innerText).toEqual("Status")
      done();
    });
  }); 
});
