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
  MatCheckboxModule,
  MatRadioModule 
} from '@angular/material';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignaturePadModule } from 'angular2-signaturepad';
import { TreasuryHomeComponent } from './treasury-home.component';
import { DashboardComponent } from '../../donor/dashboard/dashboard.component';
import { RecordLegalComponentDonor } from '../../donor/record-legal-donor/record-legal-donor.component';
import { PledgeService } from '../../services/pledge.service';
import { ProcessPaymentComponent } from '../process-payment/process-payment.component';
import { UserRoleComponent } from '../../admin/user-role/user-role.component';
import { ProcessInvoiceComponent } from '../../donor/process-invoice/process-invoice.component';
import { PagerService } from '../../services/pagerService.service';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { PaymentService } from '../../services/payment.service';

describe('TreasuryHomeComponent', () => {
  let component: TreasuryHomeComponent;
  let fixture: ComponentFixture<TreasuryHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TreasuryHomeComponent, 
        DashboardComponent, 
        RecordLegalComponentDonor, 
        ProcessPaymentComponent, 
        UserRoleComponent, 
        ProcessInvoiceComponent 
      ],
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
        MatRadioModule,
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
            cacheLocation: 'sessionStorage'
          }
        ) 
      ],
      providers: [
        PledgeService,
        PagerService,
        MsAdalAngular6Service,
        AuthenticationGuard,
        Ng4LoadingSpinnerModule,
        SortService,
        ErrorDialogService,
        PaymentService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openProcessPayment', () => {
    component.openProcessPayment();
    component.header = "PAYMENT VIEW";
    expect(component.isMatchPaymentClicked).toEqual(true);
  });

});
  