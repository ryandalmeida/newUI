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
  MatSortModule,
  MatCheckboxModule 
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatchPaymentComponent } from './match-payment.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { MatchPaymentService } from 'src/app/services/matchPayment.service';
import { PagerService } from '../../services/pagerService.service'
import { Observable, of } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ErrorDialogComponent } from 'src/app/error-dialog/errordialog.component';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';

describe('MatchPaymentComponent', () => {
  let component: MatchPaymentComponent;
  let fixture: ComponentFixture<MatchPaymentComponent>;
  let errorDialogService: ErrorDialogService;

  const matchPaymentServiceStub = {
    matchPaymentServicePageloadSuccessResponse : {
      error:false,
      data:[{
        accountsReceivable: [{}],
        arId: 17,
        country: "United States",
        creditAmount: 550,
        debit: 275,
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-14",
        installmentNo: 1,
        invoiceId: 3,
        paymentDate: "2019-07-08",
        pledgeFundType: "Regular",
        pledgeId: 12,
        startDate: "2019-07-05",
        status: "Payment Received",
        transactionId: 2
      }]
    }, 
    matchPaymentServicePageloadErrorResponse: {
      errorMessage: 'Record not found'
    },
    matchPaymentServiceSearchSuccessResponse : {
      error:false,
      data:[{
        accountsReceivable: [{}],
        arId: 17,
        country: "United States",
        creditAmount: 550,
        debit: 275,
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-14",
        installmentNo: 1,
        invoiceId: 3,
        paymentDate: "2019-07-08",
        pledgeFundType: "Regular",
        pledgeId: 12,
        startDate: "2019-07-05",
        status: "Payment Received",
        transactionId: 2
      }]
    }, 
    matchPaymentServiceSearchErrorResponse: {
      errorMessage: 'Record not found'
    },
    matchPaymentServiceSubmitData :[{
      accountsReceivable: [{}],
      arId: 17,
      country: "United States",
      creditAmount: 550,
      debit: 275,
      donorName: "SAKSHI KUMAR",
      endDate: "2019-07-14",
      installmentNo: 1,
      invoiceId: 3,
      paymentDate: "2019-07-08",
      pledgeFundType: "Regular",
      pledgeId: 12,
      startDate: "2019-07-05",
      status: "Payment Received",
      transactionId: 2
    }],
    matchPaymentServiceSubmitSuccessResponse :{
      error : false,
      data : "SUCCESS"
    },
    matchPaymentServiceSubmitErrorResponse:{
      data: "FAILURE"
    }
  } 

  class MatchPaymentServiceMock{
    public getAllMatchPayments() : Observable<any> {
      if(matchPaymentServiceStub.matchPaymentServicePageloadSuccessResponse.error){
        return _throw(matchPaymentServiceStub.matchPaymentServicePageloadErrorResponse.errorMessage)
      }
      return of(matchPaymentServiceStub.matchPaymentServicePageloadSuccessResponse.data);
    }

    public completed() : Observable<any> {
      if(matchPaymentServiceStub.matchPaymentServiceSubmitSuccessResponse.error){
        return _throw(matchPaymentServiceStub.matchPaymentServiceSubmitErrorResponse.data)
      }
      return of(matchPaymentServiceStub.matchPaymentServiceSubmitSuccessResponse.data);
    }

    public searchMatchPaymentService() : Observable<any> {
      if(matchPaymentServiceStub.matchPaymentServiceSearchSuccessResponse.error){
        return _throw(matchPaymentServiceStub.matchPaymentServiceSearchErrorResponse.errorMessage)
      }
      return of(matchPaymentServiceStub.matchPaymentServiceSearchSuccessResponse.data);
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
        MatCheckboxModule,
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
      declarations: [ MatchPaymentComponent, ErrorDialogComponent, SuccessDialogComponent ],
      providers:[ErrorDialogService,
        SortService,
        MsAdalAngular6Service,
        AuthenticationGuard,
        { provide: MatchPaymentService, useClass: MatchPaymentServiceMock, useValue: matchPaymentServiceStub},
        PagerService]
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ErrorDialogComponent, SuccessDialogComponent]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    errorDialogService = TestBed.get(ErrorDialogService);
  });

  it('should test pageload()', () => {
    component.pageLoad();
  }); 

  it('should test pageload() : error', () => {
    matchPaymentServiceStub.matchPaymentServicePageloadSuccessResponse.error = true;
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

  it('should test cancelMatchPayment()', () => {
    component.cancelMatchPayment();
  });

  it('should test cancelMatchPaymentSearch()', () => {
    component.cancelMatchPaymentSearch();
  });

  it('should test searchMatchPayment()', () => {
    component.searchMatchPayment();
  });

  it('should test searchMatchPayment(): error', () => {
    matchPaymentServiceStub.matchPaymentServiceSearchSuccessResponse.error = true;
    component.searchMatchPayment();
    errorDialogService.dialog.closeAll();
  });

  it('should test completed()', () => {
    component.checkedRows = matchPaymentServiceStub.matchPaymentServiceSubmitData
    component.completed();
  }); 

  it('should test completed() : error', () => {
    component.checkedRows = matchPaymentServiceStub.matchPaymentServiceSubmitData;
    matchPaymentServiceStub.matchPaymentServiceSubmitSuccessResponse.error = true;
    component.completed();
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
    let pledgeFundType = component.searchForm.controls['pledgeFundType']; 
    expect(pledgeFundType.valid).toBeTruthy(); 
  });

  it('search form : Country field validity', () => {
    let programName = component.searchForm.controls['programName']; 
    expect(programName.valid).toBeTruthy(); 
  });

  it('search form : Credit Amountfield validity', () => {
    let amount = component.searchForm.controls['amount']; 
    expect(amount.valid).toBeTruthy(); 
  });

  it('search form : Debit Amount field validity', () => {
    let endDate = component.searchForm.controls['endDate']; 
    expect(endDate.valid).toBeTruthy(); 
  });

  it('search form : InstallmentNo field validity', () => {
    let startDate = component.searchForm.controls['startDate']; 
    expect(startDate.valid).toBeTruthy(); 
  });

  it('should test table', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRow = fixture.nativeElement.querySelectorAll('mat-header-row');
      let headerRow = tableRow[0];
      expect(headerRow.childNodes[1].innerText).toEqual("")
      expect(headerRow.childNodes[2].innerText).toEqual("Pledge Id")
      expect(headerRow.childNodes[3].innerText).toEqual("Invoice Id")
      expect(headerRow.childNodes[4].innerText).toEqual("Donor Name")
      expect(headerRow.childNodes[5].innerText).toEqual("Ar Id")
      expect(headerRow.childNodes[6].innerText).toEqual("($) Credit")
      expect(headerRow.childNodes[7].innerText).toEqual("Country")
      expect(headerRow.childNodes[8].innerText).toEqual("Installment")
      expect(headerRow.childNodes[9].innerText).toEqual("End Date")
      expect(headerRow.childNodes[10].innerText).toEqual("Status")
      done();
    });
  });

});
