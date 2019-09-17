import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavbarModule } from 'angular-bootstrap-md'
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
  MatProgressSpinnerModule,
  MatDatepickerModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthTokenInterceptor } from './helpers/authInterceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { DonorHomeComponent } from './donor/donor-home/donor-home.component';
import { ApproverHomeComponent } from './approver/approver-home/approver-home.component';
import { TreasuryHomeComponent } from './treasury/treasury-home/treasury-home.component';
import { DashboardComponent } from './donor/dashboard/dashboard.component';
import { ApprovePledgeComponent } from './approver/approve-pledge/approve-pledge.component';
import { RecordLegalComponentDonor } from './donor/record-legal-donor/record-legal-donor.component';
import { RecordLegalComponent } from './approver/record-legal/record-legal.component';
import { AccountreceivableComponent } from './approver/accountreceivable/accountreceivable.component';
import { GenerateBillingComponent } from './approver/generate-billing/generate-billing.component';
import { ProcessInvoiceComponent } from './donor/process-invoice/process-invoice.component';
import { ProcessPaymentComponent } from './treasury/process-payment/process-payment.component';
import { MatchPaymentComponent } from './approver/match-payment/match-payment.component';
import { UserRoleComponent } from './admin/user-role/user-role.component';
import { AuditLogDisplayComponent } from './admin/audit-logDisplay/audit-logDisplay.component';
import { HeaderComponent } from './header/header.component';
import { SuccessDialogComponent } from './common/success-dialog/successDialog.component';
import { ErrorDialogComponent } from './error-dialog/errordialog.component';
import { PledgeService } from './services/pledge.service';
import { LegalService } from './services/legal.service';
import { AccountreceivableService } from './services/accountreceivable.service';
import { BillingService } from './services/billing.service';
import { ProcessInvoiceService } from './services/process-invoice.service';
import { PaymentService } from './services/payment.service';
import { MatchPaymentService } from 'src/app/services/matchPayment.service';
import { UserRoleService } from './services/userRole.service';
import { AuditLogDisplayService } from './services/auditLogDisplay.service';
import { PagerService } from './services/pagerService.service';
import { SortService } from 'src/app/services/sortService.service';
import { AuthTokenService } from './services/authToken.service';
import { ErrorDialogService } from './error-dialog/errordialog.service';
import { ControlMessagesComponent } from './common/control-messages.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    DashboardComponent,
    DonorHomeComponent,
    ApproverHomeComponent,
    TreasuryHomeComponent,
    AdminHomeComponent,
    ApprovePledgeComponent,
    SuccessDialogComponent,
    RecordLegalComponent,
    RecordLegalComponentDonor,
    AccountreceivableComponent,
    UserRoleComponent,
    ProcessPaymentComponent,
    MatchPaymentComponent,
    GenerateBillingComponent,
    ProcessInvoiceComponent,
    ErrorDialogComponent,
    AuditLogDisplayComponent,
    ControlMessagesComponent
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
    MatDatepickerModule,
    Ng4LoadingSpinnerModule.forRoot(),
    MsAdalAngular6Module.forRoot(
      {
        instance: 'https://wbstss.worldbank.org/', 
        tenant: 'adfs',
        clientId: 'aab07566-64b5-4ad7-a180-4dc881196361',
        redirectUri: window.location.origin,
        endpoints: {
         
        },
        navigateToLoginRequestUrl: false,
        cacheLocation: 'sessionStorage'
      }
    )
  ],
  providers: [
    PledgeService,
    LegalService,
    UserRoleService,
    BillingService,
    ProcessInvoiceService,
    MsAdalAngular6Service,
    AuthenticationGuard,
    AccountreceivableService,
    AuditLogDisplayService,
    SortService,
    MatchPaymentService,
    PagerService,
    UserRoleService,
    PaymentService,
    AuthTokenService,
    ErrorDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent
  ],
})
export class AppModule { }
