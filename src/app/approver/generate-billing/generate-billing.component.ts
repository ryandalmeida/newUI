
import { Component, OnInit, Input, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BillingService } from '../../services/billing.service';
import 'rxjs/add/observable/of';
import { Billing } from 'src/app/models/billing.model';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';
import { ErrorDialogService } from 'src/app/error-dialog/errordialog.service';

@Component({
  selector: 'app-generate-billing',
  templateUrl: './generate-billing.component.html',
  styleUrls: ['./generate-billing.component.css']
})
export class GenerateBillingComponent implements OnInit {
  displayedColumns: string[] = ['select', 'pledgeId', 'pledgeFundType', 'amount', 'donorName', 'ar_id', 'debit', 'country', 'installment_no', 'startDate', 'endDate', 'status'];
  dataSource: MatTableDataSource<Billing>;
  selection = new SelectionModel<Billing>(true, []);
  createPledgeClicked: boolean = false;
  billdata: any;
  checkedRows: any;
  allItems: any[];
  pagedItems: any[];
  pager: any = {};
  key: string = 'pledgeId';
  order: boolean = false;

  checkedArray: any[] = [];
  isRowClicked: boolean = false;
  searchForm: FormGroup;
  constructor(private billingService: BillingService, private http: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog, private pagerService: PagerService, private spinnerService: Ng4LoadingSpinnerService,
              private sortService: SortService, private changeDetectorRefs: ChangeDetectorRef, private errorDialogService: ErrorDialogService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      country: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      pledgeId: [''],
      donorName: ['']
    });
    this.pageload();
  }

  pageload() {
    this.spinnerService.show();
    this.billingService.getAllAR().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        this.tableSort('startDate');
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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

  masterToggle() {
    debugger;
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
    this.billdata = JSON.stringify(row);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ARId + 1}`;

  }

  store() {
    setTimeout(() => {
      this.checkedRows = this.selection.selected;
    }
    )
  }


  generateBilling() {
    for (var i = 0; i < ((this.checkedRows).length); i++) {
      var myObject = {
        "arId": null,
        "pledgeId": null,
        "donorName": null,
        "country": null,
        "debit": null,
        "installmentNo": null,
        "startDate": null,
        "endDate": null,
        "pledgeFundType": null,
        "creditAmount": null,
        "status": null
      }
      myObject.pledgeId = this.checkedRows[i]["pledgeId"];
      myObject.arId = this.checkedRows[i]["arId"];
      myObject.country = this.checkedRows[i]["country"];
      myObject.debit = this.checkedRows[i]["debit"];
      myObject.creditAmount = this.checkedRows[i]["amount"];
      myObject.installmentNo = this.checkedRows[i]["installmentNo"];
      myObject.startDate = this.checkedRows[i]["startDate"];
      myObject.endDate = this.checkedRows[i]["endDate"];
      myObject.donorName = this.checkedRows[i]["donorName"];
      myObject.pledgeFundType = this.checkedRows[i]["pledgeFundType"]
      myObject.status = "Bill Generated"
      this.checkedArray.push(myObject)
    }

    this.spinnerService.show();
    this.billingService.submitBill(this.checkedArray).subscribe(response => {
      if (response === "SUCCESS") {
        var dialogData = {
          "header": "Bill Generated",
          "data": " Bill generated successfully."
        }
      }
      if (response === "FAILURE") {
        var dialogData = {
          "header": "Bill Failed",
          "data": "Failed: Bill generation failed."
        }
      }
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
        height: '195px',
        width: '325px',
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(result => {
        this.pageload();
        console.log('The dialog was closed');
      });
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.spinnerService.hide();
      this.errorDialogService.openDialog(err.message);
    });
  }

  searchBilling() {
    var searchFormData = this.searchForm.value;
    this.billingService.search(searchFormData).subscribe(response => {
      this.allItems = response;
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  cancelBillingSearch() {
    this.pageload();
  }

}