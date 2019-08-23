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
  MatSortModule 
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


import { InitiatePledgeComponent } from './initiate-pledge.component';
import { PledgeData} from '../../models/pledge.model';

describe('InitiatePledgeComponent', () => {
  let component: InitiatePledgeComponent;
  let fixture: ComponentFixture<InitiatePledgeComponent>;

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
BrowserAnimationsModule 
    ],
      declarations: [ InitiatePledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiatePledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('country field validity', () => {
    let email = component.registerForm.controls['country']; 
    expect(email.valid).toBeFalsy(); 
  });

  it('submitting a form', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['country'].setValue("United States");
   // component.registerForm.controls['password'].setValue("123456789");
    expect(component.registerForm.valid).toBeFalsy();

    let user: PledgeData;
    // Subscribe to the Observable and store the user in a local variable.
    //component.loggedIn.subscribe((value) => user = value);

    // Trigger the login function
    component.onSubmit();

    // Now we can check to make sure the emitted value is correct
    //expect(user.country).toBe("United States");
    //expect(user.password).toBe("123456789");
});


});
 