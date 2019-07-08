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

describe('AuditLogDisplayComponent', () => {
  let component: AuditLogDisplayComponent;
  let fixture: ComponentFixture<AuditLogDisplayComponent>;

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
        MatCheckboxModule 
    ],
      declarations: [ AuditLogDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
  it('form invalid when empty', () => {
    expect(component.searchForm.valid).toBeFalsy();
  });

  
  it('Audit Log Id field validity', () => {
    let auditLogId = component.searchForm.controls['auditLogId']; 
    expect(auditLogId.valid).toBeFalsy(); 
  });

  it('Action field validity', () => {
    let action = component.searchForm.controls['action']; 
    expect(action.valid).toBeFalsy(); 
  });

  it('content field validity', () => {
    let content = component.searchForm.controls['content']; 
    expect(content.valid).toBeFalsy(); 
  });

  it('Modified By field validity', () => {
    let modifiedBy = component.searchForm.controls['modifiedBy']; 
    expect(modifiedBy.valid).toBeFalsy(); 
  });

  it('Modified Date field validity', () => {
    let modifiedDate = component.searchForm.controls['modifiedDate']; 
    expect(modifiedDate.valid).toBeFalsy(); 
  });

it('submitting a form', () => {

    expect(component.searchForm.valid).toBeFalsy();
        
    component.searchForm.controls['auditLogId'].setValue(1);
    component.searchForm.controls['action'].setValue("Select");
    component.searchForm.controls['content'].setValue("Select Content");
    component.searchForm.controls['modifiedBy'].setValue("xyz");
    component.searchForm.controls['modifiedDate'].setValue("2019-09-09");
    
    expect(component.searchForm.valid).toBeFalsy();
    
    // Trigger the login function
   //  component.completed();

     // Now we can check to make sure the emitted value is correct
     expect(component.searchForm.value.auditLogId).toBe(1);
     expect(component.searchForm.value.action).toBe("Select");
     expect(component.searchForm.value.content).toBe("Select Content");
     expect(component.searchForm.value.modifiedBy).toBe("xyz");
     expect(component.searchForm.value.modifiedDate).toBe("2019-09-09");
    
});
});
