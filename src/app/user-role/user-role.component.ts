import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpParams  } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup, MatTableDataSource } from '@angular/material';
//import { Adal6Service } from 'adal-angular6';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})

export class UserRoleComponent implements OnInit {
  userRoleForm = new FormGroup({
    employeeId: new FormControl(),
    employeeName: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    role: new FormControl(),
  });

  /*userRoleForm: FormGroup;*/ 
  submitted = false;
  ename = '';
  constructor(private http: HttpClient, public dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userRoleForm = this.formBuilder.group({
      employeeId:  ['', Validators.required],
      employeeName:  ['', Validators.required],
      startDate:  ['', Validators.required],
      endDate:  ['', Validators.required],
      role:  ['', Validators.required]
    });
  }

  get f() { return this.userRoleForm.controls; }
  
   /*searchUserRole() is method for searching the role of users*/ 
  searchUserRole(employeeId) {
    
    console.log("EMP ID "+this.userRoleForm.value.employeeId);
    // console.log("emp ID "+employeeId);
    var obj =  { employeeId: `${this.userRoleForm.value.employeeId}` };
    this.http.post('http://localhost:8000/userRole/searchUserName', obj)
        .subscribe((response:any) => {

        this.ename = response.employeeName;
         
         console.log(this.ename);
         console.log(response);
        });

        this.submitted = true;
        if (this.userRoleForm.invalid) {
          return;
        }
   }

    /*submitUserRole() is method for submitting the role of users*/ 
  submitUserRole() {
    console.log(this.userRoleForm.value);
    var myPostObject = this.userRoleForm.value;
    
    this.http.post('http://localhost:8000/userRole/updateUserRole', myPostObject)
        .subscribe(response => {
        console.log(response);
        });
        this.submitted = true;
        if (this.userRoleForm.invalid) {
          return;
        }
    
    this.userRoleForm.reset();
  }
}




