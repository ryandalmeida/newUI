import { Component, OnInit, Input, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { PledgeService } from '../../services/pledge.service';
import { PledgeData } from '../../models/pledge.model';
import { PagerService } from '../../services/pagerService.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;
  registerForm: FormGroup;
  updateForm: FormGroup;
  submitted = false;
  displayedColumns: string[] = ['pledgeId', 'programName', 'pledgeFundType', 'amount', 'installments', 'paymentPeriod', 'startDate', 'endDate','status'];
  dataSource: MatTableDataSource<PledgeData>;
  createPledgeClicked: boolean = false;
  isupdatePledgeClicked: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() childMessage: boolean;
  @ViewChild(MatSort) sort: MatSort;
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  lastPage: number;
  cancelClicked: boolean = false;
  rowData;

  constructor(private pledgeService: PledgeService, private formBuilder: FormBuilder, public dialog: MatDialog, private pagerService: PagerService, private changeDetectorRefs: ChangeDetectorRef,  private spinnerService: Ng4LoadingSpinnerService) { }
  pageload() {
    this.searchForm = this.formBuilder.group({
      pledgeId: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      programName: [''],
      paymentPeriod: [''],
      amount: [''],
      installments: ['']
      
    });
    this.spinnerService.show();
    this.pledgeService.getAllPledge().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        console.log(data)
        this.setPage(1);
      },
      (err: HttpErrorResponse) => {
        console.log("Error: " + err)
        this.spinnerService.hide();
      });

      
  }
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
    this.pageload();
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("Table Data", this.pagedItems)
    this.dataSource = new MatTableDataSource(this.pagedItems);
    this.dataSource.sort = this.sort;
    this.changeDetectorRefs.detectChanges();
  }

  createPledge() {
    this.createPledgeClicked = true;
  }

  onCancel() {
    this.createPledgeClicked = false;
    this.isupdatePledgeClicked = false;
  }

  selectRow(row){
    console.log("ROW",row);
    this.rowData = row;
    this.isupdatePledgeClicked = true;
  }

  get f() {
    return this.registerForm.controls;
  }

  cancelPledge() {
    this.pageload();
    //this.searchForm.reset();
  }

  searchPledge() {
    var searchFormData = this.searchForm.value;
    console.log("searchFormData", searchFormData)
    this.pledgeService.searchPledge(searchFormData).subscribe(response => {
      console.log("search", response, typeof (response));
      this.allItems = response;
      console.log(response)
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
   /*    this.dataSource = new MatTableDataSource(this.pagedItems);
    this.dataSource.sort = this.sort;
    this.changeDetectorRefs.detectChanges(); */
      console.log(err);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.spinnerService.show();
     /*  if (this.registerForm.invalid) {
        return;
      } */
      var submitPledgeData = this.registerForm.value;
      submitPledgeData.amount = this.registerForm.value.amount;
      submitPledgeData.country = this.registerForm.value.country;
      submitPledgeData.endDate = this.registerForm.value.endDate;
      submitPledgeData.installments = this.registerForm.value.installments;
      submitPledgeData.paymentPeriod = this.registerForm.value.paymentPeriod;
      submitPledgeData.pledgeFundType = this.registerForm.value.pledgeFundType;
      //submitPledgeData.pledgeId = this.registerForm.value.pledgeId;
      submitPledgeData.programName = this.registerForm.value.programName;
      submitPledgeData.startDate = this.registerForm.value.startDate;
      submitPledgeData.status = "New";
      
    console.log("submitPledgeData", submitPledgeData);
    this.pledgeService.submitPledge(submitPledgeData).subscribe(response => {
      console.log(response.toString());
      if(response === "SUCCESS"){
        var dialogData = "Success: Pledge created successfully."
      }
      if(response === "FAILURE"){
        var dialogData = "Failed: Pledge creation failed."
      }
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(PledgeCreatedDialog, {
        height: '190px',
        width: '320px',
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(result => {
        this.createPledgeClicked = false;
        this.pageload();
        console.log('The dialog was closed');
      });
    }, (err: HttpErrorResponse) => {
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(PledgeCreatedDialog, {
        height: '190px',
        width: '320px',
        data: err.message
      });
      dialogRef.afterClosed().subscribe(result => {
        this.createPledgeClicked = false;
        this.pageload();
        console.log('The dialog was closed');
      });
      console.log(err.message);
    });
    this.registerForm.reset();
  }

  onUpdateRow(row){
    this.rowData = row;
  }

  onUpdate(){
    this.submitted = true;
    this.spinnerService.show();
    var submitPledgeData = this.rowData;
    console.log("this.updateForm.value", submitPledgeData, this.updateForm.value);
   
    if(this.updateForm.value.amount == ""){
      submitPledgeData.amount = this.rowData.amount;
    }else{
      submitPledgeData.amount = this.updateForm.value.amount;
    }
    if(this.updateForm.value.country == ""){
      submitPledgeData.country = this.rowData.country;
    }else{
      submitPledgeData.country = this.updateForm.value.country;
    }
    if(this.updateForm.value.endDate == ""){
      submitPledgeData.endDate = this.rowData.endDate;
    }else{
      submitPledgeData.endDate = this.updateForm.value.endDate;
    }
    if(this.updateForm.value.installments == ""){
      submitPledgeData.installments = this.rowData.installments;
    }else{
      submitPledgeData.installments = this.updateForm.value.installments;
    }
    if(this.updateForm.value.paymentPeriod == ""){
      submitPledgeData.paymentPeriod = this.rowData.paymentPeriod;
    }else{
      submitPledgeData.paymentPeriod = this.updateForm.value.paymentPeriod;
    }
    if(this.updateForm.value.pledgeFundType == ""){
      submitPledgeData.pledgeFundType = this.rowData.pledgeFundType;
    }else{
      submitPledgeData.pledgeFundType = this.updateForm.value.pledgeFundType;
    }
    if(this.updateForm.value.pledgeId == ""){
      submitPledgeData.pledgeId = this.rowData.pledgeId;
    }else{
      submitPledgeData.pledgeId = this.updateForm.value.pledgeId;
    }
    if(this.updateForm.value.programName == ""){
      submitPledgeData.programName = this.rowData.programName;
    }else{
      submitPledgeData.programName = this.updateForm.value.programName;
    }
    if(this.updateForm.value.startDate == ""){
      submitPledgeData.startDate = this.rowData.startDate;
    }else{
      submitPledgeData.startDate = this.updateForm.value.startDate;
    }
    submitPledgeData.status = "New";
    console.log("submitPledgeData", submitPledgeData);
    this.pledgeService.submitPledge(submitPledgeData).subscribe(response => {
      console.log(response.toString());
      if(response === "SUCCESS"){
        var dialogData = "Success: Pledge updated successfully."
      }
      if(response === "FAILURE"){
        var dialogData = "Failed: Pledge updation failed."
      }
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(PledgeCreatedDialog, {
        height: '210px',
        width: '320px',
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(result => {
        this.isupdatePledgeClicked = false;
        this.pageload();
        console.log('The dialog was closed');
      });
    }, (err: HttpErrorResponse) => {
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(PledgeCreatedDialog, {
        height: '210px',
        width: '320px',
        data: err.message
      });
      dialogRef.afterClosed().subscribe(result => {
        this.isupdatePledgeClicked = false;
        this.pageload();
        console.log('The dialog was closed');
      });
      console.log(err.message);
    });
    this.updateForm.reset(); 
  }
};

@Component({
  selector: 'pledgeCreated.component',
  templateUrl: 'pledgeCreated.component.html',
  styles:[

    `h1{background-color:#D9E9F5; border-bottom: 1px solid #2497F2 ;}
    
    p{font-style:Italic;font-style:bold;font-color:black} ;
    overflow:none;
  `
   ]
})
export class PledgeCreatedDialog {
  constructor(
    public dialogRef: MatDialogRef<PledgeCreatedDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    console.log("DATA", this.data);
    this.dialogRef.close();
  }
}
