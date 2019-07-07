import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PaymentData } from 'src/app/models/payment.model';
import { MatchPaymentService } from '../../services/matchPayment.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { ErrorDialogService } from 'src/app/error-dialog/errordialog.service';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';

@Component({
  selector: 'app-match-payment',
  templateUrl: './match-payment.component.html',
  styleUrls: ['./match-payment.component.css']
})

export class MatchPaymentComponent implements OnInit {
  displayedColumns: string[] = ['select', 'pledgeId', 'invoiceId', 'donorName', 'arId', 'creditAmount', 'country', 'installmentNo', 'paymentDate', 'status'];
  dataSource: MatTableDataSource<PaymentData>;
  selection = new SelectionModel<PaymentData>(true, []);
  isRowClicked: boolean = false;
  rowData: any;
  checkedRows: any;
  checkedArray: any[] = [];
  matchPaymentForm: FormGroup;
  searchForm: FormGroup;
  allItems: any[];
  pagedItems: any[];
  pager: any = {};
  key: string = 'pledgeId';
  order: boolean = false;
  constructor(private matchPaymentService: MatchPaymentService, private formBuilder: FormBuilder, private http: HttpClient,
    public dialog: MatDialog, private pagerService: PagerService, private spinnerService: Ng4LoadingSpinnerService,
    private changeDetectorRefs: ChangeDetectorRef, private sortService: SortService, private errorDialogService: ErrorDialogService) { }

  ngOnInit() {
    this.pageLoad();
    this.matchPaymentForm = this.formBuilder.group({
      transactionId: [''],
      arId: [''],
      invoiceId: [''],
      pledgeId: [''],
      creditAmount: [''],
      debitAmount: [''],
      balance: [''],
      installmentNo: [''],
      paymentDate: [''],
      donorName: [''],
      country: [''],
      status: ['']
    });
    this.searchForm = this.formBuilder.group({
      pledgeFundType: [''],
      pledgeId: [''],
      programName: [''],
      amount: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  pageLoad() {
    this.spinnerService.show();
    this.matchPaymentService.getAllMatchPayments().subscribe(
      (data) => {
        console.log("Data",data)
        if(data['message'] == "Record Not Found"){
          this.errorDialogService.openDialog(data['message']);
      }
        this.spinnerService.hide();
        this.allItems = data;
        this.tableSort('pledgeId');
        //this.setPage(1);
      },
      (error) => {
        console.log("Error: " + error)
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
  }

  onRevise() {
    console.log(this.matchPaymentForm);
    var myPostObject = this.matchPaymentForm.value;
    console.log("myPostObject", myPostObject)
  }

  cancelMatchPayment() {
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
        console.log("row", row)
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

  searchMatchPayment() {
    var searchFormData = this.searchForm.value;
    this.matchPaymentService.searchMatchPaymentService(searchFormData).subscribe(response => {
      this.allItems = response;
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  completed() {
    for (var i = 0; i < ((this.checkedRows).length); i++) {
      var myObject = {
        "pledgeId": null,
        "invoiceId": null,
        "donorName": null,
        "arId": null,
        "country": null,
        "debitAmount": null,
        "creditAmount": null,
        "balance": null,
        "installmentNo": null,
        "paymentDate": null,
        "status": null
      }
      myObject.pledgeId = this.checkedRows[i]["pledgeId"];
      myObject.arId = this.checkedRows[i]["arId"];
      myObject.country = this.checkedRows[i]["country"];
      myObject.debitAmount = this.checkedRows[i]["debitAmount"];
      myObject.installmentNo = this.checkedRows[i]["installmentNo"];
      myObject.creditAmount = this.checkedRows[i]["creditAmount"];
      myObject.balance = this.checkedRows[i]["balance"];
      myObject.paymentDate = this.checkedRows[i]["paymentDate"];
      myObject.donorName = this.checkedRows[i]["donorName"];
      myObject.invoiceId = this.checkedRows[i]["invoiceId"];
      myObject.status = "Payment Matched";
      this.checkedArray.push(myObject)
    }

    this.matchPaymentService.completed(myObject).subscribe(response => {
      if (response === "SUCCESS") {
        var dialogData = {
          "header": "Payment Completed",
          "data": " Payment completed successfully."
        }
      }
      if (response === "FAILURE") {
        var dialogData = {
          "header": "Payment Failed",
          "data": "Failed: Payment failed."
        }
      }
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
        height: '195px',
        width: '325px',
        data: dialogData

      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.pageLoad();
      });
    }, (err: HttpErrorResponse) => {
      console.log(Response);
      this.spinnerService.hide();
      this.errorDialogService.openDialog(err.message);
    });
  }
}