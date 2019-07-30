import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PaymentData } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';
import { ErrorDialogService } from 'src/app/error-dialog/errordialog.service';
import { SortService } from 'src/app/services/sortService.service';

@Component({
  selector: 'app-process-payment',
  templateUrl: './process-payment.component.html',
  styleUrls: ['./process-payment.component.css']
})
export class ProcessPaymentComponent implements OnInit {
  displayedColumns: string[] = ['select', 'pledgeId', 'pledgeFundType', 'invoiceId', 'donorName', 'arId', 'debitAmount', 'country', 'installmentNo','status'];
  dataSource: MatTableDataSource<PaymentData>;
  selection = new SelectionModel<PaymentData>(true, []);
  isRowClicked: boolean = false;
  rowData: any;
  checkedRows: any;
  checkedArray: any[] = [];
  processPaymentForm: FormGroup;
  allItems: any[];
  pagedItems: any[];
  pager: any = {};
  searchForm: FormGroup;
  key: string = 'pledgeId';
  order: boolean = false;
  constructor(private paymentService: PaymentService, private formBuilder: FormBuilder, private http: HttpClient, public dialog: MatDialog, private pagerService: PagerService, private spinnerService: Ng4LoadingSpinnerService,
    private changeDetectorRefs: ChangeDetectorRef, private errorDialogService: ErrorDialogService, private sortService: SortService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      pledgeFundType: [''],
      donorName: [''],
      country: [''],
      pledgeId: [''],
      startDate: [''],
      endDate: [''],
    });
    this.pageLoad();
  }

  setPage(page: number) {
    console.log("In set page")
    if (page < 1 || page > this.pager.totalPages) {
      console.log("inside if")
      return;
    }
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("Table Data", this.pagedItems)
    this.dataSource = new MatTableDataSource(this.pagedItems);
    this.changeDetectorRefs.detectChanges();
  }

  pageLoad() {
    this.spinnerService.show();
    this.paymentService.getAllProcessPayments().subscribe(
      (data) => {
        console.log("Daata",data);
        this.spinnerService.hide();
        this.allItems = data;
        this.setPage(1);
      },
      (error) => {
        console.log("Error: " + error)
        this.spinnerService.hide();
        this.errorDialogService.openDialog(error);
      });
  }

  tableSort(key) {
    this.key = key;
    this.order = !this.order;
    this.allItems = this.sortService.tableSort(this.key, this.order, this.allItems);
    this.setPage(1);
  }

  selectRow(row) {
    this.isRowClicked = true;
    this.rowData = row;
    console.log("row details", row, this.rowData)
  }

  onCancel() {
    this.isRowClicked = false;
  }

  cancelProcessPayment() {
    this.pageLoad();
    this.searchForm.reset();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pledgeId + 1}`;
  }

  store() {
    setTimeout(() => {
      this.checkedRows = this.selection.selected;
    });
  }

  searchProcessPayment() {
    var searchFormData = this.searchForm.value;
    console.log("searchFormData", searchFormData)
    this.paymentService.searchPayment(searchFormData).subscribe(response => {
      console.log("response", response)
      this.allItems = response;
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  paymentReceived() {
    console.log("check", this.checkedRows)
    for (var i = 0; i < (this.checkedRows.length); i++) {
      var myObject = {
        "pledgeId": null,
        "pledgeFundType": null,
        "donorName": null,
        "arId": null,
        "country": null,
        "debitAmount": null,
        "creditAmount": null,
        "installmentNo": null,
        "paymentDate": null,
        "invoiceId": null,
        "status": null
      }
      myObject.pledgeId = this.checkedRows[i]["pledgeId"];
      myObject.pledgeFundType = this.checkedRows[i]["pledgeFundType"];
      myObject.arId = this.checkedRows[i]["arId"];
      myObject.country = this.checkedRows[i]["country"];
      myObject.debitAmount = this.checkedRows[i]["debitAmount"];
      myObject.installmentNo = this.checkedRows[i]["installmentNo"];
      myObject.creditAmount = this.checkedRows[i]["creditAmount"];
      myObject.paymentDate = this.checkedRows[i]["paymentDate"];
      myObject.donorName = this.checkedRows[i]["donorName"];
      myObject.invoiceId = this.checkedRows[i]["invoiceId"];
      myObject.status = "Payment Received"
      this.checkedArray.push(myObject)
    }

    this.spinnerService.show();
    this.paymentService.submitPayment(myObject).subscribe(response => {
      if (response === "SUCCESS") {
        var dialogData = {
          "header": "Payment Received",
          "data": " Payment received successfully."
        }
      }
      if (response === "FAILURE") {
        var dialogData = {
          "header": "Payment Failed",
          "data": "Failed: payment failed."
        }
      }
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
        height: '210px',
        width: '330px',
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.pageLoad();
      });
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.spinnerService.hide();
      this.errorDialogService.openDialog(err.message);
      this.pageLoad();
    });
  }
}

