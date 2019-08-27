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
import { AuditLogDisplayComponent } from './audit-logDisplay.component';
import { Observable, of } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { AuditLogDisplayService } from 'src/app/services/auditLogDisplay.service';
import { PagerService } from 'src/app/services/pagerService.service';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from 'src/app/error-dialog/errordialog.service';
import { ErrorDialogComponent } from 'src/app/error-dialog/errordialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('AuditLogDisplayComponent', () => {
  let component: AuditLogDisplayComponent;
  let fixture: ComponentFixture<AuditLogDisplayComponent>;
  let errorDialogService: ErrorDialogService;

  const auditLogServiceStub = {
    auditLogServicePageloadSuccessResponseAzure : {
      error:false,
      data: [{
        audit_log_id: 1,
        action: "READ",
        content: [{}],
        modifiedBy: "SAKSHI KUMAR",
        modifiedDate: "2019-07-13"
      },
      {
        audit_log_id: 2,
        action: "READ",
        content: [{}],
        modifiedBy: "SAKSHI KUMAR",
        modifiedDate: "2019-07-13"
      }]
    }, 
    auditLogServicePageloadSuccessResponseAWS : {
      error:false,
      isData : true,
      data:[{
        audit_log_id: 1,
        action: "READ",
        content: [{}],
        modifiedBy: "SAKSHI KUMAR",
        modifiedDate: "2019-07-13"
      },
      {
        audit_log_id: 2,
        action: "READ",
        content: [{}],
        modifiedBy: "SAKSHI KUMAR",
        modifiedDate: "2019-07-13"
      }]
    },
    auditLogServicePageloadErrorResponse: {
      errorMessage: 'Record not found'
    },
    auditLogServiceSearchSuccessResponse : {
      error:false,
      data:[{
        audit_log_id: 2,
        action: "READ",
        content: [{}],
        modifiedBy: "SAKSHI KUMAR",
        modifiedDate: "2019-07-13"
      }]
    }, 
    auditLogServiceSearchErrorResponse: {
      errorMessage: 'Record not found'
    }
  }

  class AuditLogServiceMock{
    public getAllAuditLogAzure() : Observable<any> {
      if(auditLogServiceStub.auditLogServicePageloadSuccessResponseAzure.error){
        return _throw(auditLogServiceStub.auditLogServicePageloadErrorResponse.errorMessage)
      }
      return of(auditLogServiceStub.auditLogServicePageloadSuccessResponseAzure.data);
    }

    public getAllAuditLogAWS() : Observable<any> {
      if(auditLogServiceStub.auditLogServicePageloadSuccessResponseAWS.error){
        return _throw(auditLogServiceStub.auditLogServicePageloadErrorResponse.errorMessage)
      }
      return of(auditLogServiceStub.auditLogServicePageloadSuccessResponseAWS.data);
    }

    public searchAuditLogData() : Observable<any> {
      if(auditLogServiceStub.auditLogServiceSearchSuccessResponse.error){
        return _throw(auditLogServiceStub.auditLogServiceSearchErrorResponse.errorMessage)
      }
      return of(auditLogServiceStub.auditLogServiceSearchSuccessResponse.data);
    }
  }

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
      declarations: [ AuditLogDisplayComponent, ErrorDialogComponent ],
      providers: [
        { provide: AuditLogDisplayService, useClass: AuditLogServiceMock, useValue: auditLogServiceStub},
        PagerService,
        SortService,
        ErrorDialogService,
        MsAdalAngular6Service,
        AuthenticationGuard,
      ]
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ErrorDialogComponent]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    errorDialogService = TestBed.get(ErrorDialogService);
  });

  it('should test pageload() : Azure & AWS', () => {
    component.pageLoad();
  }); 

  it('should test pageload() : no Azure &  only AWS', () => {
    auditLogServiceStub.auditLogServicePageloadSuccessResponseAzure.data = null;
    component.pageLoad();
    errorDialogService.dialog.closeAll();
  });  

  it('should test pageload() : only Azure &  no AWS', () => {
    auditLogServiceStub.auditLogServicePageloadSuccessResponseAzure.data = [{
      audit_log_id: 2,
      action: "READ",
      content: [{}],
      modifiedBy: "SAKSHI KUMAR",
      modifiedDate: "2019-07-13"
    }]
    auditLogServiceStub.auditLogServicePageloadSuccessResponseAWS.data = null;
    component.pageLoad();
    errorDialogService.dialog.closeAll();
  }); 

  it('should test pageload() : error (azure & error in AWS)', () => {
    auditLogServiceStub.auditLogServicePageloadSuccessResponseAWS.error = true;
    component.pageLoad();
    errorDialogService.openDialog('Record not found');
    errorDialogService.dialog.closeAll();
  });

  it('should test pageload() : error ( no azure & error in AWS)', () => {
    auditLogServiceStub.auditLogServicePageloadSuccessResponseAzure.data = null;
    auditLogServiceStub.auditLogServicePageloadSuccessResponseAWS.error = true;
    component.pageLoad();
    errorDialogService.openDialog('Record not found');
    errorDialogService.dialog.closeAll();
  });

  it('should test pageload() : error (no azure & no AWS)', () => {
    auditLogServiceStub.auditLogServicePageloadSuccessResponseAzure.error = true;
    component.pageLoad();
    errorDialogService.openDialog('Record not found');
    errorDialogService.dialog.closeAll();
  });

  it('should test searchAuditLog()', () => {
    component.searchAuditLog();
    errorDialogService.dialog.closeAll();
  });

  it('should test searchAuditLog(): error', () => {
    auditLogServiceStub.auditLogServiceSearchSuccessResponse.error = true;
    component.searchAuditLog();
    errorDialogService.dialog.closeAll();
  });

  it('should test cancelSearch', () => {
    component.cancelSearch();
    errorDialogService.dialog.closeAll();
  });

});
