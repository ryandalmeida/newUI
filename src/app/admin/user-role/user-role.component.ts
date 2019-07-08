import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpParams  } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabGroup, MatTableDataSource } from '@angular/material';
//import { Adal6Service } from 'adal-angular6';
import{UserRoleService} from 'src/app/services/userRole.service'

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})

export class UserRoleComponent implements OnInit {
    userRoleForm = new FormGroup({
    roleId: new FormControl(),
    userId: new FormControl(),
    userName: new FormControl(),
    emailId: new FormControl(),
    name: new FormControl(),
    endDate: new FormControl(),
    role1: new FormControl(),
    role2: new FormControl(),
    role3: new FormControl(),
    role4: new FormControl(),
  });

  /*userRoleForm: FormGroup;*/ 
  submitted = false;
  name='';
  LabelAlign:string = null;
  private allItems: any[];
  username;
  constructor(private userRoleService: UserRoleService,private http: HttpClient, public dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userRoleForm = this.formBuilder.group({
      roleId:  ['', Validators.required],
      userId:  ['', Validators.required],
      emailId:  ['', Validators.required],
      userName:  ['', Validators.required],
      name:  ['', Validators.required],
      startDate:  ['', Validators.required],
      endDate:  ['', Validators.required],
      role1:  ['', Validators.required],
      role2:  ['', Validators.required],
      role3:  ['', Validators.required],
      role4:  ['', Validators.required]
    });
  }

  searchUserName() {
   var obj = this.userRoleForm.value;
   console.log("obj",obj)
   this.userRoleService.searchUserRole(obj).subscribe(response => {
      console.log("search....", response, typeof (response));
      this.allItems = response;
      console.log("response.........",response.firstName, response.lastName);
      this.name = response.firstName.concat(" ").concat(response.lastName);
      console.log("this.username..",this.name);
    }, (err: HttpErrorResponse) => {
      console.log("In serarch error"+err);
    });
  }


  get f() { return this.userRoleForm.controls; }
  
   /*searchUserRole() is method for searching the role of users*/ 
   

    /*submitUserRole() is method for submitting the role of users*/ 
    updateUserRole() {
    var myPostObject = this.userRoleForm.value;

    console.log("userId ....."+this.userRoleForm.value.userName);
    console.log("startDate ....."+this.userRoleForm.value.startDate);
    console.log("endDate ....."+this.userRoleForm.value.endDate);
    console.log("role1 ....."+this.userRoleForm.value.role1);
    console.log("role2 ....."+this.userRoleForm.value.role2);
    console.log("role3 ....."+this.userRoleForm.value.role3);
    console.log("role4 ....."+this.userRoleForm.value.role4);

    let role1 = "", role2 = "", role3 = "", role4= "";

    if(this.userRoleForm.value.role1 == true){
      role1 = "WBG Business User"
    }
    if(this.userRoleForm.value.role2 == true){
      role2 = "WBG Business Approver"
    }
    if(this.userRoleForm.value.role3 == true){
      role3 = "Donor"
    }
    if(this.userRoleForm.value.role4 == true){
      role4 = "WBG Treasury"
    }

    var array=[];
if(role1 != ""){
  array.push(role1)
}

if(role2 != ""){
  array.push(role2)
}

if(role3 != ""){
  array.push(role3)
}

if(role4 != ""){
  array.push(role4)
}

    var object = {
      userName: this.userRoleForm.value.userName,
      startDate: this.userRoleForm.value.startDate,
      endDate: this.userRoleForm.value.endDate,
      role:array
    }

console.log("OBJECT", object)
    this.http.post('http://localhost:8000/userRole/updateUserRole', object)
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


