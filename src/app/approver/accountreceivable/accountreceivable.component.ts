import { Component, OnInit, ViewChild, Inject, Input, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { accountreceivableData } from 'src/app/models/accountreceivable.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { AccountreceivableService } from 'src/app/services/accountreceivable.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';
import { ErrorDialogService } from 'src/app/error-dialog/errordialog.service';
@Component({
  selector: 'app-accountreceivable',
  templateUrl: './accountreceivable.component.html',
  styleUrls: ['./accountreceivable.component.css']
})
export class AccountreceivableComponent implements OnInit {
  displayedColumns: string[] = ['pledgeId', 'pledgeType', 'donorName', 'country', 'amount', 'approver', 'startDate', 'endDate', 'action'];
  dataSource: MatTableDataSource<accountreceivableData>;
  isRowClicked: boolean = false;
  rowData: any;
  rowIndex: any;
  allItems: any[];
  pager: any = {};
  pagedItems: any[];
  initiateARForm: FormGroup;
  searchForm: FormGroup;
  key: string = 'pledgeId';
  order: boolean = false;

  constructor(private AccountreceivableService: AccountreceivableService, private changeDetectorRefs: ChangeDetectorRef, public dialog: MatDialog, private formBuilder: FormBuilder, private http: HttpClient, private msAdalSvc: MsAdalAngular6Service, private pagerService: PagerService, private spinnerService: Ng4LoadingSpinnerService,
    private sortService: SortService, private errorDialogService: ErrorDialogService) { }

  ngOnInit() {
    
    this.searchForm = this.formBuilder.group({
      amount: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      programName: [''],
      pledgeId: ['']
    });
    this.initiateARForm = this.formBuilder.group({
      pledgeId: [''],
      donorName: [''],
      country: [''],
      pledgeFundType: [''],
      accountNo: [''],
      bankName: [''],
      startDate: [''],
      endDate: [''],
      amount: [''],
      paymentPeriod: [''],
      installments: [''],
    });
    this.pageLoad();
  }

  pageLoad() {
    this.spinnerService.show();
    this.AccountreceivableService.getAllAR().subscribe(
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
  selectRow(row, index) {
    this.initiateARForm.reset();
    this.isRowClicked = true;
    this.rowData = row;
    this.rowIndex = index;
  }

  cancelARSearch() {
    this.pageLoad();
  }

  onCancel() {
    this.isRowClicked = false;
    this.pageLoad();
  }

  searchAR() {
    var searchFormData = this.searchForm.value;
    this.AccountreceivableService.searchaccountReceivable(searchFormData).subscribe(response => {
      this.allItems = response;
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
      console.log("Error: ",err);
    });
  }

  onARSubmit() {
    var row = this.rowData;
    this.initiateARForm.value.pledgeId = row.pledgeId;
    this.initiateARForm.value.country = row.country;
    this.initiateARForm.value.amount = row.amount;
    this.initiateARForm.value.paymentPeriod = row.paymentPeriod;
    this.initiateARForm.value.installments = row.installments;
    this.initiateARForm.value.donorName = row.donorName;
    this.initiateARForm.value.pledgeFundType = row.pledgeFundType;
    this.initiateARForm.value.startDate = row.startDate;
    this.initiateARForm.value.endDate = row.endDate;
    this.initiateARForm.value.status = "active";
    var myPostObject = this.initiateARForm.value;
    this.spinnerService.show();
    this.AccountreceivableService.submitAccountReceivable(myPostObject).subscribe(response => {
      if (response === "SUCCESS") {
        var dialogData = {
          "header": "Account Received",
          "data": " Account receivable initiated successfully."
        }
      }
      if (response === "FAILURE") {
        var dialogData = {
          "header": "Account Receivable Failed",
          "data": "Failed: Account receivable initiation failed."
        }
      }
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
        height: '210px',
        width: '330px',
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(result => {
        this.pageLoad();
        this.isRowClicked = false;
        console.log('The dialog was closed');
      });
    }, (err: HttpErrorResponse) => {
      this.spinnerService.hide();
      this.errorDialogService.openDialog(err.message);
      console.log(err.message);
    });
  }
}