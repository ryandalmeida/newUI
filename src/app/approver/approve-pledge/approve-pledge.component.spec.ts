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
import { ApprovePledgeComponent } from './approve-pledge.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PledgeService } from '../../services/pledge.service';
import { HttpClient } from '@angular/common/http';
import { PagerService } from '../../services/pagerService.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ErrorDialogComponent } from 'src/app/error-dialog/errordialog.component';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';
import { Observable, of } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { MsAdalAngular6Module, AuthenticationGuard, MsAdalAngular6Service } from 'microsoft-adal-angular6';

describe('ApprovePledgeComponent', () => {
  let component: ApprovePledgeComponent;
  let fixture: ComponentFixture<ApprovePledgeComponent>;
  let errorDialogService: ErrorDialogService;

  const approvePledgeServiceStub = {
    approvePledgeServicePageloadSuccessResponse : {
      error:false,
      data:[{
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
    approvePledgeServicePageloadErrorResponse: {
      errorMessage: 'Record not found'
    },
    approvePledgeServiceSearchSuccessResponse : {
      error:false,
      data:[{
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
        status: "New",
      }]
    }, 
    approvePledgeServiceSearchErrorResponse: {
      errorMessage: 'Record not found'
    },
    approvePledgeServiceSubmitData :[{
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
      status: "Approved"
    }],
    approvePledgeServiceSubmitSuccessResponse :{
      error : false,
      data : "SUCCESS"
    },
    approvePledgeServiceSubmitErrorResponse:{
      data: "FAILURE"
    },
    approvePledgeServiceReviseData :[{
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
    }],
    approvePledgeServiceReviseSuccessResponse :{
      error : false,
      data : "SUCCESS"
    },
    approvePledgeServiceReviseErrorResponse:{
      data: "FAILURE"
    }
  } 

  class PledgeServiceMock{
    public getNewPledge() : Observable<any> {
      if(approvePledgeServiceStub.approvePledgeServicePageloadSuccessResponse.error){
        return _throw(approvePledgeServiceStub.approvePledgeServicePageloadErrorResponse.errorMessage)
      }
      return of(approvePledgeServiceStub.approvePledgeServicePageloadSuccessResponse.data);
    }

    public approvePledge() : Observable<any> {
      if(approvePledgeServiceStub.approvePledgeServiceSubmitSuccessResponse.error){
        return _throw(approvePledgeServiceStub.approvePledgeServiceSubmitErrorResponse.data)
      }
      return of(approvePledgeServiceStub.approvePledgeServiceSubmitSuccessResponse.data);
    }

    public searchPledgeApprover() : Observable<any> {
      if(approvePledgeServiceStub.approvePledgeServiceSearchSuccessResponse.error){
        return _throw(approvePledgeServiceStub.approvePledgeServiceSearchErrorResponse.errorMessage)
      }
      return of(approvePledgeServiceStub.approvePledgeServiceSearchSuccessResponse.data);
    }

    public revisePledge() : Observable<any> {
      if(approvePledgeServiceStub.approvePledgeServiceReviseSuccessResponse.error){
        return _throw(approvePledgeServiceStub.approvePledgeServiceReviseErrorResponse.data)
      }
      return of(approvePledgeServiceStub.approvePledgeServiceReviseSuccessResponse.data);
    }

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePledgeComponent,ErrorDialogComponent, SuccessDialogComponent ],
       imports: [
        ReactiveFormsModule,
        FormsModule,MatIconModule,
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
            cacheLocation: 'localStorage'
          }
        ) 
        ],
        providers: [
          { provide: PledgeService, useClass: PledgeServiceMock, useValue: approvePledgeServiceStub},
          PagerService,
          SortService,
          ErrorDialogService,
          MsAdalAngular6Service,
          AuthenticationGuard,
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
    fixture = TestBed.createComponent(ApprovePledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    errorDialogService = TestBed.get(ErrorDialogService);
  });

  it('should test pageload()', () => {
    component.pageLoad();
  }); 

  it('should test pageload() : error', () => {
    approvePledgeServiceStub.approvePledgeServicePageloadSuccessResponse.error = true;
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

  it('should test onRevise()', () => {
    component.rowData = approvePledgeServiceStub.approvePledgeServiceReviseData;
    component.onRevise();
  });

  it('should test onRevise() : error', () => {
    component.rowData = approvePledgeServiceStub.approvePledgeServiceReviseData;
    approvePledgeServiceStub.approvePledgeServiceReviseSuccessResponse.error = true;
    component.onRevise();
  });

  it('should test cancelPledge()', () => {
    component.cancelPledge();
  });

  it('should test searchPledge()', () => {
    component.searchPledge();
  });

  it('should test searchPledge(): error', () => {
    approvePledgeServiceStub.approvePledgeServiceSearchSuccessResponse.error = true;
    component.searchPledge();
  });

  it('should test approvePledge()', () => {
    component.checkedRowsObject = approvePledgeServiceStub.approvePledgeServiceSubmitData;
    component.approvePledge();
  });

  it('should test approvePledge() : error', () => {
    approvePledgeServiceStub.approvePledgeServiceSubmitSuccessResponse.error = true;
    component.checkedRowsObject = approvePledgeServiceStub.approvePledgeServiceSubmitData;
    component.approvePledge();
    errorDialogService.openDialog('Record not found');
    errorDialogService.dialog.closeAll();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test table', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRow = fixture.nativeElement.querySelectorAll('mat-header-row');
      let headerRow = tableRow[0];
      expect(headerRow.childNodes[1].innerText).toEqual("")
      expect(headerRow.childNodes[2].innerText).toEqual("PLEDGE ID")
      expect(headerRow.childNodes[3].innerText).toEqual("PROGRAM NAME")
      expect(headerRow.childNodes[4].innerText).toEqual("FUND TYPE")
      expect(headerRow.childNodes[5].innerText).toEqual("DONOR NAME")
      expect(headerRow.childNodes[6].innerText).toEqual("COUNTRY")
      expect(headerRow.childNodes[7].innerText).toEqual("AMOUNT ($)")
      expect(headerRow.childNodes[8].innerText).toEqual("APPROVER")
      expect(headerRow.childNodes[9].innerText).toEqual("START DATE")
      expect(headerRow.childNodes[10].innerText).toEqual("END DATE")
      expect(headerRow.childNodes[11].innerText).toEqual("STATUS")
      done();
    });
  });


  it('revise pledge form invalid when empty', () => {
    expect(component.approvePledgeForm.valid).toBeTruthy();
  });

  it('revise pledge form : pledgeId field validity', () => {
    let pledgeId = component.approvePledgeForm.controls['pledgeId'];
    expect(pledgeId.valid).toBeTruthy();
  });

  it('revise pledge form : donorName field validity', () => {
    let donorName = component.approvePledgeForm.controls['donorName'];
    expect(donorName.valid).toBeTruthy();
  });

  it('revise pledge form : programName field validity', () => {
    let programName = component.approvePledgeForm.controls['programName'];
    expect(programName.valid).toBeTruthy();
  });

  it('revise pledge form : country field validity', () => {
    let country = component.approvePledgeForm.controls['country'];
    expect(country.valid).toBeTruthy();
  });

  it('revise pledge form : pledgeFundType field validity', () => {
    let pledgeFundType = component.approvePledgeForm.controls['pledgeFundType'];
    expect(pledgeFundType.valid).toBeTruthy();
  });

  it('revise pledge form : startDate field validity', () => {
    let startDate = component.approvePledgeForm.controls['startDate'];
    expect(startDate.valid).toBeTruthy();
  });

  it('revise pledge form : endDate field validity', () => {
    let endDate = component.approvePledgeForm.controls['endDate'];
    expect(endDate.valid).toBeTruthy();
  });

  it('revise pledge form : amount field validity', () => {
    let amount = component.approvePledgeForm.controls['amount'];
    expect(amount.valid).toBeTruthy();
  });

  it('revise pledge form : paymentPeriod field validity', () => {
    let paymentPeriod = component.approvePledgeForm.controls['paymentPeriod'];
    expect(paymentPeriod.valid).toBeTruthy();
  });

  it('revise pledge form : installments field validity', () => {
    let installments = component.approvePledgeForm.controls['installments'];
    expect(installments.valid).toBeTruthy();
  });

  it('revise pledge form : comments field validity', () => {
    let comments = component.approvePledgeForm.controls['comments'];
    expect(comments.valid).toBeTruthy();
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

});
