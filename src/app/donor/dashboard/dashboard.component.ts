import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, } from '@angular/common/http';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from '../../services/sortService.service';
import { ErrorDialogService } from '../../error-dialog/errordialog.service';
import { PledgeService } from '../../services/pledge.service';
import { PledgeData } from '../../models/pledge.model';
import { PagerService } from '../../services/pagerService.service';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { UserRoleService } from 'src/app/services/userRole.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  registerForm: FormGroup;
  updateForm: FormGroup;
  displayedColumns: string[] = ['pledgeId', 'programName', 'pledgeFundType', 'amount', 'installments', 'paymentPeriod', 'startDate', 'endDate', 'status'];
  dataSource: MatTableDataSource<PledgeData>;
  createPledgeClicked: boolean = false;
  isupdatePledgeClicked: boolean = false;
  allItems: any[];
  pager: any = {};
  pagedItems: any[];
  rowData: any;
  key: string = 'pledgeId';
  order: boolean = false;
  username:String;  
  email:any;
  errorMessage:any;
  updatePledgeData:any;
  fname:string;
  lname:string;
  constructor(private pledgeService: PledgeService, private formBuilder: FormBuilder, public dialog: MatDialog, private pagerService: PagerService, private changeDetectorRefs: ChangeDetectorRef,
              private spinnerService: Ng4LoadingSpinnerService, private sortService: SortService, private errorDialogService: ErrorDialogService, private MsAdalSvc: MsAdalAngular6Service, private userRoleService: UserRoleService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      country: ['', Validators.required],
      programName: ['', Validators.required],
      pledgeFundType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amount: ['', Validators.required],
      paymentPeriod: ['', Validators.required],
      installments: ['', Validators.required],
    });

    this.updateForm = this.formBuilder.group({
      country: ['', Validators.required],
      programName: ['', Validators.required],
      pledgeFundType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amount: ['', Validators.required],
      paymentPeriod: ['', Validators.required],
      installments: ['', Validators.required],
      pledgeId: ['', Validators.required]
    });

    this.searchForm = this.formBuilder.group({
      pledgeId: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      programName: [''],
      amount: ['']
    });

    this.pageload();
    this.email =  this.MsAdalSvc.LoggedInUserEmail;

   if(this.MsAdalSvc.isAuthenticated){
      var object = {
        "emailId":this.MsAdalSvc.LoggedInUserEmail
      }
      this.userRoleService.searchUserName(object).subscribe(
        response =>{
         this.fname = response.firstName;
         this.lname = response.lastName;
         this.username = (this.fname).concat(" ").concat(this.lname);
         console.log("username",this.username);
        }
      ); 
   }
  }

  pageload() {
    this.spinnerService.show();
    this.pledgeService.getAllPledge().subscribe(
      (data) => {
        console.log("get pledge", data);
        this.spinnerService.hide();
        this.allItems = data;
        this.tableSort('pledgeId');
      },
      (err: HttpErrorResponse) => {
        console.log("Error: " , err);
        this.errorMessage = err;
        this.spinnerService.hide();
        this.errorDialogService.openDialog(err);
      });
  }

  tableSort(key) {
    this.key = key;
    this.order = !this.order;
    this.allItems = this.sortService.tableSort(this.key, this.order, this.allItems);
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.dataSource = new MatTableDataSource(this.pagedItems);
    this.changeDetectorRefs.detectChanges();
  }

  createPledge() {
    this.registerForm.reset();
    this.createPledgeClicked = true;
  }

  onCancel() {
    this.createPledgeClicked = false;
    this.isupdatePledgeClicked = false;
  }

  selectRow(row) {
    this.rowData = row;
    this.isupdatePledgeClicked = true;
  }

  cancelPledgeSearch() {
    this.pageload();
  }

  searchPledge() {
    var searchFormData = this.searchForm.value;
    console.log("searchFormData",searchFormData)
    this.pledgeService.searchPledge(searchFormData).subscribe(
      (data) => {
        console.log("search pledge", data);
      this.allItems = data;
      this.tableSort('pledgeId');
      //this.setPage(1);
    }, (err: HttpErrorResponse) => {
        console.log("Error: ",err);
    });
  }

  onSubmit() {
    this.spinnerService.show();
    var submitPledgeData = this.registerForm.value;
    submitPledgeData.amount = this.registerForm.value.amount;
    submitPledgeData.country = this.registerForm.value.country;
    submitPledgeData.endDate = this.registerForm.value.endDate;
    submitPledgeData.installments = this.registerForm.value.installments;
    submitPledgeData.paymentPeriod = this.registerForm.value.paymentPeriod;
    submitPledgeData.pledgeFundType = this.registerForm.value.pledgeFundType;
    submitPledgeData.programName = this.registerForm.value.programName;
    submitPledgeData.startDate = this.registerForm.value.startDate;
    submitPledgeData.donorName = this.username;
    submitPledgeData.donorId = this.email;
    submitPledgeData.status = "New";

    this.pledgeService.submitPledge(submitPledgeData).subscribe(response => {
      console.log(response.toString());
       if (response.toString().includes("Pledge Inserted Successfully")) {
        var dialogData = {
          "header": "Pledge Created",
          "data":  response.toString()
        }
      } 
    /*   if (response === "SUCCESS") {
        var dialogData = {
          "header": "Pledge Created",
          "data": "Pledge Inserted Successfully."
        }
      } */
      if (response === "FAILURE") {
        var dialogData = {
          "header": "Pledge Failed!!",
          "data": "Failed: Pledge creation failed."
        }
      }
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
        height: '195px',
        width: '325px',
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(result => {
        this.createPledgeClicked = false;
        this.pageload();
        console.log('The dialog was closed');
      });
    }, (err: HttpErrorResponse) => {
      this.spinnerService.hide();
      this.errorDialogService.openDialog(err.message);
      console.log("Error: ",err.message);
    });
  }

  onUpdateRow(row) {
    this.rowData = row;
  }

  onUpdate() {
    this.spinnerService.show();
    this.updatePledgeData = this.rowData;
    console.log("this.updatePledgeData",this.updatePledgeData)
    if (this.updateForm.value.amount == "") {
      this.updatePledgeData.amount = this.rowData.amount;
    } else {
      this.updatePledgeData.amount = this.updateForm.value.amount;
    }
    if (this.updateForm.value.country == "") {
      this.updatePledgeData.country = this.rowData.country;
    } else {
      this.updatePledgeData.country = this.updateForm.value.country;
    }
    if (this.updateForm.value.endDate == "") {
      this.updatePledgeData.endDate = this.rowData.endDate;
    } else {
      this.updatePledgeData.endDate = this.updateForm.value.endDate;
    }
    if (this.updateForm.value.installments == "") {
      this.updatePledgeData.installments = this.rowData.installments;
    } else {
      this.updatePledgeData.installments = this.updateForm.value.installments;
    }
    if (this.updateForm.value.paymentPeriod == "") {
      this.updatePledgeData.paymentPeriod = this.rowData.paymentPeriod;
    } else {
      this.updatePledgeData.paymentPeriod = this.updateForm.value.paymentPeriod;
    }
    if (this.updateForm.value.pledgeFundType == "") {
      this.updatePledgeData.pledgeFundType = this.rowData.pledgeFundType;
    } else {
      this.updatePledgeData.pledgeFundType = this.updateForm.value.pledgeFundType;
    }
    if (this.updateForm.value.pledgeId == "") {
      this.updatePledgeData.pledgeId = this.rowData.pledgeId;
    } else {
      this.updatePledgeData.pledgeId = this.updateForm.value.pledgeId;
    }
    if (this.updateForm.value.programName == "") {
      this.updatePledgeData.programName = this.rowData.programName;
    } else {
      this.updatePledgeData.programName = this.updateForm.value.programName;
    }
    if (this.updateForm.value.startDate == "") {
      this.updatePledgeData.startDate = this.rowData.startDate;
    } else {
      this.updatePledgeData.startDate = this.updateForm.value.startDate;
    }
    this.updatePledgeData.status = "New";
    this.pledgeService.submitPledge(this.updatePledgeData).subscribe(response => {
      console.log(response.toString());
      if (response === "SUCCESS") {
        var dialogData = {
          "header": "Pledge Updated",
          "data": " Pledge updated successfully."
        }
      }
      if (response === "FAILURE") {
        var dialogData = {
          "header": "Pledge Failed",
          "data": "Failed: Pledge updation failed."
        }
      }
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
        height: '195px',
        width: '325px',
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(result => {
        this.isupdatePledgeClicked = false;
        this.pageload();
        console.log('The dialog was closed');
      });
    }, (err: HttpErrorResponse) => {
      console.log("Error: ",err.message);
      this.spinnerService.hide();
      this.errorDialogService.openDialog(err.message);
    });
  }
};



