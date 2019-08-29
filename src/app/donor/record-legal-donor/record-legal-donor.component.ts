import { Component, OnInit, ViewChild, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LegalService } from 'src/app/services/legal.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { PledgeData } from 'src/app/models/pledge.model';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';
import { SuccessDialogComponent } from 'src/app/common/success-dialog/successDialog.component';
import { ErrorDialogService } from 'src/app/error-dialog/errordialog.service';

@Component({
  selector: 'app-record-legal-donor',
  templateUrl: './record-legal-donor.component.html',
  styleUrls: ['./record-legal-donor.component.css']
})
export class RecordLegalComponentDonor implements OnInit {
  wbgBusinessUserSign: SignaturePad;
  displayedColumns: string[] = ['pledgeId', 'wbgProgram', 'pledgeType', 'donorName', 'country', 'amount', 'approver', 'startDate', 'endDate', 'status', 'recordlegalBtn',];
  dataSource: MatTableDataSource<PledgeData>;
  isRowClicked: boolean = false;
  rowData: any;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  recordLegalForm: FormGroup;
  searchForm: FormGroup;
  allItems: any[];
  pager: any = {};
  pagedItems: any[];
  key: string = 'pledgeId';
  order: boolean = false;

  constructor(private legalService: LegalService, public dialog: MatDialog, private formBuilder: FormBuilder, private pagerService: PagerService,
    private changeDetectorRefs: ChangeDetectorRef, private spinnerService: Ng4LoadingSpinnerService, private sortService: SortService, private errorDialogService: ErrorDialogService) { }

  pageload() {
    this.spinnerService.show();
    this.legalService.getAllLegalrecords().subscribe(
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

  ngOnInit() {
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
      installments: [''],
      donorSign: ['', Validators.required],
      wbgBusinessUserSign: ['']
    });

    this.searchForm = this.formBuilder.group({
      pledgeId: [''],
      pledgeFundType: [''],
      startDate: [''],
      endDate: [''],
      programName: [''],
      amount: [''],
    });

    this.pageload();
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
  }

  onCancel() {
    this.isRowClicked = false;
    this.pageload();
  }

  onLegalSubmit(row) {
    this.isRowClicked = true;
    this.rowData = row;
    this.spinnerService.show();
    this.recordLegalForm.value.pledgeId = row.pledgeId;
    this.recordLegalForm.value.donorName = row.donorName;
    this.recordLegalForm.value.status = "Legal Recorded by Donor";
    if(this.signaturePad == null){
      console.log("Signature is empty.")
    }else{
      this.recordLegalForm.value.donorSign = this.signaturePad.toDataURL();
      if ((this.signaturePad.toDataURL().length) > 1600) {
        var legalFormData = this.recordLegalForm.value;
        this.legalService.onLegalSubmitDonor(legalFormData)
          .subscribe(response => {
            if (response === "SUCCESS") {
              var dialogData = {
                "header": "Legal Document Signed",
                "data": " Legal document signed by donor successfully."
              }
            }
            if (response === "FAILURE") {
              var dialogData = {
                "header": "Legal Document Failed",
                "data": "Failed: Legal document creation by donor failed."
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
              this.pageload();
            });
          }, (err: HttpErrorResponse) => {
            console.log("Error", err);
            this.spinnerService.hide();
            this.errorDialogService.openDialog(err.message);
            this.isRowClicked = false;
            this.pageload();
          });
      }
      else {
        var dialogData = {
          "header": "Legal Document Not Signed",
          "data": "Please sign the legal agreement."
        }
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          height: '210px',
          width: '330px',
          data: dialogData
        });
        this.signaturePad.clear();
      }
    }
  }

  cancelLegalSearch() {
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





