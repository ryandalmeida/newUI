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
  MatSortModule,
  MatCheckboxModule 
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatchPaymentComponent } from './match-payment.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { MatchPaymentService } from 'src/app/services/matchPayment.service';
import { PagerService } from '../../services/pagerService.service'
describe('MatchPaymentComponent', () => {
  let component: MatchPaymentComponent;
  let fixture: ComponentFixture<MatchPaymentComponent>;

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
      declarations: [ MatchPaymentComponent ],
      providers:[ErrorDialogService,
        SortService,
        MsAdalAngular6Service,
        AuthenticationGuard,
        MatchPaymentService,
        PagerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    let pledgeFundType = component.searchForm.controls['pledgeFundType']; 
    expect(pledgeFundType.valid).toBeTruthy(); 
  });

  it('search form : Country field validity', () => {
    let programName = component.searchForm.controls['programName']; 
    expect(programName.valid).toBeTruthy(); 
  });

  it('search form : Credit Amountfield validity', () => {
    let amount = component.searchForm.controls['amount']; 
    expect(amount.valid).toBeTruthy(); 
  });

  it('search form : Debit Amount field validity', () => {
    let endDate = component.searchForm.controls['endDate']; 
    expect(endDate.valid).toBeTruthy(); 
  });

  it('search form : InstallmentNo field validity', () => {
    let startDate = component.searchForm.controls['startDate']; 
    expect(startDate.valid).toBeTruthy(); 
  });

  it('should test table', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRow = fixture.nativeElement.querySelectorAll('mat-header-row');
      let headerRow = tableRow[0];
      expect(headerRow.childNodes[1].innerText).toEqual("")
      expect(headerRow.childNodes[2].innerText).toEqual("PLEDGE ID")
      expect(headerRow.childNodes[3].innerText).toEqual("INVOICE ID")
      expect(headerRow.childNodes[4].innerText).toEqual("DONOR NAME")
      expect(headerRow.childNodes[5].innerText).toEqual("AR NO.")
      expect(headerRow.childNodes[6].innerText).toEqual("CREDIT ($)")
      expect(headerRow.childNodes[7].innerText).toEqual("COUNTRY")
      expect(headerRow.childNodes[8].innerText).toEqual("INSTALLMENT")
      expect(headerRow.childNodes[9].innerText).toEqual("END DATE")
      expect(headerRow.childNodes[10].innerText).toEqual("STATUS")
      done();
    });
  });

});
