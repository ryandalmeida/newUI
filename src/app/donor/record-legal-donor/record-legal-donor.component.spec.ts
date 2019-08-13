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
import { RecordLegalComponentDonor } from './record-legal-donor.component';
import { LegalService } from '../../services/legal.service';
import { PagerService } from '../../services/pagerService.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { _throw } from 'rxjs/observable/throw';
import { Observable, of } from 'rxjs';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ErrorDialogComponent } from 'src/app/error-dialog/errordialog.component';

describe('RecordLegalComponent', () => {
  let component: RecordLegalComponentDonor;
  let fixture: ComponentFixture<RecordLegalComponentDonor>;
  let errorDialogService: ErrorDialogService;

  const recordLegalDonorStub = {
    legalServicePagelodSuccessResponse: {
      error: true,
      data: [{
        amount: 1000,
        approvedBy: "puneet",
        comments: null,
        country: "United States",
        donorId: "Sakshi.Kumar@lntinfotech.com",
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-19",
        installments: 1,
        paymentPeriod: 1,
        pledgeFundType: "Regular",
        pledgeId: 18,
        programName: "Carbon Emission Reduction",
        startDate: "2019-07-01",
        status: "Approved"
      },
      {
        amount: 2000,
        approvedBy: "puneet",
        comments: null,
        country: "United States",
        donorId: "Sakshi.Kumar@lntinfotech.com",
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-19",
        installments: 1,
        paymentPeriod: 1,
        pledgeFundType: "Regular",
        pledgeId: 47,
        programName: "Carbon Emission Reduction",
        startDate: "2019-07-06",
        status: "Approved"
      }]
    },
    legalServicePagelodErrorResponse: {
      errorMessage: 'Record not found'
    },
    legalServiceSubmitData :{
      amount: null,
      country: null,
      donorName: "SAKSHI KUMAR",
      donorSign: "data:image/png;base64,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",
      endDate: null,
      installments: null,
      paymentPeriod: null,
      pledgeFundType: null,
      pledgeId: 18,
      startDate: null,
      status: "Legal Recorded by Donor",
      wbgBusinessUserSign: null,
      wbg_program: null
    },
    legalServiceSubmitSuccessResponse: {
      error: false,
      data: "SUCCESS"
    },
    legalServiceSubmitErrorResponse: {
      data: "FAILURE"
    },
    legalServiceSearchSuccessResponse: {
      error: false,
      data: [{
        amount: 15,
        approvedBy: "puneet",
        comments: null,
        country: "India",
        donorId: "Sakshi.Kumar@lntinfotech.com",
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-13",
        installments: 3,
        paymentPeriod: 1,
        pledgeFundType: "Regular",
        pledgeId: 2,
        programName: "Carbon Footprint",
        startDate: "2019-07-06",
        status: "New"
      }]
    },
    legalServiceSearchErrorResponse: {
      errorMessage: 'Record not found'
    }
  }

  class LegalServiceMock {

    public getAllLegalrecords(): Observable<any> {
      if (recordLegalDonorStub.legalServicePagelodSuccessResponse.error) {
        return _throw(recordLegalDonorStub.legalServicePagelodErrorResponse.errorMessage)
      }
      return of(recordLegalDonorStub.legalServicePagelodSuccessResponse.data);
    }

    public onLegalSubmitDonor(submitDonorDetailsData): Observable<Object> {
      if (recordLegalDonorStub.legalServiceSubmitSuccessResponse.error) {
        return _throw(recordLegalDonorStub.legalServiceSubmitErrorResponse.data)
      }
      return of(recordLegalDonorStub.legalServiceSubmitSuccessResponse.data);
    }

    public search(): Observable<any> {
      if (recordLegalDonorStub.legalServiceSearchSuccessResponse.error) {
        return _throw(recordLegalDonorStub.legalServiceSearchErrorResponse.errorMessage)
      }
      return of(recordLegalDonorStub.legalServiceSearchSuccessResponse.data);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordLegalComponentDonor, ErrorDialogComponent],
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
        { provide: LegalService, useClass: LegalServiceMock, useValue: recordLegalDonorStub },
        SortService,
        PagerService,
        ErrorDialogService,
        SortService,
        MsAdalAngular6Service,
        AuthenticationGuard]
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ErrorDialogComponent]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordLegalComponentDonor);
    component = fixture.componentInstance;
    fixture.detectChanges();
    errorDialogService = TestBed.get(ErrorDialogService);
  });

  it('should test pageload()', () => {
    component.pageload();
  });

  it('should test pageload() : error', () => {
    recordLegalDonorStub.legalServicePagelodSuccessResponse.error = true;
    component.pageload();
    errorDialogService.openDialog('Record not found');
    errorDialogService.dialog.closeAll();
  });

  it('should test selectRow()', () => {
    component.selectRow(null)
    component.recordLegalForm.reset();
    component.isRowClicked = true;
  });

  it('should test onCancel()', () => {
    component.onCancel()
    component.isRowClicked = false;
    recordLegalDonorStub.legalServicePagelodSuccessResponse.error = false;
    component.pageload();
  });

  it('should test onLegalSubmit()', () => {
    component.signaturePad = null;
    component.onLegalSubmit(recordLegalDonorStub.legalServiceSubmitData);
  });

  it('should test onLegalSubmit() : error', () => {
    recordLegalDonorStub.legalServiceSubmitSuccessResponse.error = true;
    component.onLegalSubmit(recordLegalDonorStub.legalServiceSubmitData);
  });

  it('should test cancelLegal()', () => {
    component.cancelLegal();
  });

  it('should test searchLegal()', () => {
    component.searchLegal();
  });

  it('should test searchLegal() : error', () => {
    recordLegalDonorStub.legalServiceSearchSuccessResponse.error = true;
    component.searchLegal();
    errorDialogService.dialog.closeAll();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test dashboard table for Record legal-donor', (done) => {
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

  it('record legal donor form : pledgeId field validity', () => {
    let pledgeId = component.recordLegalForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeTruthy();
  });

  it('record legal donor form : donorName field validity', () => {
    let donorName = component.recordLegalForm.controls['donorName'];
    expect(donorName.valid).toBeTruthy();
  });

  it('record legal donor form : wbg_program field validity', () => {
    let wbg_program = component.recordLegalForm.controls['wbg_program'];
    expect(wbg_program.valid).toBeTruthy();
  });

  it('record legal donor form : country field validity', () => {
    let country = component.recordLegalForm.controls['country'];
    expect(country.valid).toBeTruthy();
  });

  it('record legal donor form : pledgeFundType field validity', () => {
    let pledgeFundType = component.recordLegalForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeTruthy();
  });

  it('record legal donor form : startDate field validity', () => {
    let startDate = component.recordLegalForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('record legal donor form : endDate field validity', () => {
    let endDate = component.recordLegalForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('record legal donor form : amount field validity', () => {
    let amount = component.recordLegalForm.controls['amount'];
    expect(amount.valid).toBeTruthy();
  });

  it('record legal donor form : paymentPeriod field validity', () => {
    let paymentPeriod = component.recordLegalForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeTruthy();
  });

  it('record legal donor form : installments field validity', () => {
    let installments = component.recordLegalForm.controls['installments'];
    expect(installments.valid).toBeTruthy();
  });

  it('record legal donor form : donorSign field validity', () => {
    let errors = {};
    let donorSign = component.recordLegalForm.controls['donorSign'];
    expect(donorSign.valid).toBeFalsy();
    donorSign.setValue("data:image/png;base64,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");
    errors = donorSign.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('record legal donor form : wbg Business user field validity', () => {
    let wbgBusinessUserSign = component.recordLegalForm.controls['wbgBusinessUserSign'];
    expect(wbgBusinessUserSign.valid).toBeTruthy();
  });

  it('search record legal donor form invalid when empty', () => {
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('search record legal donor form form : pledgeId field validity', () => {
    let pledgeId = component.searchForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeTruthy();
  });

  it('search record legal donor form form : pledgeFundType field validity', () => {
    let pledgeFundType = component.searchForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeTruthy();
  });

  it('search record legal donor form form : startDate field validity', () => {
    let startDate = component.searchForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('search record legal donor form form : endDate field validity', () => {
    let endDate = component.searchForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('search record legal donor form form : programName field validity', () => {
    let programName = component.searchForm.controls['programName'];
    expect(programName.valid).toBeTruthy();
  });

  it('search record legal donor form form : amount field validity', () => {
    let amount = component.searchForm.controls['amount'];
    expect(amount.valid).toBeTruthy();
  });

});
