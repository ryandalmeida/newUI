import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../app-routing.module';
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
import { Adal6HTTPService, Adal6Service } from 'adal-angular6';
import { SignaturePadModule } from 'angular2-signaturepad';

import { LoginComponent } from './login.component';
import { AuthenticationGuard } from '../common/guards/authentication-guard';
import { DonorHomeComponent } from '../donor/donor-home/donor-home.component';
import { ApproverHomeComponent } from '../approver/approver-home/approver-home.component';
import{LogoutComponent}from '../logout/logout.component';
import { DashboardComponent } from '../donor/dashboard/dashboard.component';
import {RecordLegalComponentDonor} from '../donor/record-legal-donor/record-legal-donor.component';
import { ApprovePledgeComponent } from '../approver/approve-pledge/approve-pledge.component';
import  {RecordLegalComponent} from '../approver/record-legal/record-legal.component';
import { ProcessInvoiceComponent } from '../donor/process-invoice/process-invoice.component';
import { ProcessPaymentComponent } from '../payment/process-payment/process-payment.component';
import { UserRoleComponent } from '../user-role/user-role.component';
import { InitiateArComponent } from '../approver/initiate-ar/initiate-ar.component';
import { GenerateBillingComponent } from '../approver/generate-billing/generate-billing.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, DonorHomeComponent, ApproverHomeComponent,
        LogoutComponent, DashboardComponent,
        RecordLegalComponentDonor,
        ApprovePledgeComponent,
        RecordLegalComponent,
        ProcessInvoiceComponent,
        ProcessPaymentComponent,
        UserRoleComponent,
        InitiateArComponent,
        GenerateBillingComponent ],
      imports : [AppRoutingModule,
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
        ReactiveFormsModule, 
        FormsModule,
        SignaturePadModule,
        MatRadioModule],
      providers: [AuthenticationGuard, Adal6Service, {
        provide: Adal6HTTPService,
        useFactory: Adal6HTTPService.factory,
        deps: [Adal6Service]
    }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
