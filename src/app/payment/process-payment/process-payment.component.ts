import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentData } from 'src/app/models/payment.model';
//import { PaymentService } from 'src/app/services/payment.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { Adal6Service } from 'adal-angular6';

@Component({
  selector: 'app-process-payment',
  templateUrl: './process-payment.component.html',
  styleUrls: ['./process-payment.component.css']
})
export class ProcessPaymentComponent implements OnInit {
  searchForm = new FormGroup({
  transaction_id: new FormControl(),
  ar_id: new FormControl(),
  invoice_id: new FormControl(),
  amount: new FormControl(),
  tax: new FormControl(),
  date: new FormControl()
    
  });

 displayedColumns: string[] = ['select','pledgeId', 'pledgeType', 'donorName', 'country', 'amount','debit', 'date', 'status'];
  dataSource: MatTableDataSource<PaymentData>;
   selection = new SelectionModel<PaymentData>(true, []);
   isRowClicked : boolean = false;
   rowData;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() childMessage: boolean;
  processPaymentForm: FormGroup;

  constructor( private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    // console.log("testing")
    // this.paymentService.getAllPledge().subscribe(
    //   (data) => {
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   },
    //   (error) => {
    //     console.log("Error: " + error)
    //   });

      this.processPaymentForm = this.formBuilder.group({
       transaction_id:[''],
       ar_id: [''],
       invoice_id: [''],
       amount: [''],
       tax: [''],
       date: ['']
  });
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


    
  
    store(){
      setTimeout(() => {
        //this.unselectedRows = this.selection.selected;
        console.log("unselectedRows: ", this.selection.selected);
        var myPostObject = this.selection.selected;

        let options = {
         // headers: new HttpHeaders().set('Authorization',`${this.adalSvc.userInfo.token}`).set('responseType','text')
        };

        /* "http://10.103.42.177:8080/pledge/approve" */
        this.http.post('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/pledge-approve'
          , myPostObject, options)
        .subscribe(response => {
          console.log(response);
        }, (err: HttpErrorResponse) => {
          console.log(err);
        });
      });
    }
}
