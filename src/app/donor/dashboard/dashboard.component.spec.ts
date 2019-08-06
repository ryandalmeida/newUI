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
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
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
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { ErrorDialogComponent } from '../../error-dialog/errordialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let errorDialogService: ErrorDialogService;
  let dialog: MatDialog;

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
    pledgeServiceUpdateData : {
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
    pledgeServiceSubmitSuccessResponse: {
      error: false,
      data: "SUCCESS"
    },
    pledgeServiceSubmitErrorResponse: {
      data: "FAILURE"
    }
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
      if (pledgeServiceStub.pledgeServiceSearchSuccessResponse.error) {
        return _throw(pledgeServiceStub.pledgeServiceSearchErrorResponse.errorMessage)
      }
      return of(pledgeServiceStub.pledgeServiceSearchSuccessResponse.data);
    }

    public submitPledge(submitData): Observable<any> {
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
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}}
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
    errorDialogService = TestBed.get(ErrorDialogService);
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
    component.dialog.open(SuccessDialogComponent);
    component.dialog.closeAll();
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
    component.rowData = pledgeServiceStub.pledgeServiceUpdateData;
    component.onUpdate();
    component.dialog.open(SuccessDialogComponent);
    component.dialog.closeAll();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test dashboard table', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRow = fixture.nativeElement.querySelectorAll('mat-header-row');
      let headerRow = tableRow[0];
      expect(headerRow.childNodes[1].innerText).toEqual("PLEDGE ID")
      expect(headerRow.childNodes[2].innerText).toEqual("PROGRAM NAME")
      expect(headerRow.childNodes[3].innerText).toEqual("FUND TYPE")
      expect(headerRow.childNodes[4].innerText).toEqual("AMOUNT ($)")
      expect(headerRow.childNodes[5].innerText).toEqual("INSTALLMENTS")
      expect(headerRow.childNodes[6].innerText).toEqual("PAYMENT PERIOD")
      expect(headerRow.childNodes[7].innerText).toEqual("START DATE")
      expect(headerRow.childNodes[8].innerText).toEqual("END DATE")
      done();
    });
  });


  it('create pledge form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('create pledge form : country field validity', () => {
    let errors = {};
    let country = component.registerForm.controls['country'];
    expect(country.valid).toBeFalsy();
    country.setValue("India");
    errors = country.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : programName field validity', () => {
    let errors = {};
    let programName = component.registerForm.controls['programName'];
    expect(programName.valid).toBeFalsy();
    programName.setValue("Carbon Emission Reduction");
    errors = programName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : pledgeFundType field validity', () => {
    let errors = {};
    let pledgeFundType = component.registerForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeFalsy();
    pledgeFundType.setValue("Regular");
    errors = pledgeFundType.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : startDate field validity', () => {
    let errors = {};
    let startDate = component.registerForm.controls['startDate'];
    expect(startDate.valid).toBeFalsy();
    startDate.setValue("26-10-2018");
    errors = startDate.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : endDate field validity', () => {
    let errors = {};
    let endDate = component.registerForm.controls['endDate'];
    expect(endDate.valid).toBeFalsy();
    endDate.setValue("26-10-2018");
    errors = endDate.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : amount field validity', () => {
    let errors = {};
    let amount = component.registerForm.controls['amount'];
    expect(amount.valid).toBeFalsy();
    amount.setValue(10000);
    errors = amount.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : paymentPeriod field validity', () => {
    let errors = {};
    let paymentPeriod = component.registerForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeFalsy();
    paymentPeriod.setValue(10);
    errors = paymentPeriod.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('create pledge form : installments field validity', () => {
    let errors = {};
    let installments = component.registerForm.controls['installments'];
    expect(installments.valid).toBeFalsy();
    installments.setValue(10);
    errors = installments.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('search pledge form invalid when empty', () => {
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('search pledge form : pledgeId field validity', () => {
    let pledgeId = component.searchForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeTruthy();
  });

  it('search pledge form : pledgeFundType field validity', () => {
    let pledgeFundType = component.searchForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeTruthy();
  });

  it('search pledge form : startDate field validity', () => {
    let startDate = component.searchForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('search pledge form : endDate field validity', () => {
    let endDate = component.searchForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('search pledge form : programName field validity', () => {
    let programName = component.searchForm.controls['programName'];
    expect(programName.valid).toBeTruthy();
  });

  it('search pledge form : amount field validity', () => {
    let amount = component.searchForm.controls['amount'];
    expect(amount.valid).toBeTruthy();
  });


  it('update pledge form invalid when empty', () => {
    expect(component.updateForm.valid).toBeFalsy();
  });

  it('update pledge form : country field validity', () => {
    let errors = {};
    let country = component.updateForm.controls['country'];
    expect(country.valid).toBeFalsy();
    country.setValue("India");
    errors = country.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('update pledge form : programName field validity', () => {
    let errors = {};
    let programName = component.updateForm.controls['programName'];
    expect(programName.valid).toBeFalsy();
    programName.setValue("Carbon Emission Reduction");
    errors = programName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('update pledge form : pledgeFundType field validity', () => {
    let errors = {};
    let pledgeFundType = component.updateForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeFalsy();
    pledgeFundType.setValue("Regular");
    errors = pledgeFundType.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('update pledge form : startDate field validity', () => {
    let errors = {};
    let startDate = component.updateForm.controls['startDate'];
    expect(startDate.valid).toBeFalsy();
    startDate.setValue("26-10-2018");
    errors = startDate.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('update pledge form : endDate field validity', () => {
    let errors = {};
    let endDate = component.updateForm.controls['endDate'];
    expect(endDate.valid).toBeFalsy();
    endDate.setValue("26-10-2018");
    errors = endDate.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('update pledge form : amount field validity', () => {
    let errors = {};
    let amount = component.updateForm.controls['amount'];
    expect(amount.valid).toBeFalsy();
    amount.setValue(10000);
    errors = amount.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('update pledge form : paymentPeriod field validity', () => {
    let errors = {};
    let paymentPeriod = component.updateForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeFalsy();
    paymentPeriod.setValue(10);
    errors = paymentPeriod.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('update pledge form : installments field validity', () => {
    let errors = {};
    let installments = component.updateForm.controls['installments'];
    expect(installments.valid).toBeFalsy();
    installments.setValue(10);
    errors = installments.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('update pledge form : pledgeId field validity', () => {
    let errors = {};
    let pledgeId = component.updateForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeFalsy();
    pledgeId.setValue(10);
    errors = pledgeId.errors || {};
    expect(errors['required']).toBeFalsy();
  });
});