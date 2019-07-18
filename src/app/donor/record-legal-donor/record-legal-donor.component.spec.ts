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

  let submitDonorDetailsData =
  {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test pageload()', () => {
    component.pageload();
  });

  it('should test pageload() : error', () => {
    recordLegalDonorStub.legalServicePagelodSuccessResponse.error = true;
    component.pageload();
    errorDialogService.openDialog('Record not found');
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
    component.onLegalSubmit(submitDonorDetailsData);
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
  });
});
