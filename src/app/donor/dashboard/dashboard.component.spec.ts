import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  MatDialog
} from '@angular/material';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard.component';
import { PledgeService } from '../../services/pledge.service';
import { PagerService } from '../../services/pagerService.service'
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { PledgeData } from 'src/app/models/pledge.model';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { ErrorDialogComponent } from '../../error-dialog/errordialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let errorDialogService: ErrorDialogService;
  let dialog: MatDialog;
  //let dialogSpy: jasmine.Spy;
  //let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  //.componentInstance = { body: '' };

  const pledgeServiceStub = {
    pledgeServicePageloadSuccessResponse: {
      error: false,
      data: [{
        amount: 1200,
        approvedBy: "puneet",
        comments: null,
        country: "United States",
        donorId: "Sakshi.Kumar@lntinfotech.com",
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-13",
        installments: 10,
        paymentPeriod: 1,
        pledgeFundType: "Regular",
        pledgeId: 1,
        programName: "Carbon Footprint",
        startDate: "2019-07-06",
        status: "New"
      },
      {
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
    pledgeServicePageloadErrorResponse: {
      errorMessage: 'Record not found'
    },
    pledgeServiceSearchSuccessResponse: {
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
    pledgeServiceSearchErrorResponse: {
      errorMessage: 'Record not found'
    },
    pledgeServiceSubmitSuccessResponse: {
      error: false,
      data: "SUCCESS"
    },
    pledgeServiceSubmitErrorResponse: {
      data: "FAILURE"
    }
  }

  let  updateData = {
    amount: 1200,
    approvedBy: "puneet",
    comments: null,
    country: "United States",
    donorId: "Sakshi.Kumar@lntinfotech.com",
    donorName: "SAKSHI KUMAR",
    endDate: "2019-07-13",
    installments: 10,
    paymentPeriod: 1,
    pledgeFundType: "Regular",
    pledgeId: 1,
    programName: "Carbon Footprint",
    startDate: "2019-07-06",
    status: "New"
  }

  class PledgeServiceMock {
    searchFormData = {
      amount: "",
      endDate: "",
      pledgeFundType: "",
      pledgeId: "2",
      programName: "",
      startDate: ""
    };

    submitData = {
      programName: 'Carbon Emission Reduction',
      pledgeFundType: 'Regular',
      amount: 500000000,
      installments: 10,
      paymentPeriod: 10,
      startDate: new Date('2017-09-03'),
      endDate: new Date('2018-09-04'),
      country: 'India',
      donorName: 'SAKSHI KUMAR',
      donorId: 'sakshi.kumar@lntinfotech.com',
      status: 'New'
    }

   

    public getAllPledge(): Observable<any> {
      if (pledgeServiceStub.pledgeServicePageloadSuccessResponse.error) {
        return _throw(pledgeServiceStub.pledgeServicePageloadErrorResponse.errorMessage)
      }
      return of(pledgeServiceStub.pledgeServicePageloadSuccessResponse.data);
    }

    public searchPledge(searchFormData): Observable<any> {
      console.log("requestData", searchFormData)
      if (pledgeServiceStub.pledgeServiceSearchSuccessResponse.error) {
        return _throw(pledgeServiceStub.pledgeServiceSearchErrorResponse.errorMessage)
      }
      return of(pledgeServiceStub.pledgeServiceSearchSuccessResponse.data);
    }

    public submitPledge(submitData): Observable<any> {
      console.log("submitData", submitData)
      if (pledgeServiceStub.pledgeServiceSubmitSuccessResponse.error) {
        return _throw(pledgeServiceStub.pledgeServiceSubmitErrorResponse.data)
      }
      return of(pledgeServiceStub.pledgeServiceSubmitSuccessResponse);
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
      declarations: [DashboardComponent, ErrorDialogComponent, SuccessDialogComponent],
      providers: [
        { provide: PledgeService, useClass: PledgeServiceMock, useValue: pledgeServiceStub },
        PagerService,
        ErrorDialogService,
        SortService,
        MsAdalAngular6Service,
        AuthenticationGuard,
      ],
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ErrorDialogComponent, SuccessDialogComponent]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.get(MatDialog)
    //dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    errorDialogService = TestBed.get(ErrorDialogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test pageload()', () => {
    component.pageload();
  });

  it('should test pageload() : error', () => {
    pledgeServiceStub.pledgeServicePageloadSuccessResponse.error = true;
    component.pageload();
    errorDialogService.openDialog('Record not found');
  });

  it('should test searchPledge()', () => {
    component.searchPledge();
  });

  it('should test onCancel()', () => {
    component.onCancel();
    expect(component.createPledgeClicked).toEqual(false);
    expect(component.isupdatePledgeClicked).toEqual(false);
  });

  it('should test createPledge()', () => {
    component.createPledge();
    component.registerForm.reset();
    expect(component.createPledgeClicked).toEqual(true);
  });

  it('should test selectRow()', () => {
    component.selectRow(null);
    expect(component.rowData).toEqual(null);
    expect(component.isupdatePledgeClicked).toEqual(true);
  });

  it('should test cancelPledgeSearch()', () => {
    component.cancelPledgeSearch();
    component.pageload();
  });

  it('should test onSubmit()', () => {
    component.onSubmit();
    //expect(dialogSpy).toHaveBeenCalled();
  });

  it('should test onSubmit() : error', () => {
    pledgeServiceStub.pledgeServiceSubmitSuccessResponse.error = true;
    component.onSubmit();
    errorDialogService.openDialog(null);
  });

  it('should test onUpdateRow()', () => {
    component.onUpdateRow(null);
    expect(component.rowData).toEqual(null);
  });

  it('should test onUpdate()', () => {
    /* const config = {
      data: {
        height: '195px',
        width: '325px',
      }
    }; */
    component.rowData = updateData;
    console.log("updatePledgeData **", component.updatePledgeData, updateData)
    component.onUpdate();
    spyOn(dialog, 'open').and.callThrough();
    expect(dialog.open).toHaveBeenCalled();
    /* dialog.open(SuccessDialogComponent, config); */
    //expect(dialogSpy).toHaveBeenCalled();

  });
});
