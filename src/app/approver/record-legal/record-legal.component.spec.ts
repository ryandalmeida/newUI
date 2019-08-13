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
  MatSortModule,
  MatCheckboxModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignaturePadModule } from 'angular2-signaturepad';
import { RecordLegalComponent } from './record-legal.component';
import { LegalService } from '../../services/legal.service';
import { PagerService } from '../../services/pagerService.service'
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { Observable, of } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { ErrorDialogComponent } from 'src/app/error-dialog/errordialog.component';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('RecordLegalComponent', () => {
  let component: RecordLegalComponent;
  let fixture: ComponentFixture<RecordLegalComponent>;
  let errorDialogService: ErrorDialogService;

  const recordLegalApproverServiceStub = {
    recordLegalApproverServicePageloadSuccessResponse : {
      error:false,
      data:[{
        amount: 123,
        approvedBy: "puneet",
        comments: null,
        country: "United States",
        donorId: "Sakshi.Kumar@lntinfotech.com",
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-13",
        installments: 1,
        paymentPeriod: 1,
        pledgeFundType: "Regular",
        pledgeId: 3,
        programName: "Carbon Emission Reduction",
        startDate: "2019-07-06",
        status: "Legal Recorded by Donor"
      },
      {
        amount: 1500,
        approvedBy: "puneet",
        comments: null,
        country: "Australia",
        donorId: "Sakshi.Kumar@lntinfotech.com",
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-31",
        installments: 10,
        paymentPeriod: 1,
        pledgeFundType: "Additional Contribution",
        pledgeId: 4,
        programName: "Carbon Emission Reduction",
        startDate: "2019-07-01",
        status: "Legal Recorded by Donor"
      }]
    }, 
    recordLegalApproverServicePageloadErrorResponse: {
      errorMessage: 'Record not found'
    },
    recordLegalApproverServiceSearchSuccessResponse : {
      error:false,
      data:[{
        amount: 1500,
        approvedBy: "puneet",
        comments: null,
        country: "Australia",
        donorId: "Sakshi.Kumar@lntinfotech.com",
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-31",
        installments: 10,
        paymentPeriod: 1,
        pledgeFundType: "Additional Contribution",
        pledgeId: 4,
        programName: "Carbon Emission Reduction",
        startDate: "2019-07-01",
        status: "Legal Recorded by Donor"
      }]
    }, 
    recordLegalApproverServiceSearchErrorResponse: {
      errorMessage: 'Record not found'
    },
    recordLegalApproverServiceSubmitData :[{
      amount: 123,
      approvedBy: "puneet",
      comments: null,
      country: "United States",
      donorId: "Sakshi.Kumar@lntinfotech.com",
      donorName: "SAKSHI KUMAR",
      endDate: "2019-07-13",
      installments: 1,
      paymentPeriod: 1,
      pledgeFundType: "Regular",
      pledgeId: 3,
      programName: "Carbon Emission Reduction",
      startDate: "2019-07-06",
      status: "Legal Recorded by Donor"
    }],
    recordLegalApproverServiceSubmitSuccessResponse :{
      error : false,
      data : "SUCCESS"
    },
    recordLegalApproverServiceSubmitErrorResponse:{
      data: "FAILURE"
    },
    recordLegalApproverServiceSignSuccessResponse :{
      error : false,
      data : "data:image/png;base64,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"
    },
    recordLegalApproverServiceSignErrorResponse:{
      errorMessage: 'Record not found'
    }
  } 

  class LegalServiceMock{
    public getAllLegalRecordedbyDonor() : Observable<any> {
      if(recordLegalApproverServiceStub.recordLegalApproverServicePageloadSuccessResponse.error){
        return _throw(recordLegalApproverServiceStub.recordLegalApproverServicePageloadErrorResponse.errorMessage)
      }
      return of(recordLegalApproverServiceStub.recordLegalApproverServicePageloadSuccessResponse.data);
    }

    public onLegalSubmitWBGUser() : Observable<any> {
      if(recordLegalApproverServiceStub.recordLegalApproverServiceSubmitSuccessResponse.error){
        return _throw(recordLegalApproverServiceStub.recordLegalApproverServiceSubmitErrorResponse.data)
      }
      return of(recordLegalApproverServiceStub.recordLegalApproverServiceSubmitSuccessResponse.data);
    }

    public search() : Observable<any> {
      if(recordLegalApproverServiceStub.recordLegalApproverServiceSearchSuccessResponse.error){
        return _throw(recordLegalApproverServiceStub.recordLegalApproverServiceSearchErrorResponse.errorMessage)
      }
      return of(recordLegalApproverServiceStub.recordLegalApproverServiceSearchSuccessResponse.data);
    }

    public getSign() : Observable<any> {
      if(recordLegalApproverServiceStub.recordLegalApproverServiceSignSuccessResponse.error){
        return _throw(recordLegalApproverServiceStub.recordLegalApproverServiceSignErrorResponse.errorMessage)
      }
      return of(recordLegalApproverServiceStub.recordLegalApproverServiceSignSuccessResponse.data);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordLegalComponent,ErrorDialogComponent, SuccessDialogComponent],
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
        SignaturePadModule,
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
      providers: [
           { provide: LegalService, useClass: LegalServiceMock, useValue: recordLegalApproverServiceStub},
            PagerService, 
            ErrorDialogService,
            SortService,
            MsAdalAngular6Service,
            AuthenticationGuard
          ]
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ErrorDialogComponent, SuccessDialogComponent]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    errorDialogService = TestBed.get(ErrorDialogService);
  });

  it('should test pageload()', () => {
    component.pageload();
  }); 

  it('should test pageload() : error', () => {
    recordLegalApproverServiceStub.recordLegalApproverServicePageloadSuccessResponse.error = true;
    component.pageload();
    errorDialogService.openDialog('Record not found');
    errorDialogService.dialog.closeAll();
  }); 

  it('should test selectRow()', () => {
    component.selectRow(recordLegalApproverServiceStub.recordLegalApproverServiceSubmitData);
  });
  
  it('should test selectRow() : error', () => {
    recordLegalApproverServiceStub.recordLegalApproverServiceSignSuccessResponse.error = true;
    component.selectRow(recordLegalApproverServiceStub.recordLegalApproverServiceSubmitData);
    errorDialogService.dialog.closeAll();
  });

  it('should test onCancel()', () => {
    component.onCancel();
  });

  it('should test onLegalSubmit()', () => {
    component.signaturePad = null;
    component.onLegalSubmit(recordLegalApproverServiceStub.recordLegalApproverServiceSubmitData);
  });

  it('should test cancelLegal()', () => {
    component.cancelLegal();
  });

  it('should test searchLegal()', () => {
    component.searchLegal();
  });

  it('should test searchLegal() : error', () => {
    recordLegalApproverServiceStub.recordLegalApproverServiceSearchSuccessResponse.error = true;
    component.searchLegal();
    errorDialogService.dialog.closeAll();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test table for record legal approver', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRow = fixture.nativeElement.querySelectorAll('mat-header-row');
      let headerRow = tableRow[0];
      expect(headerRow.childNodes[1].innerText).toEqual("Pledge Id")
      expect(headerRow.childNodes[2].innerText).toEqual("Program Name")
      expect(headerRow.childNodes[3].innerText).toEqual("Fund Type")
      expect(headerRow.childNodes[4].innerText).toEqual("Donor Name")
      expect(headerRow.childNodes[5].innerText).toEqual("Country")
      expect(headerRow.childNodes[6].innerText).toEqual("($) Amount")
      expect(headerRow.childNodes[7].innerText).toEqual("Approver")
      expect(headerRow.childNodes[8].innerText).toEqual("Start Date")
      expect(headerRow.childNodes[9].innerText).toEqual("End Date")
      expect(headerRow.childNodes[10].innerText).toEqual("Status")
      done();
    });
  });

  it('record legal approver form invalid when empty', () => {
    expect(component.recordLegalForm.valid).toBeFalsy();
  });

  it('record legal approver form : pledgeId field validity', () => {
    let pledgeId = component.recordLegalForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeTruthy();
  });

  it('record legal approver form : donorName field validity', () => {
    let donorName = component.recordLegalForm.controls['donorName'];
    expect(donorName.valid).toBeTruthy();
  });

  it('record legal approver form : wbg_program field validity', () => {
    let wbg_program = component.recordLegalForm.controls['wbg_program'];
    expect(wbg_program.valid).toBeTruthy();
  });

  it('record legal approver form : country field validity', () => {
    let country = component.recordLegalForm.controls['country'];
    expect(country.valid).toBeTruthy();
  });

  it('record legal approver form : pledgeFundType field validity', () => {
    let pledgeFundType = component.recordLegalForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeTruthy();
  });

  it('record legal approver form : startDate field validity', () => {
    let startDate = component.recordLegalForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('record legal approver form : endDate field validity', () => {
    let endDate = component.recordLegalForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('record legal approver form : amount field validity', () => {
    let amount = component.recordLegalForm.controls['amount'];
    expect(amount.valid).toBeTruthy();
  });

  it('record legal approver form : paymentPeriod field validity', () => {
    let paymentPeriod = component.recordLegalForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeTruthy();
  });

  it('record legal approver form : noOfPayment field validity', () => {
    let noOfPayment = component.recordLegalForm.controls['noOfPayment'];
    expect(noOfPayment.valid).toBeTruthy();
  });

  it('record legal approver form : donorSign field validity', () => {
    let donorSign = component.recordLegalForm.controls['donorSign'];
    expect(donorSign.valid).toBeTruthy();
  });

  it('record legal approver form : wbg Business user field validity', () => {
    let errors = {};
    let wbgBusinessUserSign = component.recordLegalForm.controls['wbgBusinessUserSign'];
    expect(wbgBusinessUserSign.valid).toBeFalsy();
    wbgBusinessUserSign.setValue("data:image/png;base64,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");
    errors = wbgBusinessUserSign.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('search record legal approver form  invalid when empty', () => {
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('search record legal approver form : pledgeNo field validity', () => {
    let pledgeNo = component.searchForm.controls['pledgeNo'];
    expect(pledgeNo.valid).toBeTruthy();
  });

  it('search record legal approver form : pledgeFundType field validity', () => {
    let pledgeFundType = component.searchForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeTruthy();
  });

  it('search record legal approver form : startDate field validity', () => {
    let startDate = component.searchForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('search record legal approver form : endDate field validity', () => {
    let endDate = component.searchForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('search record legal approver form : programName field validity', () => {
    let programName = component.searchForm.controls['programName'];
    expect(programName.valid).toBeTruthy();
  });

  it('search record legal approver form : amount field validity', () => {
    let amount = component.searchForm.controls['amount'];
    expect(amount.valid).toBeTruthy();
  });

  it('search record legal approver form : paymentPeriod field validity', () => {
    let paymentPeriod = component.searchForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeTruthy();
  });

  it('search record legal approver form : installments field validity', () => {
    let installments = component.searchForm.controls['installments'];
    expect(installments.valid).toBeTruthy();
  });
});
 