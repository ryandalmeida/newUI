import { Component, OnInit, ViewChild, Input,Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentData } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { Adal6Service } from 'adal-angular6';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-match-payment',
  templateUrl: './match-payment.component.html',
  styleUrls: ['./match-payment.component.css']
})

export class MatchPaymentComponent implements OnInit {
  searchForm = new FormGroup({
  transactionId: new FormControl(),
  arId: new FormControl(),
  invoiceId: new FormControl(),
  pledgeId: new FormControl(),
  creditAmount: new FormControl(),
  debitAmount: new FormControl(),
  balance: new FormControl(),
  installmentNo: new FormControl(),
  paymentDate: new FormControl(),
  donorName: new FormControl(),
  country: new FormControl(),
  status: new FormControl(),
  startDate: new FormControl(),
  endDate: new FormControl(),
  pledgeNo: new FormControl()
  });

  displayedColumns: string[] = [ 'select','pledgeId', 'invoiceId','donorName', 'arId', 'creditAmount',  'debitAmount', 'balance','country', 'installmentNo', 'paymentDate','status'];
  dataSource: MatTableDataSource<PaymentData>;
  selection = new SelectionModel<PaymentData>(true, []);
  isRowClicked : boolean = false;
  rowData;
  checkedRows;
  checkedArray: any[]=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() childMessage: boolean;
  matchPaymentForm: FormGroup;
  private allItems: any[];
  pagedItems: any[];
  checkedRowsObject;
  pager: any = {};

  submitted=false;
  constructor(private paymentService: PaymentService, private formBuilder: FormBuilder, private http: HttpClient,public dialog: MatDialog,private pagerService: PagerService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.pageLoad();
    //this.dataSource.paginator = this.paginator;
    console.log("testing")
    this.pageLoad();
      this.matchPaymentForm = this.formBuilder.group({
       transactionId:[''],
       arId: [''],
       invoiceId: [''],
       pledgeId: [''],
       creditAmount: [''],
       debitAmount:[''],
       balance: [''],
       installmentNo: [''],
       paymentDate: [''],
       donorName: [''],
       country: [''],
       status: ['']
   });
  }

  selectRow(row){
    this.isRowClicked = true;
    this.rowData = row;
    console.log("row details....", row, this.rowData)
  }

  onCancel(){
    this.isRowClicked = false;
  }

  onRevise(){
    console.log(this.matchPaymentForm);
    var myPostObject = this.matchPaymentForm.value;
    console.log("myPostObject", myPostObject)
  }


  pageLoad() {
    this.spinnerService.show();
    this.paymentService.getAllProcessPayments().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        this.setPage(1);
      },
      (error) => {
        console.log("Error: " + error)
      });
  }

  cancelMatchPayment() {
    this.pageLoad();
    this.searchForm.reset();
  }


    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      debugger;
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => {
            console.log("row",row)
            this.selection.select(row)
          });
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row): string {
      if (!row) {
        return `{this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pledgeId + 1}`;
    }

    store() {
      setTimeout(() => {
        //this.unselectedRows = this.selection.selected;
        console.log("unselectedRows: ", this.selection.selected);
        this.checkedRows = this.selection.selected;
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
     this.dataSource.sort = this.sort;
    // this.changeDetectorRefs.detectChanges();
    }
  
    
    searchMatchPayment() {
      var searchFormData = this.searchForm.value;
      this.paymentService.searchMatchPaymentService(searchFormData).subscribe(response => {
        console.log("search", response, typeof (response));
        this.allItems = response;
        console.log(response)
        this.setPage(1);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
    }

    completed() {
      console.log("Inside complete Match Payment.......", this.rowData);
    
       /* 
      this.isRowClicked = true;
    this.searchForm.value.arId = this.rowData.arId;
    this.searchForm.value.pledgeId = this.rowData.pledgeId;
    this.searchForm.value.invoiceId = this.rowData.invoiceId;
    this.searchForm.value.status = this.rowData.status;
    this.searchForm.value.country = this.rowData.country;
    this.searchForm.value.donorName = this.rowData.donorName;
    this.searchForm.value.creditAmount = this.rowData.creditAmount;
    this.searchForm.value.debitAmount = this.rowData.debitAmount;
    this.searchForm.value.installmentNo = this.searchForm.value.installmentNo;
    this.searchForm.value.paymentDate = this.rowData.paymentDate;
   
    var myPostObject = this.searchForm.value;
    console.log("myPostObject", myPostObject)
*/
     
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
                myObject.status = this.checkedRows[i]["status"];
                this.checkedArray.push(myObject)
            console.log("pledge id",this.checkedRows[i]["pledgeId"])
            console.log("myobject pledgeid",myObject.pledgeId)
            console.log("myoobject", myObject)
          }

            this.http.post('http://localhost:8000/processPayment/submitMatchPayment', myObject)
           // this.http.post('http://10.103.42.178:8000/processPayment/submitMatchPayment', myObject)
            .subscribe(response => {
              
                this.submitted = true;
              
                const dialogRef = this.dialog.open(MatchPaymentDialog, {
                  data: response
                
                });
      
                dialogRef.afterClosed().subscribe(result => {
                  console.log('The dialog was closed');
                  if (this.searchForm.invalid) {
                    return;
                  }
                 this.searchForm.reset();
                });
              }, (err: HttpErrorResponse) => {
                console.log(Response);
                console.log(err);
              });
      }
    }


    export class MatchPaymentDialog {
      constructor(
        public dialogRef: MatDialogRef<MatchPaymentDialog>,
        @Inject(MAT_DIALOG_DATA) public data) {
      }
    
      onNoClick(): void {
        this.dialogRef.close();
      }
    
      onClick() {
        console.log("DATA", this.data);
        this.dialogRef.close();
      }
    }
    