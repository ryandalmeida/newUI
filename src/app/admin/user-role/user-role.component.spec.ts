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
  MatRadioButton,
  MatRadioModule,
  MatCheckboxModule
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { UserRoleComponent } from './user-role.component';
import { Observable, of } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { UserRoleService } from 'src/app/services/userRole.service';
import { PagerService } from 'src/app/services/pagerService.service';
import { ErrorDialogService } from 'src/app/error-dialog/errordialog.service';
import { SortService } from 'src/app/services/sortService.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ErrorDialogComponent } from 'src/app/error-dialog/errordialog.component';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';

describe('UserRoleComponent', () => {
  let component: UserRoleComponent;
  let fixture: ComponentFixture<UserRoleComponent>;

  const userRoleServiceStub = {
    userRoleServiceSearchUsernameSuccessResponse : {
      error:false,
      data: {
        userName : "SAKSHI KUMAR",
        firstName : "SAKSHI",
        lastName: "KUMAR",
        role : [{0 :
          {
          role :["DONOR", "ADMIN", "APPROVER", "TREASURY"]
          }
        }] 
      }
     }, 
    userRoleServiceSearchUsernameErrorResponse: {
      errorMessage: 'Record not found'
    },
    userRoleServiceUpdateRolesSuccessResponse : {
      error:false,
      data:[{0: ["Role updated for SAKSHI KUMAR"]}]
    }, 
    userRoleServiceUpdateRolesErrorResponse: {
      errorMessage: 'Record not found'
    }
  }

  class UserRoleServiceMock{
    public searchUserName() : Observable<any> {
      if(userRoleServiceStub.userRoleServiceSearchUsernameSuccessResponse.error){
        return _throw(userRoleServiceStub.userRoleServiceSearchUsernameErrorResponse.errorMessage)
      }
      return of(userRoleServiceStub.userRoleServiceSearchUsernameSuccessResponse.data);
    }

    public updateUserRole() : Observable<any> {
      if(userRoleServiceStub.userRoleServiceUpdateRolesSuccessResponse.error){
        return _throw(userRoleServiceStub.userRoleServiceUpdateRolesErrorResponse.errorMessage)
      }
      return of(userRoleServiceStub.userRoleServiceUpdateRolesSuccessResponse.data);
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
        MatRadioModule,
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
            cacheLocation: 'sessionStorage'
          }
        ) 
    ],
      declarations: [ UserRoleComponent, SuccessDialogComponent ],
      providers: [
        { provide: UserRoleService, useClass: UserRoleServiceMock, useValue: userRoleServiceStub},
        PagerService,
        SortService,
        ErrorDialogService,
        MsAdalAngular6Service,
        AuthenticationGuard,
      ]
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [SuccessDialogComponent]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test searchUserName()', () => {
    component.searchUserName();
  });

  it('should test searchUserName() : error', () => {
    userRoleServiceStub.userRoleServiceSearchUsernameSuccessResponse.error = true;
    component.searchUserName();
  });

  it('should test updateRoles()', () => {
    component.updateRoles();
  });

  it('should test updateRoles() : error', () => {
    userRoleServiceStub.userRoleServiceUpdateRolesSuccessResponse.error = true;
    component.updateRoles();
  });


});
