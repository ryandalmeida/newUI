import { Component, OnInit, ViewChild, Input,Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentData } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
/* import { Adal6Service } from 'adal-angular6'; */

@Component({
  selector: 'app-process-payment',
  templateUrl: './process-payment.component.html',
  styleUrls: ['./process-payment.component.css']
})
export class ProcessPaymentComponent implements OnInit {
  

  displayedColumns: string[] = [ 'select','pledgeId', 'pledgeFundType','invoiceId','donorName', 'arId', 'creditAmount',  'debitAmount', 'country', 'installmentNo', 'paymentDate','status'];
  dataSource: MatTableDataSource<PaymentData>;
   selection = new SelectionModel<PaymentData>(true, []);
   isRowClicked : boolean = false;
   rowData;
   checkedRows;
   checkedArray: any[]=[];
   
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() childMessage: boolean;
  processPaymentForm: FormGroup;
  private allItems: any[];
  pagedItems: any[];
  checkedRowsObject;
  pager: any = {};
  searchForm: FormGroup;
  
  submitted = false;
  constructor(private paymentService: PaymentService, private formBuilder: FormBuilder, private http: HttpClient,public dialog: MatDialog,private pagerService: PagerService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {

    this.searchForm =this.formBuilder.group({
      pledgeFundType: [''],
      donorName: [''],
      country: [''],
      pledgeId: [''],
      startDate: [''],
      endDate: [''],
    });
    
    //this.dataSource.paginator = this.paginator;
    console.log("testing")
    this.paymentService.getAllProcessPayments().subscribe(
      (data) => {
        console.log("getProcesspayment response recievied",data)
        var i;
        for(i=0;i<data.length;i++){
          console.log("hiii"+data[i].debitAmount);
        }
        this.dataSource = new MatTableDataSource(data);
        console.log("Debit amount in response is"+this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log("Error: " + error)
      });

 /*      this.processPaymentForm = this.formBuilder.group({
       transactionId:[''],
       arId: [''],
       invoiceId: [''],
       pledgeId: [''],
       pledgeFundType: [''],
       creditAmount: [''],
       debitAmount:[''],
       installmentNo: [''],
       paymentDate: [''],
       donorName: [''],
       country: [''],
       status: ['']
  }); */
  }

  selectRow(row){
    this.isRowClicked = true;
    this.rowData = row;
    console.log("row details", row, this.rowData)
  }

  onCancel(){
    this.isRowClicked = false;
  }

  onRevise(){
    console.log(this.processPaymentForm);
    var myPostObject = this.processPaymentForm.value;
    console.log("myPostObject", myPostObject)
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

  cancelProcessPayment() {
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
        console.log("unselectedRows: ", this.selection.selected);
        this.checkedRows = this.selection.selected;
      });
    }
  
      searchProcessPayment() {
        var searchFormData = this.searchForm.value;
        this.paymentService.searchPayment(searchFormData).subscribe(response => {
          console.log("search....", response, typeof (response));
          this.allItems = response;
          console.log(response)
          this.setPage(1);
        }, (err: HttpErrorResponse) => {
          console.log(err);
        });
      }
  
    paymentReceived() {
      console.log("Inside paymentReceived.......", this.selection.selected);
      console.log("length"+this.checkedRows.length);
      
  /*  console.log("checked rows"+this.checkedRows);
      console.log("length"+this.checkedRows.length); */
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
            console.log("pledge id",this.checkedRows[i]["pledgeId"])
            console.log("myobject pledgeid",myObject.pledgeId)
            console.log("myobject", myObject)
          } 

          // console.log("array",this.checkedArray)
           console.log("myobjectttt", myObject);
           this.spinnerService.show();
            this.http.post('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller', myObject,{ headers: new HttpHeaders().set('aws-auth', 'true') })
            //this.http.post('http://10.103.42.178:8000/processPayment/submitProcessPayment', myObject)
              .subscribe(response => {
                console.log(response);
                if(response === "SUCCESS"){
                  var dialogData = {
                    "header": "Payment Received", 
                    "data":" Pyament received successfully."
                  }
                }
                if(response === "FAILURE"){
                  var dialogData = {
                    "header": "Payment Failed", 
                    "data":"Failed: payment failed."
                  }
                }
                this.spinnerService.hide();
                this.submitted = true;
                const dialogRef = this.dialog.open(ProcessPaymentDialog, {
                  height: '210px',
                  width: '330px',
                  data: dialogData
                });
      
                dialogRef.afterClosed().subscribe(result => {
                  console.log('The dialog was closed');
                  this.pageLoad();
                });
              }, (err: HttpErrorResponse) => {
                this.spinnerService.hide();
              const dialogRef = this.dialog.open(ProcessPaymentDialog, {
                height: '210px',
                width: '330px',
                data: err.message
              });
              dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
              });
                console.log(err);
                this.pageLoad();
              });
       }
    }


  
    export class ProcessPaymentDialog {
      constructor(
        public dialogRef: MatDialogRef<ProcessPaymentDialog>,
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