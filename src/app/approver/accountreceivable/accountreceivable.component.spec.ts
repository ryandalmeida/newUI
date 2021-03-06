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
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { PagerService } from '../../services/pagerService.service'
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { Observable, of } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ErrorDialogComponent } from 'src/app/error-dialog/errordialog.component';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';

describe('InitiateAccountReceiviableComponent', () => {
  let component: AccountreceivableComponent;
  let fixture: ComponentFixture<AccountreceivableComponent>;
  let errorDialogService: ErrorDialogService;

  const accountReceivableServiceStub = {
    accountReceivableServicePageloadSuccessResponse : {
      error:false,
      data:[{
          pledgeId: 15,
          donorId: "abc@gmail.com",
          donorName: "Neema",
          country: "United States",
          pledgeFundType: "Regular",
          startDate: "2019-06-09",
          endDate: "2019-06-14",
          amount: 55,
          paymentPeriod: 2,
          installments: 5,
          status: "Legal Recorded by Approver",
          approvedBy: "John",
          programName: "Carbon Emission Reduction",
          comments: null
      },
      {
          pledgeId: 16,
          donorId: "abc@gmail.com",
          donorName: "Neema",
          country: "United States",
          pledgeFundType: "Regular",
          startDate: "2019-06-09",
          endDate: "2019-06-14",
          amount: 55,
          paymentPeriod: 2,
          installments: 5,
          status: "Legal Recorded by Approver",
          approvedBy: "John",
          programName: "Carbon Emission Reduction",
          comments: null
      }]
    }, 
    accountReceivableServicePageloadErrorResponse: {
      errorMessage: 'Record not found'
    },
    accountReceivableServiceSearchSuccessResponse : {
      error:false,
      data:[{
          pledgeId: 15,
          donorId: "abc@gmail.com",
          donorName: "Neema",
          country: "United States",
          pledgeFundType: "Regular",
          startDate: "2019-06-09",
          endDate: "2019-06-14",
          amount: 55,
          paymentPeriod: 2,
          installments: 5,
          status: "Legal Recorded by Approver",
          approvedBy: "John",
          programName: "Carbon Emission Reduction",
          comments: null
      }]
    }, 
    accountReceivableServiceSearchErrorResponse: {
      errorMessage: 'Record not found'
    },
    accountReceivableServiceSubmitData : {
      donorName: "swati",
      country: "United States",
      amount: 55,
      endDate: "2019-06-14",
      installments: 5,
      accountNo: "7887",
      pledgeFundType: "Regular",
      bankName: "SBI",
      pledgeId: 33,
      paymentPeriod: 2,
      startDate: "2019-06-09",
      status: "active"
    },
    accountReceivableServiceSubmitSuccessResponse :{
      error : false,
      data : "SUCCESS"
    },
    accountReceivableServiceSubmitErrorResponse:{
      data: "FAILURE"
    }
  } 

  class AccountreceivableServiceMock{
    public getAllAR() : Observable<any> {
      if(accountReceivableServiceStub.accountReceivableServicePageloadSuccessResponse.error){
        return _throw(accountReceivableServiceStub.accountReceivableServicePageloadErrorResponse.errorMessage)
      }
      return of(accountReceivableServiceStub.accountReceivableServicePageloadSuccessResponse.data);
    }

    public submitAccountReceivable() : Observable<any> {
      if(accountReceivableServiceStub.accountReceivableServiceSubmitSuccessResponse.error){
        return _throw(accountReceivableServiceStub.accountReceivableServiceSubmitErrorResponse.data)
      }
      return of(accountReceivableServiceStub.accountReceivableServiceSubmitSuccessResponse.data);
    }

    public searchaccountReceivable() : Observable<any> {
      if(accountReceivableServiceStub.accountReceivableServiceSearchSuccessResponse.error){
        return _throw(accountReceivableServiceStub.accountReceivableServiceSearchErrorResponse.errorMessage)
      }
      return of(accountReceivableServiceStub.accountReceivableServiceSearchSuccessResponse.data);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountreceivableComponent,ErrorDialogComponent, SuccessDialogComponent ],
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
      providers: [
        { provide: AccountreceivableService, useClass: AccountreceivableServiceMock, useValue: accountReceivableServiceStub },
        MsAdalAngular6Service,
        AuthenticationGuard,
        PagerService,
        SortService,
        ErrorDialogService
      ]
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ErrorDialogComponent, SuccessDialogComponent]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountreceivableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    errorDialogService = TestBed.get(ErrorDialogService);
  });

  it('should test pageload()', () => {
    component.pageLoad();
    errorDialogService.dialog.closeAll();
  }); 

  it('should test pageload() : error', () => {
    accountReceivableServiceStub.accountReceivableServicePageloadSuccessResponse.error = true;
    component.pageLoad();
    errorDialogService.openDialog('Record not found');
    errorDialogService.dialog.closeAll();
  }); 

  it('should test onARSubmit()', () => {
    component.rowData = accountReceivableServiceStub.accountReceivableServiceSubmitData;
    component.onARSubmit();
    errorDialogService.dialog.closeAll();
  });

  it('should test onARSubmit() : error', () => {
    component.rowData = accountReceivableServiceStub.accountReceivableServiceSubmitData;
    accountReceivableServiceStub.accountReceivableServiceSubmitSuccessResponse.error = true;
    component.onARSubmit();
    errorDialogService.openDialog(null);
    errorDialogService.dialog.closeAll();
  });

  it('should test searchAR()', () => {
    component.searchAR();
    errorDialogService.dialog.closeAll();
  });

  it('should test searchAR() : error', () => {
    accountReceivableServiceStub.accountReceivableServiceSearchSuccessResponse.error = true;
    component.searchAR();
    errorDialogService.dialog.closeAll();
  });

  it('should test selectRow()', () => {
    component.selectRow(null,null);
  });

  it('should test cancelARSearch()', () => {
    component.cancelARSearch();
    errorDialogService.dialog.closeAll();
  });

  it('should test onCancel()', () => {
    component.onCancel();
    errorDialogService.dialog.closeAll();
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
      expect(headerRow.childNodes[1].innerText).toEqual("Pledge Id")
      expect(headerRow.childNodes[2].innerText).toEqual("Fund Type")
      expect(headerRow.childNodes[3].innerText).toEqual("Donor Name")
      expect(headerRow.childNodes[4].innerText).toEqual("Country")
      expect(headerRow.childNodes[5].innerText).toEqual("($) Amount")
      expect(headerRow.childNodes[6].innerText).toEqual("Approver")
      expect(headerRow.childNodes[7].innerText).toEqual("Start Date")
      expect(headerRow.childNodes[8].innerText).toEqual("End Date")
      expect(headerRow.childNodes[9].innerText).toEqual("Action")
      done();
    });
  });

  it('create accountReceivable submit form invalid when empty', () => {
    expect(component.initiateARForm.valid).toBeTruthy();
  });
   
  it('create accountReceivable submit form : pledgeId field validity', () => {
    let pledgeId = component.initiateARForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeTruthy();
  });

  it('create accountReceivable submit form : donorName field validity', () => {
    let donorName = component.initiateARForm.controls['donorName'];
    expect(donorName.valid).toBeTruthy();
  });


  it('create accountReceivable submit form : country field validity', () => {
    let country = component.initiateARForm.controls['country'];
    expect(country.valid).toBeTruthy();
  });

  it('create accountReceivable submit form : pledgeFundType field validity', () => {
    let pledgeFundType = component.initiateARForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeTruthy();
  });

  it('create accountReceivable submit form : accountNo field validity', () => {
    let accountNo = component.initiateARForm.controls['accountNo'];
    expect(accountNo.valid).toBeTruthy();
  });

  it('create accountReceivable submit form : bankName field validity', () => {
    let bankName = component.initiateARForm.controls['bankName'];
    expect(bankName.valid).toBeTruthy();
  });
  
  it('create accountReceivable submit form : startDate field validity', () => {
    let startDate = component.initiateARForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  
  });

  it('create accountReceivable submit form : endDate field validity', () => {
    let endDate = component.initiateARForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('create accountReceivable submit form : amount field validity', () => {
    let amount = component.initiateARForm.controls['amount'];
    expect(amount.valid).toBeTruthy();
  });

  it('create accountReceivable submit form : paymentPeriod field validity', () => {
    let paymentPeriod = component.initiateARForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeTruthy();

  });

  it('create accountReceivable submit form : installments field validity', () => {
    let installments = component.initiateARForm.controls['installments'];
    expect(installments.valid).toBeTruthy();
  
  });

  it('search accountReceivable submit form invalid when empty', () => {
    expect(component.searchForm.valid).toBeTruthy();
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

  it('search accountreceiviable form : pledgeNo field validity', () => {
    let pledgeId = component.searchForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeTruthy();
  });

  
  it('search accountreceiviable form : startDate field validity', () => {
    let startDate = component.searchForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('search accountreceiviable form : endDate field validity', () => {
    let endDate = component.searchForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });
});
