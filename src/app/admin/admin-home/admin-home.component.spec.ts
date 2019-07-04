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
import { Adal6HTTPService, Adal6Service } from 'adal-angular6';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuditLogDisplayComponent } from '../audit-logDisplay/audit-logDisplay.component';
import { AdminHomeComponent } from './admin-home.component';
import { ApprovePledgeComponent } from '../../approver/approve-pledge/approve-pledge.component';
import  {RecordLegalComponent} from '../../approver/record-legal/record-legal.component';
import { PledgeService } from '../../services/pledge.service';
import { UserRoleComponent } from '../user-role/user-role.component';
import { GenerateBillingComponent } from '../../approver/generate-billing/generate-billing.component';
import { PagerService } from '../../services/pagerService.service'

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHomeComponent, ApprovePledgeComponent,
        RecordLegalComponent,  GenerateBillingComponent, UserRoleComponent, AuditLogDisplayComponent ],
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
        MatDialogModule 
        ],
        providers: [PledgeService,PagerService, Adal6Service, {
          provide: Adal6HTTPService,
          useFactory: Adal6HTTPService.factory,
          deps: [Adal6Service]
      },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
