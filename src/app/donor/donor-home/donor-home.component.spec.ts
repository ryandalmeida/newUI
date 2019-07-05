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
import { Adal6HTTPService, Adal6Service } from 'adal-angular6';

import { DonorHomeComponent } from './donor-home.component';
import { DashboardComponent } from '../../donor/dashboard/dashboard.component';
import { RecordLegalComponentDonor } from '../../donor/record-legal-donor/record-legal-donor.component';
import { PledgeService } from '../../services/pledge.service';
import { ProcessPaymentComponent } from '../../treasury/process-payment/process-payment.component';
import { UserRoleComponent } from '../../admin/user-role/user-role.component';
import { ProcessInvoiceComponent } from '../../donor/process-invoice/process-invoice.component';
import { PagerService } from '../../services/pagerService.service';

describe('DonorHomeComponent', () => {
  let component: DonorHomeComponent;
  let fixture: ComponentFixture<DonorHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorHomeComponent, DashboardComponent, 
               RecordLegalComponentDonor, ProcessPaymentComponent, UserRoleComponent, ProcessInvoiceComponent ],
      imports: [MatToolbarModule,
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
  MatRadioModule 
      ],
      providers: [PledgeService,PagerService,Adal6Service, {
        provide: Adal6HTTPService,
        useFactory: Adal6HTTPService.factory,
        deps: [Adal6Service]
    },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
