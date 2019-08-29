
import { Component, OnInit, Input, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'rxjs/add/observable/of';

import { ProcessInvoice } from 'src/app/models/process-invoice.model';
import { PagerService } from 'src/app/services/pagerService.service';
import { SortService } from 'src/app/services/sortService.service';
import { ProcessInvoiceService } from '../../services/process-invoice.service';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';
import { ErrorDialogService } from 'src/app/error-dialog/errordialog.service';

@Component({
  selector: 'app-process-invoice',
  templateUrl: './process-invoice.component.html',
  styleUrls: ['./process-invoice.component.css']
})
export class ProcessInvoiceComponent implements OnInit {
  registerForm: FormGroup;
  paymentForm: FormGroup;
  searchForm: FormGroup;
  displayedColumns: string[] = ['pledgeId', 'donorName', 'ar_id', 'pledgeFundType', 'invoice_no', 'debit', 'creditAmount', 'country', 'installment_no', 'startDate', 'endDate', 'payBtn'];
  dataSource: MatTableDataSource<ProcessInvoice>;
  createPledgeClicked: boolean = false;
  isRowClicked: boolean = false;
  rowData: any;
  allItems: any[];
  pager: any = {};
  pagedItems: any[];
  key: string = 'pledgeId';
  order: boolean = false;

  constructor(private pagerService: PagerService, private changeDetectorRefs: ChangeDetectorRef, private spinnerService: Ng4LoadingSpinnerService, private processinvoiceService: ProcessInvoiceService,
    private http: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog, private sortService: SortService, private errorDialogService: ErrorDialogService) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
        pledgeId: [''],
        donorName: [''],
        startDate: [''],
        endDate: [''],
        arId: [''],
        country: [''],
        creditAmount: [''],
        debit: [''],
        installmentNo: [''],
        invoiceId: ['']
    });

    this.searchForm = this.formBuilder.group({
      pledgeFundType: [''],
      pledgeId: [''],
      country: [''],
      donorName: [''],
      startDate: [''],
      endDate: ['']
    });

    this.pageLoad();
  }

  tableSort(key) {
    this.key = key;
    this.order = !this.order;
    this.allItems = this.sortService.tableSort(this.key, this.order, this.allItems);
    this.setPage(1);
  }

  pageLoad() {
    this.processinvoiceService.getAllBillGenerated().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        this.tableSort('pledgeId');
      },
      (error) => {
        console.log("Error: " , error);
        this.spinnerService.hide();
        this.errorDialogService.openDialog(error);
      });
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

  onPay(row) {
    this.isRowClicked = true;
    this.rowData = row;
    this.paymentForm.value.arId = row.arId;
    this.paymentForm.value.invoiceId = row.invoiceId;
    this.paymentForm.value.debit = row.debit;
    this.paymentForm.value.creditAmount = row.creditAmount;
    this.paymentForm.value.pledgeId = row.pledgeId;
    this.paymentForm.value.startDate = row.startDate;
    this.paymentForm.value.endDate = row.endDate;
    this.paymentForm.value.pledgeFundType = row.pledgeFundType;
    this.paymentForm.value.country = row.country;
    this.paymentForm.value.donorName = row.donorName;
    this.paymentForm.value.installmentNo = row.installmentNo;
    this.paymentForm.value.status = "Paid";
    var legalFormData = this.paymentForm.value;
    this.spinnerService.show();
    this.processinvoiceService.submitInvoice(legalFormData).subscribe(response => {
      if (response === "SUCCESS") {
        var dialogData = {
          "header": "Invoice Processed",
          "data": " Invoice processed successfully."
        }
      }
      if (response === "FAILURE") {
        var dialogData = {
          "header": "Invoice Failed",
          "data": "Failed: Processing of invoice failed."
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
        this.isRowClicked = false;
        this.pageLoad();
      });
    }, (err: HttpErrorResponse) => {
      console.log("Error: ", err);
      this.spinnerService.hide();
      this.errorDialogService.openDialog(err.message);
      this.isRowClicked = false;
      this.pageLoad();
    });
  }

  cancelInvoiceSearch(){
    this.pageLoad();
  }

  searchProcessInvoice(){
    var searchFormData = this.searchForm.value;
    this.processinvoiceService.searchInvoice(searchFormData).subscribe(response => {
      this.allItems = response;
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
}







