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
import { PagerService } from '../../services/pagerService.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ProcessInvoiceService } from '../../services/process-invoice.service';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { Observable, of } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { ErrorDialogComponent } from 'src/app/error-dialog/errordialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';

describe('ProcessInvoiceComponent', () => {
  let component: ProcessInvoiceComponent;
  let fixture: ComponentFixture<ProcessInvoiceComponent>;
  let errorDialogService: ErrorDialogService;
  
  const invoiceServiceStub = {
    invoiceServicePageloadSuccessResponse : {
      error:false,
      data:[{
        arId: 15,
        billingDate: "2019-07-08",
        country: "United States",
        creditAmount: 345000,
        debit: 49285,
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-26",
        installmentNo: 1,
        invoiceId: 1,
        pledgeFundType: "Regular",
        pledgeId: 10,
        startDate: "2019-07-20",
        status: "Bill Generated"
      },
      {
        arId: 23,
        billingDate: "2019-07-15",
        country: "United States",
        creditAmount: 6969,
        debit: 6969,
        donorName: "Vignesh Rasappan",
        endDate: "2020-07-20",
        installmentNo: 1,
        invoiceId: 9,
        pledgeFundType: "Regular",
        pledgeId: 43,
        startDate: "2019-07-20",
        status: "Bill Generated"
      }]
    }, 
    invoiceServicePageloadErrorResponse: {
      errorMessage: 'Record not found'
    },
    invoiceServiceSearchSuccessResponse : {
      error:false,
      data:[{
        arId: 15,
        billingDate: "2019-07-08",
        country: "United States",
        creditAmount: 345000,
        debit: 49285,
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-26",
        installmentNo: 1,
        invoiceId: 1,
        pledgeFundType: "Regular",
        pledgeId: 10,
        startDate: "2019-07-20",
        status: "Bill Generated"
      }]
    }, 
    invoiceServiceSearchErrorResponse: {
      errorMessage: 'Record not found'
    },
    invoiceServiceSubmitData : {
      arId: 15,
      billingDate: "2019-07-08",
      country: "United States",
      creditAmount: 345000,
      debit: 49285,
      donorName: "SAKSHI KUMAR",
      endDate: "2019-07-26",
      installmentNo: 1,
      invoiceId: 1,
      pledgeFundType: "Regular",
      pledgeId: 10,
      startDate: "2019-07-20",
      status: "Bill Generated"
    },
    invoiceServiceSubmitSuccessResponse :{
      error : false,
      data : "SUCCESS"
    },
    invoiceServiceSubmitErrorResponse:{
      data: "FAILURE"
    }
  } 

  class ProcessInvoiceServiceMock{
    public getAllBillGenerated() : Observable<any> {
      if(invoiceServiceStub.invoiceServicePageloadSuccessResponse.error){
        return _throw(invoiceServiceStub.invoiceServicePageloadErrorResponse.errorMessage)
      }
      return of(invoiceServiceStub.invoiceServicePageloadSuccessResponse.data);
    }

    public submitInvoice() : Observable<any> {
      if(invoiceServiceStub.invoiceServiceSubmitSuccessResponse.error){
        return _throw(invoiceServiceStub.invoiceServiceSubmitErrorResponse.data)
      }
      return of(invoiceServiceStub.invoiceServiceSubmitSuccessResponse.data);
    }

    public searchInvoice() : Observable<any> {
      if(invoiceServiceStub.invoiceServiceSearchSuccessResponse.error){
        return _throw(invoiceServiceStub.invoiceServiceSearchErrorResponse.errorMessage)
      }
      return of(invoiceServiceStub.invoiceServiceSearchSuccessResponse.data);
    }
  }

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
        BrowserAnimationsModule,
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
            cacheLocation: 'localStorage'
          }
        )
    ],
      declarations: [ 
              ProcessInvoiceComponent,
              ErrorDialogComponent,
              SuccessDialogComponent
            ],
         providers:[
          MsAdalAngular6Service,
          AuthenticationGuard,
           PagerService, 
           ProcessInvoiceService, 
           { provide: ProcessInvoiceService, useClass: ProcessInvoiceServiceMock, useValue: invoiceServiceStub },
           SortService,
           ErrorDialogService
          ]
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ErrorDialogComponent, SuccessDialogComponent]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    errorDialogService = TestBed.get(ErrorDialogService);
  });

  it('should test pageload()', () => {
    component.pageLoad();
  }); 

  it('should test pageload() : error', () => {
    invoiceServiceStub.invoiceServicePageloadSuccessResponse.error = true;
    component.pageLoad();
    errorDialogService.openDialog('Record not found');
  }); 

  it('should test selectRow()', () => {
    component.selectRow(null);
    expect(component.rowData).toEqual(null);
    expect(component.isRowClicked ).toEqual(true);
  });

  it('should test onCancel()', () => {
    component.onCancel();
    component.pageLoad();
    expect(component.isRowClicked ).toEqual(false);
  });

  it('should test onPay()', () => {
    component.onPay(invoiceServiceStub.invoiceServiceSubmitData);
  });

  it('should test onPay() : error', () => {
    invoiceServiceStub.invoiceServiceSubmitSuccessResponse.error = true;
    component.onPay(invoiceServiceStub.invoiceServiceSubmitData);
    errorDialogService.openDialog(null);
  });

  it('should test searchProcessInvoice()', () => {
    component.searchProcessInvoice();
  });

  it('should test searchProcessInvoice(): error', () => {
    invoiceServiceStub.invoiceServiceSearchSuccessResponse.error = true;
    component.searchProcessInvoice();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('search form invalid when empty', () => {
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('search form : Pledge Fund Type field validity', () => {
    let pledgeFundType = component.searchForm.controls['pledgeFundType']; 
    expect(pledgeFundType.valid).toBeTruthy(); 
  });
  
  it('search form : Pledge Id field validity', () => {
    let pledgeId = component.searchForm.controls['pledgeId']; 
    expect(pledgeId.valid).toBeTruthy(); 
  });

  it('search form : Debit Amount field validity', () => {
    let programName = component.searchForm.controls['programName']; 
    expect(programName.valid).toBeTruthy(); 
  });

  it('search form : Amount field validity', () => {
    let amount = component.searchForm.controls['amount']; 
    expect(amount.valid).toBeTruthy(); 
  });

  it('search form : Start Date field validity', () => {
    let startDate = component.searchForm.controls['startDate']; 
    expect(startDate.valid).toBeTruthy(); 
  });

  it('search form : End Date field validity', () => {
    let endDate = component.searchForm.controls['endDate']; 
    expect(endDate.valid).toBeTruthy(); 
  });

  it('should test dashboard table', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRow = fixture.nativeElement.querySelectorAll('mat-header-row');
      let headerRow = tableRow[0];
      expect(headerRow.childNodes[1].innerText).toEqual("PLEDGE ID")
      expect(headerRow.childNodes[2].innerText).toEqual("DONOR NAME")
      expect(headerRow.childNodes[3].innerText).toEqual("AR NO.")
      expect(headerRow.childNodes[4].innerText).toEqual("FUND TYPE")
      expect(headerRow.childNodes[5].innerText).toEqual("INVOICE NO.")
      expect(headerRow.childNodes[6].innerText).toEqual("DEBIT ($)")
      expect(headerRow.childNodes[7].innerText).toEqual("CREDIT ($)")
      expect(headerRow.childNodes[8].innerText).toEqual("COUNTRY")
      expect(headerRow.childNodes[9].innerText).toEqual("INSTALLMENTS")
      expect(headerRow.childNodes[10].innerText).toEqual("START DATE")
      expect(headerRow.childNodes[11].innerText).toEqual("END DATE")
      expect(headerRow.childNodes[12].innerText).toEqual("ACTION")
      done();
    });
  });

  it('pay invoice form invalid when empty', () => {
    expect(component.paymentForm.valid).toBeTruthy();
  });

  it('pay invoice form : pledgeId field validity', () => {
    let pledgeId = component.paymentForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeTruthy();
  });

  it('pay invoice form : donorName field validity', () => {
    let donorName = component.paymentForm.controls['donorName'];
    expect(donorName.valid).toBeTruthy();
  });

  it('pay invoice form : startDate field validity', () => {
    let startDate = component.paymentForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('pay invoice  form : endDate field validity', () => {
    let endDate = component.paymentForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('pay invoice form : arId field validity', () => {
    let arId = component.paymentForm.controls['arId'];
    expect(arId.valid).toBeTruthy();
  });

  it('pay invoice form : country field validity', () => {
    let country = component.paymentForm.controls['country'];
    expect(country.valid).toBeTruthy();
  });

  it('pay invoice form : creditAmount field validity', () => {
    let creditAmount = component.paymentForm.controls['creditAmount'];
    expect(creditAmount.valid).toBeTruthy();
  });

  it('pay invoice form : debit field validity', () => {
    let debit = component.paymentForm.controls['debit'];
    expect(debit.valid).toBeTruthy();

  });

  it('pay invoice form : installmentNo field validity', () => {
    let installmentNo = component.paymentForm.controls['installmentNo'];
    expect(installmentNo.valid).toBeTruthy();
  });

  it('pay invoice form : invoiceId field validity', () => {
    let invoiceId = component.paymentForm.controls['invoiceId'];
    expect(invoiceId.valid).toBeTruthy();
  });

});
