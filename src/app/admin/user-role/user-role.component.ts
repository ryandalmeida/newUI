import { Component, OnInit,  } from '@angular/core';
import {FormGroup,  FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UserRoleService } from 'src/app/services/userRole.service'
import { HttpErrorResponse } from '@angular/common/http';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})

export class UserRoleComponent implements OnInit {
  userRoleForm: FormGroup;
  updateRoleForm: FormGroup;
  submitted = false;
  name = '';
  roles: any[] = [];
  LabelAlign: string = null;
  private allItems: any[];
  username:string;
  userName:string;
  fname: string;
  lname: string;
  admin_checked: boolean = false;
  donor_checked: boolean = false;
  approver_checked: boolean = false;
  treasury_checked: boolean = false;
  constructor(private userRoleService: UserRoleService, public dialog: MatDialog, private formBuilder: FormBuilder, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.userRoleForm = this.formBuilder.group({
      emailId: [''],
    });

    this.updateRoleForm = this.formBuilder.group({
      userName: [''],
      donor: [''],
      approver: [''],
      treasury: [''],
      admin: ['']
    })

    this.updateRoleForm.disable();
  }

  resetForm(){
    this.updateRoleForm.reset();
    this.updateRoleForm.disable();
  }

  searchUserName() {
    this.roles = [];
    var obj = this.userRoleForm.value;
    this.spinnerService.show();
    console.log("obj", obj)
    this.userRoleService.searchUserName(obj).subscribe(response => {
      console.log("search....", response, typeof (response));
      this.spinnerService.hide();
      this.fname = response.firstName.charAt(0).toUpperCase();
      this.lname = response.lastName.charAt(0).toUpperCase();
      this.username = this.fname.concat(' ').concat(this.lname);
      //this.username =  response.userName.charAt(0).toUpperCase() + response.userName.substr(1).toLowerCase();
      this.userName = response.userName;
      this.updateRoleForm.controls['donor'].enable();
      this.updateRoleForm.controls['approver'].enable();
      this.updateRoleForm.controls['treasury'].enable();
      this.updateRoleForm.controls['admin'].enable();
      for (var index = 0; index < response.role.length; index++) {
        this.roles.push(response.role[index].role)
      }
      if (this.roles.includes("DONOR")) {
        this.donor_checked = true;
      }
      if (this.roles.includes("APPROVER")) {
        this.approver_checked = true;
      }
      if (this.roles.includes("TREASURY")) {
        this.treasury_checked = true;
      }
      if (this.roles.includes("ADMIN")) {
        this.admin_checked = true;
      }
      console.log("this.roles", this.roles);
    },(err: HttpErrorResponse) => {
      console.log("Error", err);
      this.spinnerService.hide();
    })
  }

  updateRoles() {
    this.roles = [];
    this.spinnerService.show();
    var obj = this.updateRoleForm.value;
    if (this.updateRoleForm.value.admin == true) {
      this.roles.push("ADMIN")
    }
    if (this.updateRoleForm.value.approver == true) {
      this.roles.push("APPROVER")
    }
    if (this.updateRoleForm.value.donor == true) {
      this.roles.push("DONOR")
    }
    if (this.updateRoleForm.value.treasury == true) {
      this.roles.push("TREASURY")
    }
    var roleobject = {
      userName: this.userName,
      role: this.roles
    }
    console.log("obj updateRoleForm", obj, roleobject);

    this.userRoleService.updateUserRole(roleobject).subscribe((data:any) => {
      console.log("res", data[0]);
      this.spinnerService.hide();
      var dialogData = {
        "header": "Role Added",
        "data": data[0]
      }
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
        height: '220px',
        width: '325px',
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
        console.log('The dialog was closed');
      });
    } ,(err: HttpErrorResponse) => {
      console.log("Error", err);
      this.spinnerService.hide();
    } );
  }

}


