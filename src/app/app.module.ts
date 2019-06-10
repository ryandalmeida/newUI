import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { ApproverHomeComponent } from './approver/approver-home/approver-home.component';
import { ApprovePledgeComponent, ApproveDialog, RevisePledegDialog } from './approver/approve-pledge/approve-pledge.component';
import { RecordLegalComponent, LegalCreatedDialog } from './approver/record-legal/record-legal.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
//import { Adal6HTTPService, Adal6Service } from 'adal-angular6';
//import { AuthenticationGuard } from './common/guards/authentication-guard';
import { Http, HttpModule } from '@angular/http';
//import { ARService } from './services/AR.service';
import { AccountreceivableComponent, AccountReceivableDialog } from './approver/accountreceivable/accountreceivable.component';
import { AccountreceivableService } from './services/accountreceivable.service';
//import { InitiateArComponent, InitiateARDialog } from './approver/initiate-ar/initiate-ar.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserRoleService } from './services/userRole.service';
import { ProcessPaymentComponent } from './payment/process-payment/process-payment.component';
//import { PaymentService } from './services/payment.service';
import { ProcessInvoiceService } from './services/process-invoice.service'
import { ProcessInvoiceDialog } from './donor/process-invoice/process-invoice.component';
import { GenerateBillingComponent, BillCreatedDialog } from './approver/generate-billing/generate-billing.component';
import { BillingService } from './services/billing.service';
import { ProcessInvoiceComponent } from './donor/process-invoice/process-invoice.component';
import { PagerService } from './services/pagerService.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MsAdalAngular6Module ,MsAdalAngular6Service,AuthenticationGuard} from 'microsoft-adal-angular6';
import {APP_INITIALIZER} from '@angular/core'
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import{InsertAuthTokenInterceptor} from './insert-auth-token-interceptor'

@NgModule({
  declarations: [
    AppComponent,
    PledgeCreatedDialog,
    DashboardComponent,
    DonorHomeComponent,
    ApproverHomeComponent,
    ApprovePledgeComponent,
    ApproveDialog,
    RevisePledegDialog,
    RecordLegalComponent,
    LegalCreatedDialog,
    RecordLegalComponentDonor,
    LegalCreatedDialogDonor,
    LoginComponent,
    LogoutComponent,
    AccountreceivableComponent,
    AccountReceivableDialog,
    UserRoleComponent,
    ProcessPaymentComponent,
    GenerateBillingComponent,
    BillCreatedDialog,
    ProcessInvoiceComponent,
    ProcessInvoiceDialog,
    
  ],

  imports: [
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
    Ng4LoadingSpinnerModule.forRoot(),
   
    MsAdalAngular6Module.forRoot(
      {
      
           tenant:'02aa9fc1-18bc-4798-a020-e01c854dd434',
          clientId:'b0f49dbf-f119-4483-9850-1c47b19235a5',

        redirectUri: window.location.origin,
        endpoints: {

          'https://wbg-bpm-apim.azure-api.net': 'b0f49dbf-f119-4483-9850-1c47b19235a5',

         'api':'b0f49dbf-f119-4483-9850-1c47b19235a5'
  
        },
        navigateToLoginRequestUrl: false,
        cacheLocation: 'D:'
      }
    )
  ],
  providers: [PledgeService,LegalService,UserRoleService,BillingService,
    ProcessInvoiceService,MsAdalAngular6Service,
    AuthenticationGuard,AccountreceivableService,
    PagerService
  ],

  bootstrap: [AppComponent],
  entryComponents: [PledgeCreatedDialog, LegalCreatedDialog, 
    LegalCreatedDialogDonor, ApproveDialog,
     BillCreatedDialog, ProcessInvoiceDialog, RevisePledegDialog,AccountReceivableDialog
    ],
})
export class AppModule { }
