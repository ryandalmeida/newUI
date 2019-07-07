import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LegalService } from 'src/app/services/legal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { PledgeData } from 'src/app/models/pledge.model';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';
import { ErrorDialogService } from 'src/app/error-dialog/errordialog.service';

@Component({
  selector: 'app-record-legal',
  templateUrl: './record-legal.component.html',
  styleUrls: ['./record-legal.component.css']
})
export class RecordLegalComponent implements OnInit {
  submitted = false;
  wbgBusinessUserSign: SignaturePad;
  displayedColumns: string[] = ['pledgeId', 'wbgProgram', 'pledgeType', 'donorName', 'country', 'amount', 'approver', 'startDate', 'endDate', 'status', 'recordlegalBtn',];
  dataSource: MatTableDataSource<PledgeData>;
  isRowClicked: boolean = false;
  rowData: any;
  signImage: any;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  recordLegalForm: FormGroup;
  searchForm: FormGroup;
  allItems: any[];
  pager: any = {};
  pagedItems: any[];
  key: string = 'pledgeId';
  order: boolean = false;

  constructor(private legalService: LegalService, public dialog: MatDialog, private formBuilder: FormBuilder, private pagerService: PagerService, private changeDetectorRefs: ChangeDetectorRef, private spinnerService: Ng4LoadingSpinnerService,
              private sortService: SortService, private errorDialogService: ErrorDialogService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      pledgeNo: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      programName: [''],
      paymentPeriod: [''],
      amount: [''],
      installments: ['']
    });

    this.recordLegalForm = this.formBuilder.group({
      pledgeId: [''],
      donorName: [''],
      wbg_program: [''],
      country: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      amount: [''],
      paymentPeriod: [''],
      noOfPayment: [''],
      donorSign: [''],
      wbgBusinessUserSign: ['', Validators.required]
    });
    this.pageload();
  }

  pageload() {
    this.spinnerService.show();
    this.legalService.getAllLegalRecordedbyDonor().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        this.tableSort('pledgeId');
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
    this.recordLegalForm.reset();
    this.isRowClicked = true;
    this.rowData = row;
    var legalFormData = this.rowData;
    this.legalService.getSign(legalFormData).subscribe(response => {
      this.signImage = JSON.stringify(response).substr(2).slice(0, -2);
    }, (err: HttpErrorResponse) => {
      console.log("err", err)
    })
  };

  onCancel() {
    this.isRowClicked = false;
    this.pageload();
  }

  selectRowBtn() {
    console.log("row details-BTN", this.rowData)
  }

  onLegalSubmit(row) {
    this.spinnerService.show();
    this.isRowClicked = true;
    this.rowData = row;
    this.recordLegalForm.value.pledgeId = row.pledgeId;
    this.recordLegalForm.value.wbgBusinessUserSign = this.signaturePad.toDataURL();
    this.recordLegalForm.value.status = "Legal Recorded by WBG User";
    if ((this.signaturePad.toDataURL().length) > 1600) {
      var legalFormData = this.recordLegalForm.value;
      this.legalService.onLegalSubmitWBGUser(legalFormData).subscribe(response => {
        console.log("response", response);
        if (response === "SUCCESS") {
          var dialogData = {
            "header": "Legal Document Signed",
            "data": " Legal document signed by business user successfully."
          }
        }
        if (response === "FAILURE") {
          var dialogData = {
            "header": "Legal Document Failed",
            "data": "Failed: Legal document creation by business user failed."
          }
        }
        this.spinnerService.hide();
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          height: '210px',
          width: '330px',
          data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {
          this.isRowClicked = false;
          this.pageload();
          console.log('The dialog was closed');
        });
      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.spinnerService.hide();
        this.errorDialogService.openDialog(err.message);
      });

    }
    else {
      var dialogData = {
        "header": "Legal Document Not Signed",
        "data": " Please sign the legal agreement."
      }
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
        height: '210px',
        width: '330px',
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
      this.signaturePad.clear();
    }
  }

  cancelLegal() {
    this.pageload();
  }

  searchLegal() {
    var searchFormData = this.searchForm.value;
    this.legalService.search(searchFormData).subscribe(response => {
      this.allItems = response;
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
}
