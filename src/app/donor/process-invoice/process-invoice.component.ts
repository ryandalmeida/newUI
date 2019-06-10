
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
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
@Component({
  selector: 'app-process-invoice',
  templateUrl: './process-invoice.component.html',
  styleUrls: ['./process-invoice.component.css']
})
export class ProcessInvoiceComponent implements OnInit {

  searchForm = new FormGroup({
    pledgeNo: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    amount: new FormControl(),
    ar_id: new FormControl(),
   donorName: new FormControl(),
    country: new FormControl(),
    status: new FormControl(),
    pledgeFundType:new FormControl()
  });
  registerForm: FormGroup;
  submitted = false;
  displayedColumns: string[] = [ 'pledgeId', 'donorName', 'ar_id', 'invoice_no','amount',  'country', 'installment_no', 'startDate', 'endDate','payBtn'];
  dataSource: MatTableDataSource<ProcessInvoice>;
  selection = new SelectionModel<ProcessInvoice>(true, []);
  isRowClicked: boolean = false;
  rowData;
  createPledgeClicked: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() childMessage: boolean;
  @ViewChild(MatSort) sort: MatSort;
  paymentForm: FormGroup;
  constructor(private processinvoiceService: ProcessInvoiceService, private http: HttpClient, private formBuilder: FormBuilder,  public dialog: MatDialog) { }

  ngOnInit() {

    console.log("childmsg dashboard", this.childMessage);
    this.processinvoiceService.getAllBillGenerated().subscribe(
      (data) => {
        console.log(JSON.stringify(data));

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },

      (error) => {
        console.log("Error: " + error)
      });

      this.paymentForm = this.formBuilder.group({
        pledgeId: [''],
        donorName: [''],
        debit:[''],
        startDate:[''],
        endDate:[''],
        ar_id:[''],
        country:[''],
        amount: [''],
        installment_no:[''],
        status:[''],
        invoice_no:['']

      });

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

    console.log("this",this.paymentForm.value.arId);
    console.log( "row",row.arId);
    
    var legalFormData = this.paymentForm.value;
    console.log( "row",legalFormData);
    this.http.post("http://10.103.42.177:8082/generateBillandInvoice/payInvoice", legalFormData, { responseType: 'text' })
      .subscribe(response => {
        console.log(response);
        const dialogRef = this.dialog.open(ProcessInvoiceDialog, {
          data: response
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.pageload();
          console.log('The dialog was closed');

          this.isRowClicked = false;
    this.ngOnInit();
        });

        
      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.isRowClicked = false;
    this.ngOnInit();
      });

  }
}

  @Component({
  selector: 'recordLegal.component',
  templateUrl: 'recordLegaldialog-donor.component.html',
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

  
  
  

  


