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
xdescribe('ProcessInvoiceComponent', () => {
  let component: ProcessInvoiceComponent;
  let fixture: ComponentFixture<ProcessInvoiceComponent>;

  
  const invoiceServiceStub = {
    invoiceServicePageloadSuccessResponse : {
      error:false,
      data:{
        pledgeId: 2,
        country: "United States",
        donorName : "SAKSHI KUMAR",
        invoiceId: 59,
        startDate:  new Date("2019-07-06"),
        endDate: new Date("2019-07-20"),
        arId: 109,
        installmentNo:1,
        debit:24
      }
    }, 
    invoiceServicePageloadErrorResponse: {
      errorMessage: 'Record not found'
    },
    invoiceServiceSearchSuccessResponse : {
      error:false,
      data:[{
        pledgeId: 2,
        programName: 'Carbon Emission Reduction',
        pledgeFundType: 'Regular',
        amount: 500000000,
        installments: 10,
        paymentPeriod: 10,
        startDate: new Date('2017-09-03'),
        endDate: new Date('2018-09-04'),
        country: 'India',
        status: 'New'
      }]
    }, 
    invoiceServiceSearchErrorResponse: {
      errorMessage: 'Record not found'
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
  }

  class SortServiceMock{
    public tableSort() : Observable<any> {
      if(invoiceServiceStub.invoiceServicePageloadSuccessResponse.error){
        return _throw(invoiceServiceStub.invoiceServicePageloadErrorResponse.errorMessage)
      }
      return of(invoiceServiceStub.invoiceServicePageloadSuccessResponse);
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
    ],
      declarations: [ 
              ProcessInvoiceComponent,
            ],
         providers:[
           PagerService, 
           ProcessInvoiceService, 
           { provide: ProcessInvoiceService, useClass: ProcessInvoiceServiceMock, useValue: invoiceServiceStub },
           { provide: SortService, useClass: SortServiceMock, useValue: invoiceServiceStub },
           ErrorDialogService
          ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test pageload()', () => {
    component.pageLoad();
 }); 
    




});
