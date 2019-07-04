import { Component, OnInit, ViewChild, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { PledgeData } from 'src/app/models/pledge.model';
import { PledgeService } from 'src/app/services/pledge.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';

@Component({
  selector: 'app-approve-pledge',
  templateUrl: './approve-pledge.component.html',
  styleUrls: ['./approve-pledge.component.css']
})
export class ApprovePledgeComponent implements OnInit {

  displayedColumns: string[] = ['select', 'pledgeId', 'programName', 'pledgeType', 'donorName', 'country', 'amount', 'approver', 'startDate', 'endDate', 'status'];
  dataSource: MatTableDataSource<PledgeData>;
  selection = new SelectionModel<PledgeData>(true, []);
  isRowClicked: boolean = false;
  rowData;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() childMessage: boolean;
  approvePledgeForm: FormGroup;
  searchForm: FormGroup;
  checkedRowsObject;
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  reviseArray:any[] = [];
  key: string = 'pledgeId'; 
  order: boolean = false;
  constructor(private pledgeService: PledgeService, private formBuilder: FormBuilder, public dialog: MatDialog, private pagerService: PagerService, private changeDetectorRefs: ChangeDetectorRef, private spinnerService: Ng4LoadingSpinnerService,
    private sortService: SortService) { }

  ngOnInit() {
    this.pageLoad();

    this.approvePledgeForm = this.formBuilder.group({
      pledgeId: [''],
      donorName: [''],
      programName: [''],
      country: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      amount: [''],
      paymentPeriod: [''],
      installments: [''],
      comments: ['']
    });

    this.searchForm = this.formBuilder.group({
      pledgeId: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      programName: [''],
      amount: ['']      
    });
  }

  tableSort(key) {
    this.key = key;
    this.order = !this.order;

    this.allItems = this.sortService.tableSort(this.key, this.order, this.allItems);
    this.setPage(1);
  }

  pageLoad() {
    this.spinnerService.show();
    this.pledgeService.getNewPledge().subscribe(
      (data) => {
        console.log("data",data)
      this.spinnerService.hide();
        this.allItems = data;
        this.tableSort('pledgeId');
        //this.setPage(1);
        
      },
      (error) => {
        console.log("Error: " + error)
      });
  }

  setPage(page: number) {
    console.log("In set page",page)
    if (page < 1 || page > this.pager.totalPages) {
      console.log("inside if")
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    console.log("this.pager", this.pager)

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("Table Data", this.pagedItems.length)
    this.dataSource = new MatTableDataSource(this.pagedItems);
    //this.dataSource.sort = this.sort;
    console.log("Table Dataa", this.dataSource.data.length)
    this.changeDetectorRefs.detectChanges();
  }

  selectRow(row) {
    this.isRowClicked = true;
    this.rowData = row;
    console.log("row details", row, this.rowData)
  }

  onCancel() {
    this.isRowClicked = false;
    this.pageLoad();
  }

  onRevise() {
    this.isRowClicked = true;
    this.approvePledgeForm.value.pledgeId = this.rowData.pledgeId;
    this.approvePledgeForm.value.donorName = this.rowData.donorName;
    this.approvePledgeForm.value.programName = this.rowData.programName;
    this.approvePledgeForm.value.amount = this.rowData.amount;
    this.approvePledgeForm.value.startDate = this.rowData.startDate;
    this.approvePledgeForm.value.endDate = this.rowData.endDate;
    this.approvePledgeForm.value.installments = this.rowData.installments;
    this.approvePledgeForm.value.country = this.rowData.country;
    this.approvePledgeForm.value.comments = this.approvePledgeForm.value.comments;
    this.approvePledgeForm.value.pledgeFundType = this.rowData.pledgeFundType;
    this.approvePledgeForm.value.paymentPeriod = this.rowData.paymentPeriod;
    this.approvePledgeForm.value.status = "Revise";
    var myPostObject = this.approvePledgeForm.value;
    //var arr = Object.entries(myPostObject).map(([type, value]) => ({type, value}));
    console.log("mapped",typeof(this.approvePledgeForm.value));
    //this.reviseArray = this.approvePledgeForm.value;
    this.reviseArray.push(this.approvePledgeForm.value);
    
    console.log("myPostObject", this.reviseArray)
    this.spinnerService.show();
    this.pledgeService.revisePledge(this.reviseArray).subscribe(response => {
      console.log(response);
      if(response === "SUCCESS"){
        var dialogData = {
          "header": "Pledge Revised", 
          "data":" Pledge revised successfully."
        }
      }
      if(response === "FAILURE"){
        var dialogData = {
          "header": "Pledge Revision Failed", 
          "data":"Failed: Pledge revision failed."
        }
      }
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(RevisePledegDialog, {
        height: '195px',
        width: '325px',
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(result => {
        this.isRowClicked = false;
        this.pageLoad();
        console.log('The dialog was closed');
      });
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(RevisePledegDialog, {
        height: '195px',
        width: '325px',
        data: err.message
      });
      dialogRef.afterClosed().subscribe(result => {
        this.isRowClicked = false;
        this.pageLoad();
        console.log('The dialog was closed');
      });
      console.log(err.message);
    });
  }

  cancelPledge() {
    this.pageLoad();
    this.pager.totalPages = 1;
    //this.searchForm.reset();
  }

  searchPledge() {
    var searchFormData = this.searchForm.value;
    console.log(searchFormData,"**")
    this.pledgeService.searchPledge(searchFormData).subscribe(response => {
      console.log("search", response, typeof (response));
      //if(response.length == 0){
        //this.pager.totalPages = 1;
      //}
      //else{
        this.allItems = response;
        console.log(response)
        this.setPage(1);
     // }
     
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    debugger;
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        console.log("row", row)
        this.selection.select(row)
      });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    if (!row) {
      return `{this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pledgeId + 1}`;
  }

  store() {
    setTimeout(() => {
      //this.unselectedRows = this.selection.selected;
      console.log("unselectedRows: ", this.selection.selected);
      this.checkedRowsObject = this.selection.selected;
    });
  }


  approvePledge() {
   // setTimeout(() => {
      console.log("unselectedRows: ", this.selection.selected);
      var myPostObject = this.selection.selected;
      for(var ind=0; ind < myPostObject.length; ind++){
        myPostObject[ind].amount = this.selection.selected[ind].amount;
        myPostObject[ind].country = this.selection.selected[ind].country;
        myPostObject[ind].endDate = this.selection.selected[ind].endDate;
        myPostObject[ind].installments = this.selection.selected[ind].installments;
        myPostObject[ind].paymentPeriod = this.selection.selected[ind].paymentPeriod;
        myPostObject[ind].pledgeFundType = this.selection.selected[ind].pledgeFundType;
        myPostObject[ind].pledgeId = this.selection.selected[ind].pledgeId;
        myPostObject[ind].programName = this.selection.selected[ind].programName;
        myPostObject[ind].startDate = this.selection.selected[ind].startDate;
        myPostObject[ind].status = "Approved";
      }
      console.log("myPostObject changed: ", myPostObject);
      this.spinnerService.show();
      this.pledgeService.approvePledge(myPostObject).subscribe(response => {
        console.log(response);
        if(response === "SUCCESS"){
          var dialogData = {
            "header": "Pledge Approved", 
            "data":" Pledge approved successfully."
          }
        }
        if(response === "FAILURE"){
          var dialogData = {
            "header": "Pledge Approval Failed", 
            "data":"Failed: Pledge failed to be approved."
          }
        }
        this.spinnerService.hide();
        const dialogRef = this.dialog.open(ApproveDialog, {
          height: '195px',
        width: '325px',
          data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {
          this.pageLoad();
          console.log('The dialog was closed');
        });
      }, (err: HttpErrorResponse) => {
        this.spinnerService.hide();
        const dialogRef = this.dialog.open(ApproveDialog, {
          height: '195px',
          width: '325px',
          data: err.message
        });
        dialogRef.afterClosed().subscribe(result => {
          this.pageLoad();
          console.log('The dialog was closed');
        });
        console.log(err);
      });
   // });
  }
}

@Component({
  selector: 'approveDialog.component',
  templateUrl: 'approveDialog.component.html',
  styles:[

    
    `h1{background-color:#D9E9F5; border-bottom: 1px solid #2497F2 ;}
    
   
    overflow:none;

    .mat-dialog-container{
      padding: 0px !important;
  }
  `
   ]
})
export class ApproveDialog {
  constructor(
    public dialogRef: MatDialogRef<ApproveDialog>,
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

@Component({
  selector: 'revisePledegDialog.component',
  templateUrl: 'revisePledegDialog.component.html',
  styles:[

    `h1{background-color:#D9E9F5; border-bottom: 1px solid #2497F2 ;}
    
   
    overflow:none;

    .mat-dialog-container{
      padding: 0px !important;
  }
  `
   ]
})
export class RevisePledegDialog {
  constructor(
    public dialogRef: MatDialogRef<RevisePledegDialog>,
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


