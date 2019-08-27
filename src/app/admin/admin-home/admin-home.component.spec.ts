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
import { AuditLogDisplayComponent } from '../audit-logDisplay/audit-logDisplay.component';
import { AdminHomeComponent } from './admin-home.component';
import { ApprovePledgeComponent } from '../../approver/approve-pledge/approve-pledge.component';
import { RecordLegalComponent } from '../../approver/record-legal/record-legal.component';
import { UserRoleComponent } from '../user-role/user-role.component';
import { GenerateBillingComponent } from '../../approver/generate-billing/generate-billing.component';
import { PagerService } from '../../services/pagerService.service';
import { UserRoleService } from '../../services/userRole.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';

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
          PagerService,
          UserRoleService]
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

  it('should test openUserRole()', () => {
    component.openUserRole();
    component.header = "USER ROLE";
    expect(component.isUserRoleClicked).toEqual(true);
    expect(component.isAuditLogDisplayClicked).toEqual(false);
  });

  it('should test openAuditLogDisplay()', () => {
    component.openAuditLogDisplay();
    component.header = "AUDIT LOG";
    expect(component.isUserRoleClicked).toEqual(false);
    expect(component.isAuditLogDisplayClicked).toEqual(true);
  });
});
