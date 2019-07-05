import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavbarModule} from 'angular-bootstrap-md'
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
  MatRadioModule, 
  MatTooltipModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent, PledgeCreatedDialog } from './donor/dashboard/dashboard.component';
import { RecordLegalComponentDonor, LegalCreatedDialogDonor } from './donor/record-legal-donor/record-legal-donor.component';
import { PledgeService } from './services/pledge.service';
import { LegalService } from './services/legal.service';
import { DonorHomeComponent } from './donor/donor-home/donor-home.component';
import { TreasuryHomeComponent } from './treasury/treasury-home/treasury-home.component';
import { ApproverHomeComponent } from './approver/approver-home/approver-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ApprovePledgeComponent, ApproveDialog, RevisePledegDialog } from './approver/approve-pledge/approve-pledge.component';
import { RecordLegalComponent, LegalCreatedDialog } from './approver/record-legal/record-legal.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Http, HttpModule } from '@angular/http';
import { AccountreceivableComponent, AccountReceivableDialog } from './approver/accountreceivable/accountreceivable.component';
import { AccountreceivableService } from './services/accountreceivable.service';
import { UserRoleComponent } from './admin/user-role/user-role.component';
import { UserRoleService } from './services/userRole.service';
import { ProcessPaymentComponent } from './treasury/process-payment/process-payment.component';
import { ProcessPaymentDialog } from './treasury/process-payment/process-payment.component';
import { MatchPaymentComponent,MatchPaymentDialog } from './approver/match-payment/match-payment.component';
import { Ng2OrderModule } from 'ng2-order-pipe'; 
import { AuditLogDisplayComponent } from './admin/audit-logDisplay/audit-logDisplay.component';
import { AuditLogDisplayService } from './services/auditLogDisplay.service'; 
//import { PaymentService } from './services/payment.service';
import { PaymentService} from './services/payment.service'
import { ProcessInvoiceService } from './services/process-invoice.service'
import { ProcessInvoiceDialog } from './donor/process-invoice/process-invoice.component';
import { GenerateBillingComponent, BillCreatedDialog } from './approver/generate-billing/generate-billing.component';
import { BillingService } from './services/billing.service';
import { ProcessInvoiceComponent } from './donor/process-invoice/process-invoice.component';
import { PagerService } from './services/pagerService.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MsAdalAngular6Module ,MsAdalAngular6Service,AuthenticationGuard} from 'microsoft-adal-angular6';
//import { StorageServiceModule } from 'ngx-webstorage-service';
import {APP_INITIALIZER} from '@angular/core'
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthTokenInterceptor } from './helpers/authInterceptor';
import{AuthTokenService} from './services/authToken.service'
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ErrorDialogComponent } from './error-dialog/errordialog.component'
import { ErrorDialogService } from './error-dialog/errordialog.service';
import { HeaderComponent } from './header/header.component';
import { SortService } from 'src/app/services/sortService.service';
import { MatchPaymentService } from 'src/app/services/matchPayment.service';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    PledgeCreatedDialog,
    DashboardComponent,
    DonorHomeComponent,
    ApproverHomeComponent,
    TreasuryHomeComponent,
    AdminHomeComponent,
    ApprovePledgeComponent,
    ApproveDialog,
    ProcessPaymentDialog,
    RevisePledegDialog,
    RecordLegalComponent,
    LegalCreatedDialog,
    RecordLegalComponentDonor,
    LegalCreatedDialogDonor,
    AccountreceivableComponent,
    AccountReceivableDialog,
    UserRoleComponent,
    ProcessPaymentComponent,
    MatchPaymentComponent,
    GenerateBillingComponent,
    BillCreatedDialog,
    ProcessInvoiceComponent,
    ProcessInvoiceDialog,
    ErrorDialogComponent,
    AuditLogDisplayComponent,
    MatchPaymentDialog
  ],

  imports: [
    NavbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    SignaturePadModule,
    MatRadioModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    Ng2OrderModule,
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
  providers: [PledgeService,LegalService,UserRoleService,BillingService,
    ProcessInvoiceService,MsAdalAngular6Service,
    AuthenticationGuard,AccountreceivableService,AuditLogDisplayService,
    SortService,MatchPaymentService,
     PagerService,UserRoleService,PaymentService,AuthTokenService,ErrorDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    
      {provide: HTTP_INTERCEPTORS, 
        useClass: ErrorInterceptor,
        multi: true
      },
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [PledgeCreatedDialog, LegalCreatedDialog, 
    LegalCreatedDialogDonor, ApproveDialog,ProcessPaymentDialog,MatchPaymentDialog,
     BillCreatedDialog, ProcessInvoiceDialog, RevisePledegDialog,AccountReceivableDialog,ErrorDialogComponent
    ],
})
export class AppModule { }
