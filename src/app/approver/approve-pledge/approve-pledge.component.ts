import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PledgeData } from 'src/app/models/pledge.model';
import { PledgeService } from 'src/app/services/pledge.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from 'src/app/error-dialog/errordialog.service';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';

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
  rowData: any;
  approvePledgeForm: FormGroup;
  searchForm: FormGroup;
  checkedRowsObject: any;
  allItems: any[];
  pager: any = {};
  pagedItems: any[];
  reviseArray: any[] = [];
  key: string = 'pledgeId';
  order: boolean = false;
  checkedArray: any[] = [];
  constructor(private pledgeService: PledgeService, private formBuilder: FormBuilder, public dialog: MatDialog, private pagerService: PagerService, private changeDetectorRefs: ChangeDetectorRef, private spinnerService: Ng4LoadingSpinnerService,
    private sortService: SortService, private errorDialogService: ErrorDialogService) { }

  ngOnInit() {
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

    this.pageLoad();
  }

  pageLoad() {
    this.spinnerService.show();
    this.pledgeService.getNewPledge().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        this.tableSort('pledgeId');
      },
      (error) => {
        this.spinnerService.hide();
        this.errorDialogService.openDialog(error);
        console.log("Error: " , error)
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

  selectRow(row) {
    this.isRowClicked = true;
    this.rowData = row;
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
    this.reviseArray.push(this.approvePledgeForm.value);
    this.spinnerService.show();
    this.pledgeService.revisePledge(this.reviseArray).subscribe(response => {
      if (response === "SUCCESS") {
        var dialogData = {
          "header": "Pledge Revised",
          "data": " Pledge revised successfully."
        }
      }
      if (response === "FAILURE") {
        var dialogData = {
          "header": "Pledge Revision Failed",
          "data": "Failed: Pledge revision failed."
        }
      }
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
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
      this.spinnerService.hide();
      this.errorDialogService.openDialog(err.message);
      console.log(err.message);
    });
  }

  cancelPledge() {
    this.pageLoad();
  }

  searchPledge() {
    var searchFormData = this.searchForm.value;
    this.pledgeService.searchPledgeApprover(searchFormData).subscribe(response => {
      this.allItems = response;
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        this.selection.select(row)
      });
  }

  checkboxLabel(row): string {
    if (!row) {
      return `{this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pledgeId + 1}`;
  }

  store() {
    setTimeout(() => {
      this.checkedRowsObject = this.selection.selected;
    });
  }


  approvePledge() {
    for (var ind = 0; ind < this.checkedRowsObject.length; ind++) {
      var object = {
        "amount": null,
        "country": null,
        "endDate": null,
        "installments": null,
        "paymentPeriod": null,
        "pledgeFundType": null,
        "pledgeId": null,
        "programName": null,
        "startDate": null,
        "status": null
      }
      object.amount = this.checkedRowsObject[ind].amount;
      object.country = this.checkedRowsObject[ind].country;
      object.endDate = this.checkedRowsObject[ind].endDate;
      object.installments = this.checkedRowsObject[ind].installments;
      object.paymentPeriod = this.checkedRowsObject[ind].paymentPeriod;
      object.pledgeFundType = this.checkedRowsObject[ind].pledgeFundType;
      object.pledgeId = this.checkedRowsObject[ind].pledgeId;
      object.programName = this.checkedRowsObject[ind].programName;
      object.startDate = this.checkedRowsObject[ind].startDate;
      object.status = "Approved";
      this.checkedArray.push(object)
    }
    this.spinnerService.show();
    this.pledgeService.approvePledge(this.checkedArray).subscribe(response => {
      if (response === "SUCCESS") {
        var dialogData = {
          "header": "Pledge Approved",
          "data": " Pledge approved successfully."
        }
      }
      if (response === "FAILURE") {
        var dialogData = {
          "header": "Pledge Approval Failed",
          "data": "Failed: Pledge failed to be approved."
        }
      }
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
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
      this.errorDialogService.openDialog(err.message);
      console.log(err);
    });
  }
}


