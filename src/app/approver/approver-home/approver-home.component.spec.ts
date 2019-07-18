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
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApproverHomeComponent } from './approver-home.component';
import { ApprovePledgeComponent } from '../../approver/approve-pledge/approve-pledge.component';
import { RecordLegalComponent } from '../../approver/record-legal/record-legal.component';
import { PledgeService } from '../../services/pledge.service';
import { AccountreceivableComponent } from '../../approver/accountreceivable/accountreceivable.component';
import { GenerateBillingComponent } from '../../approver/generate-billing/generate-billing.component';
import { PagerService } from '../../services/pagerService.service'
import { MatchPaymentComponent } from '../../approver/match-payment/match-payment.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';

describe('ApproverHomeComponent', () => {
  let component: ApproverHomeComponent;
  let fixture: ComponentFixture<ApproverHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproverHomeComponent, 
                      ApprovePledgeComponent,
                      RecordLegalComponent,
                      AccountreceivableComponent, 
                      GenerateBillingComponent,
                      MatchPaymentComponent 
                    ],
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
          PledgeService,
          PagerService,
          ErrorDialogService,
          SortService,
          MsAdalAngular6Service,
          AuthenticationGuard
        ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
