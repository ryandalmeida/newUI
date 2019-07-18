/* import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  MatRadioButton
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { UserRoleComponent } from './user-role.component';

describe('UserRoleComponent', () => {
  let component: UserRoleComponent;
  let fixture: ComponentFixture<UserRoleComponent>;

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
        MatRadioButton
    ],
      declarations: [ UserRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });


  it('form invalid when empty', () => {
    expect(component.userRoleForm.valid).toBeFalsy();
  });

  it('email Id field validity', () => {
    let employeeId = component.userRoleForm.controls['emailId']; 
    expect(employeeId.valid).toBeFalsy(); 
  });

  it('startDate field validity', () => {
    let startDate = component.userRoleForm.controls['startDate']; 
    expect(startDate.valid).toBeFalsy(); 
  });

  it('endDate field validity', () => {
    let endDate = component.userRoleForm.controls['endDate']; 
    expect(endDate.valid).toBeFalsy(); 
  });

  it('value1 field validity', () => {
    let value1 = component.userRoleForm.controls['value1']; 
    expect(value1.valid).toBeFalsy(); 
  });

  it('value2 field validity', () => {
    let value2 = component.userRoleForm.controls['value2']; 
    expect(value2.valid).toBeFalsy(); 
  });

  it('value3 field validity', () => {
    let value3 = component.userRoleForm.controls['value3']; 
    expect(value3.valid).toBeFalsy(); 
  });

  it('value4 field validity', () => {
    let value4 = component.userRoleForm.controls['value4']; 
    expect(value4.valid).toBeFalsy(); 
  });

  it('submitting a form', () => {

    expect(component.userRoleForm.valid).toBeFalsy();

    component.userRoleForm.controls['emailId'].setValue("xyz@lnt.com");
    component.userRoleForm.controls['startDate'].setValue("2019-06-06");
    component.userRoleForm.controls['endDate'].setValue("2019-06-14");
    component.userRoleForm.controls['role1'].setValue("WBG BUSINESS USER");
    component.userRoleForm.controls['role2'].setValue("WBG BUSINESS APPROVER");
    component.userRoleForm.controls['role3'].setValue("DONOR");
    component.userRoleForm.controls['role4'].setValue("WBG TREASURY");

    expect(component.userRoleForm.valid).toBeFalsy();
    
    // Subscribe to the Observable and store the user in a local variable.
    // component.loggedIn.subscribe((value) => user = value);

    // Trigger the login function
    // component.userRoleSubmit();

    // Now we can check to make sure the emitted value is correct
     expect(component.userRoleForm.value.emailId).toBe("xyz@lnt.com");
     expect(component.userRoleForm.value.startDate).toBe("2019-06-06");
     expect(component.userRoleForm.value.endDate).toBe("2019-06-14");
     expect(component.userRoleForm.value.role1).toBe("WBG BUSINESS USER");
     expect(component.userRoleForm.value.role2).toBe("WBG BUSINESS APPROVER");
     expect(component.userRoleForm.value.role3).toBe("DONOR");
     expect(component.userRoleForm.value.role4).toBe("WBG TREASURY");
   
});

});
  */