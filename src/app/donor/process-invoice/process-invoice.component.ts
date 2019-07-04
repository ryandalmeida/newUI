
import { Component, OnInit, Input, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ProcessInvoiceService } from '../../services/process-invoice.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
//import { Adal6Service } from 'adal-angular6';
import { ProcessInvoice } from 'src/app/models/process-invoice.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PagerService } from 'src/app/services/pagerService.service';
import { SortService } from 'src/app/services/sortService.service';
@Component({
  selector: 'app-process-invoice',
  templateUrl: './process-invoice.component.html',
  styleUrls: ['./process-invoice.component.css']
})
export class ProcessInvoiceComponent implements OnInit {

  searchForm = new FormGroup({
    pledgeFundType: new FormControl(),
    pledgeId: new FormControl(),
    programName: new FormControl(),
    amount: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
  registerForm: FormGroup;
  submitted = false;
  displayedColumns: string[] = [ 'pledgeId', 'donorName', 'ar_id','pledgeFundType', 'invoice_no','debit','creditAmount', 'country', 'installment_no', 'startDate', 'endDate','payBtn'];
  dataSource: MatTableDataSource<ProcessInvoice>;
  selection = new SelectionModel<ProcessInvoice>(true, []);
  isRowClicked: boolean = false;
  rowData;
  createPledgeClicked: boolean = false;
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() childMessage: boolean;
  @ViewChild(MatSort) sort: MatSort;
  paymentForm: FormGroup;
  key: string = 'pledgeId'; 
  order: boolean = false;
  constructor(private pagerService: PagerService, private changeDetectorRefs: ChangeDetectorRef, private spinnerService: Ng4LoadingSpinnerService, private processinvoiceService: ProcessInvoiceService, private http: HttpClient, private formBuilder: FormBuilder,  public dialog: MatDialog,
    private sortService: SortService) { }

  ngOnInit() {

    console.log("childmsg dashboard", this.childMessage);
      this.paymentForm = this.formBuilder.group({
        pledgeId: [''],
        donorName: [''],
        startDate:[''],
        endDate:[''],
        arId:[''],
        country:[''],
        creditAmount:[''],
        debit:[''],
        installmentNo:[''],
        pledgeFundType:[''],
        status:[''],
        invoiceId:['']

      });

      this.searchForm = this.formBuilder.group({
        pledgeFundType: [''],
        pledgeId: [''],
        programName: [''],
        amount: [''],
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
        console.log(JSON.stringify(data));
        console.log("invoice",data);
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
    console.log("In set page")
    if (page < 1 || page > this.pager.totalPages) {
      console.log("inside if")
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    console.log("this.pager", this.pager)

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("Table Data", this.pagedItems)
    this.dataSource = new MatTableDataSource(this.pagedItems);
    //this.dataSource.sort = this.sort;
    this.changeDetectorRefs.detectChanges();
  }

  selectRow(row) {
    this.isRowClicked = true;
    this.rowData = row;
    console.log("row details", row, this.rowData);
 
  }

  selectRowBtn() {
   
    console.log("row details-BTN", this.rowData)
    
  }

  onPay(row){
    this.isRowClicked = true;
    this.rowData = row;
    console.log("legal submit clicked", row);


     this.paymentForm.value.arId= row.arId;
     this.paymentForm.value.invoiceId = row.invoiceId;
     this.paymentForm.value.debit=row.debit;
     this.paymentForm.value.creditAmount=row.creditAmount;
     this.paymentForm.value.pledgeId = row.pledgeId;
     this.paymentForm.value.startDate=row.startDate;
     this.paymentForm.value.endDate=row.endDate;
     this.paymentForm.value.pledgeFundType=row.pledgeFundType;
     this.paymentForm.value.country=row.country;
     this.paymentForm.value.donorName=row.donorName;
     this.paymentForm.value.installmentNo=row.installmentNo;
     this.paymentForm.value.status = "Paid";
    console.log("this",this.paymentForm.value.arId);
    console.log( "row",row.arId);
    console.log( "Form",this.paymentForm.value.installment_no);
    var legalFormData = this.paymentForm.value;
 /*    console.log( "row",row.installment_no); */
    console.log( legalFormData);
    this.spinnerService.show();
    this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller", legalFormData, { headers: new HttpHeaders().set('aws-auth', 'true') })
      .subscribe(response => {
        console.log(response);
        if(response === "SUCCESS"){
          var dialogData = {
            "header": "Invoice Processed", 
            "data":" Invoice processed successfully."
          }
        }
        if(response === "FAILURE"){
          var dialogData = {
            "header": "Invoice Failed", 
            "data":"Failed: Processing of invoice failed."
          }
        }
        this.spinnerService.hide();
        const dialogRef = this.dialog.open(ProcessInvoiceDialog, {
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
        this.spinnerService.hide();
      const dialogRef = this.dialog.open(ProcessInvoiceDialog, {
        height: '210px',
        width: '330px',
        data: err.message
      });
      dialogRef.afterClosed().subscribe(result => {
        this.isRowClicked = false;
        console.log('The dialog was closed');
      });
        console.log(err);
        this.isRowClicked = false;
        this.pageLoad();
      });
  }
}

  @Component({
  selector: 'recordLegal.component',
  templateUrl: 'recordLegaldialog-donor.component.html',
  styles:[

   
    `h1{background-color:#D9E9F5; border-bottom: 1px solid #2497F2 ;}
    
   
    overflow:none;

    .mat-dialog-container{
      padding: 0px !important;
  }
  `
   ]
})
export class ProcessInvoiceDialog {
  constructor(
    public dialogRef: MatDialogRef<ProcessInvoiceDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onClick() {
    console.log("DATA", this.data);
    
    this.dialogRef.close();

    
  }
}

  
  
  

  


