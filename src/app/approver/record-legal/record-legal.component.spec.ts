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

describe('RecordLegalComponent', () => {
  let component: RecordLegalComponent;
  let fixture: ComponentFixture<RecordLegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecordLegalComponent],
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
            LegalService,
            PagerService, 
            ErrorDialogService,
            SortService,
            MsAdalAngular6Service,
            AuthenticationGuard
          ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
      expect(headerRow.childNodes[1].innerText).toEqual("PLEDGE ID")
      expect(headerRow.childNodes[2].innerText).toEqual("PROGRAM NAME")
      expect(headerRow.childNodes[3].innerText).toEqual("FUND TYPE")
      expect(headerRow.childNodes[4].innerText).toEqual("DONOR NAME")
      expect(headerRow.childNodes[5].innerText).toEqual("COUNTRY")
      expect(headerRow.childNodes[6].innerText).toEqual("AMOUNT ($)")
      expect(headerRow.childNodes[7].innerText).toEqual("APPROVER")
      expect(headerRow.childNodes[8].innerText).toEqual("START DATE")
      expect(headerRow.childNodes[9].innerText).toEqual("END DATE")
      expect(headerRow.childNodes[10].innerText).toEqual("STATUS")
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
 