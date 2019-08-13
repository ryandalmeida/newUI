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
  MatSortModule ,
  MatCheckboxModule
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { GenerateBillingComponent } from './generate-billing.component';
import { PagerService } from '../../services/pagerService.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { BillingService } from '../../services/billing.service';
import { Observable, of } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ErrorDialogComponent } from 'src/app/error-dialog/errordialog.component';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';

describe('GenerateBillingComponent', () => {
  let component: GenerateBillingComponent;
  let fixture: ComponentFixture<GenerateBillingComponent>;
  let errorDialogService: ErrorDialogService;

  const generateBillingServiceStub = {
    generateBillingServicePageloadSuccessResponse : {
      error:false,
      data:[{
        accountNo: "23456",
        amount: 800000,
        arId: 14,
        bankName: "SBI",
        country: "United States",
        debit: 133333,
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-28",
        installmentNo: 1,
        installments: 6,
        paymentPeriod: 3,
        pledgeFundType: "Regular",
        pledgeId: 9,
        programName: null,
        startDate: "2019-07-20",
        status: "active"
      },
      {
        accountNo: "456",
        amount: 1500,
        arId: 25,
        bankName: "SBI",
        country: "India",
        debit: 1500,
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-12",
        installmentNo: 1,
        installments: 1,
        paymentPeriod: 2,
        pledgeFundType: "Regular",
        pledgeId: 46,
        programName: null,
        startDate: "2019-07-06",
        status: "active"
      }]
    }, 
    generateBillingServicePageloadErrorResponse: {
      errorMessage: 'Record not found'
    },
    generateBillingServiceSearchSuccessResponse : {
      error:false,
      data:[{
        accountNo: "23456",
        amount: 800000,
        arId: 14,
        bankName: "SBI",
        country: "United States",
        debit: 133333,
        donorName: "SAKSHI KUMAR",
        endDate: "2019-07-28",
        installmentNo: 1,
        installments: 6,
        paymentPeriod: 3,
        pledgeFundType: "Regular",
        pledgeId: 9,
        programName: null,
        startDate: "2019-07-20",
        status: "active"
      }]
    }, 
    generateBillingServiceSearchErrorResponse: {
      errorMessage: 'Record not found'
    },
    generateBillingServiceSubmitData :[{
      accountNo: "123456789",
      amount: 550,
      arId: 10,
      bankName: "SBI",
      country: "United States",
      debit: 91,
      donorName: "SAKSHI KUMAR",
      endDate: "2019-07-20",
      installmentNo: 1,
      installments: 6,
      paymentPeriod: 1,
      pledgeFundType: "Regular",
      pledgeId: 50,
      programName: null,
      startDate: "2019-07-06",
      status: "active"
    }],
    generateBillingServiceSubmitSuccessResponse :{
      error : false,
      data : "SUCCESS"
    },
    generateBillingServiceSubmitErrorResponse:{
      data: "FAILURE"
    }
  } 

  class GenerateBillingServiceMock{
    public getAllAR() : Observable<any> {
      if(generateBillingServiceStub.generateBillingServicePageloadSuccessResponse.error){
        return _throw(generateBillingServiceStub.generateBillingServicePageloadErrorResponse.errorMessage)
      }
      return of(generateBillingServiceStub.generateBillingServicePageloadSuccessResponse.data);
    }

    public submitBill() : Observable<any> {
      if(generateBillingServiceStub.generateBillingServiceSubmitSuccessResponse.error){
        return _throw(generateBillingServiceStub.generateBillingServiceSubmitErrorResponse.data)
      }
      return of(generateBillingServiceStub.generateBillingServiceSubmitSuccessResponse.data);
    }

    public search() : Observable<any> {
      if(generateBillingServiceStub.generateBillingServiceSearchSuccessResponse.error){
        return _throw(generateBillingServiceStub.generateBillingServiceSearchErrorResponse.errorMessage)
      }
      return of(generateBillingServiceStub.generateBillingServiceSearchSuccessResponse.data);
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
            cacheLocation: 'localStorage'
          }
        ) 
    ],
      declarations: [ GenerateBillingComponent, ErrorDialogComponent, SuccessDialogComponent ],
      providers:[
        PagerService, 
        ErrorDialogService,
        SortService,
        MsAdalAngular6Service,
        AuthenticationGuard,
        { provide: BillingService, useClass: GenerateBillingServiceMock, useValue: generateBillingServiceStub}
      ]
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ErrorDialogComponent, SuccessDialogComponent]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    errorDialogService = TestBed.get(ErrorDialogService);
  });

  it('should test pageload()', () => {
    component.pageload();
  }); 

  it('should test pageload() : error', () => {
    generateBillingServiceStub.generateBillingServicePageloadSuccessResponse.error = true;
    component.pageload();
    errorDialogService.openDialog('Record not found');
    errorDialogService.dialog.closeAll();
  }); 

  it('should test generateBilling()', () => {
    component.checkedRows = generateBillingServiceStub.generateBillingServiceSubmitData;
    component.generateBilling();
  }); 

  it('should test generateBilling() : error', () => {
    component.checkedRows = generateBillingServiceStub.generateBillingServiceSubmitData;
    generateBillingServiceStub.generateBillingServiceSubmitSuccessResponse.error = true;
    component.generateBilling();
    errorDialogService.openDialog(null);
    errorDialogService.dialog.closeAll();
  });

  it('should test store()', () => {
    component.checkedRows = generateBillingServiceStub.generateBillingServiceSubmitData;
    component.store();
  }); 

  it('should test searchBilling()', () => {
    component.searchBilling();
  });

  it('should test searchBilling(): error', () => {
    generateBillingServiceStub.generateBillingServiceSearchSuccessResponse.error = true;
    component.searchBilling();
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

  it('search form : Credit Amount field validity', () => {
    let pledgeFundType = component.searchForm.controls['pledgeFundType']; 
    expect(pledgeFundType.valid).toBeTruthy(); 
  });

  it('search form : Start Date field validity', () => {
    let startDate = component.searchForm.controls['startDate']; 
    expect(startDate.valid).toBeTruthy(); 
  });

  it('search form : End Date field validity', () => {
    let endDate = component.searchForm.controls['endDate']; 
    expect(endDate.valid).toBeTruthy(); 
  });
      
  it('should test table', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRow = fixture.nativeElement.querySelectorAll('mat-header-row');
      let headerRow = tableRow[0];
      expect(headerRow.childNodes[1].innerText).toEqual("")
      expect(headerRow.childNodes[2].innerText).toEqual("Pledge Id")
      expect(headerRow.childNodes[3].innerText).toEqual("Fund Type")
      expect(headerRow.childNodes[4].innerText).toEqual("($) Credit")
      expect(headerRow.childNodes[5].innerText).toEqual("Donor Name")
      expect(headerRow.childNodes[6].innerText).toEqual("Ar Id")
      expect(headerRow.childNodes[7].innerText).toEqual("($) Debit")
      expect(headerRow.childNodes[8].innerText).toEqual("Country")
      expect(headerRow.childNodes[10].innerText).toEqual("Start Date")
      expect(headerRow.childNodes[11].innerText).toEqual("End Date")
      expect(headerRow.childNodes[12].innerText).toEqual("Status")
      done();
    });
  });

  
 
});
