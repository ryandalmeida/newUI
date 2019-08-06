import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuditLogData } from 'src/app/models/audit.log.model';
import { AuditLogDisplayService } from '../../services/auditLogDisplay.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { Adal6Service } from 'adal-angular6';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-audit-logDisplay',
  templateUrl: './audit-logDisplay.component.html',
  styleUrls: ['./audit-logDisplay.component.css']
})

export class AuditLogDisplayComponent implements OnInit {
  searchForm: FormGroup;
  displayedColumns: string[] = ['auditLogId', 'action', 'content', 'modifiedBy', 'modifiedDate'];
  dataSource: MatTableDataSource<AuditLogData>;
  selection = new SelectionModel<AuditLogData>(true, []);
  isRowClicked: boolean = false;
  rowData;
  checkedRows;
  checkedArray: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() childMessage: boolean;
  private allItems: any[];
  pagedItems: any[];
  checkedRowsObject;
  pager: any = {};
  auditLogDataAzure:any[];
  auditLogDataAWS:any[];
  output:any[]=[];
  submitted = false;
 /*  testData= [ 0: {}
  1: {audit_log_id: 44, content: "AccountReceivable [arId=0, pledgeId=3, country=Uni…t=11.0, pledgeFundType=Regular, programName=null]", modifiedBy: "Swati", modifiedDate: "2019-07-09T11:57:06.116+0000", action: "INSERTED"}
  2: {action: "INSERTED"
  audit_log_id: 352
  content: "Pledge [pledgeId=0, donorId=neema@gmail.com, donorName=Neema, country=United States, pledgeFundType=Regular, startDate=2019-06-09, endDate=2019-06-14, amount=5500001.0, paymentPeriod=2, installments=5, status=New, approvedBy=puneet, programName=Carbon Emission Reduction, comments=null]"
  modifiedBy: "Swati"
  modifiedDate: "2019-07-09T11:22:45.383+0000"

  ] */
  constructor(private auditLogDisplayService: AuditLogDisplayService, private formBuilder: FormBuilder, private http: HttpClient, public dialog: MatDialog, private pagerService: PagerService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.pageLoad();
    console.log("testing")
    this.searchForm = this.formBuilder.group({
      auditLogId: [''],
      action: [''],
      content: [''],
      modifiedBy: [''],
      modifiedDate: [''],
    });

  }

  innerfunction(){
   return this.auditLogDisplayService.getAllAuditLogAWS().map(
      res => {
        console.log("response",res)
      }
    )
  }

  pageLoad() {
    this.innerfunction().subscribe(result =>{
      console.log("result",result);
    })
     this.auditLogDisplayService.getAllAuditLogAWS().subscribe(
      (data) => {
        console.log("AWS", data, typeof(data));
        this.auditLogDataAWS = data;
       
         console.log("merged aw",this.auditLogDataAWS)
        var merged = Object.assign( this.auditLogDataAWS, this.auditLogDataAzure);
        console.log("merged",merged) 
      },
      (error) => {
        console.log("Error: " + error)
      });  

     this.auditLogDisplayService.getAllAuditLogAzure().subscribe(
      (data) => {
        console.log("azure", data, typeof(data))
        this.auditLogDataAzure = data;
        console.log("merged az",this.auditLogDataAzure)
       // this.getAwsData();
      },
      (error) => {
        console.log("Error: " + error)
      }); 

      /* var merged = Object.assign( this.auditLogDataAWS, this.auditLogDataAzure); */
     // console.log("merged",this.auditLogDataAzure, this.auditLogDataAWS)
      //console.log("combined data", this.auditLogData, typeof(this.auditLogData));
      //this.allItems = this.auditLogData;
      //console.log("combined data", this.allItems, typeof(this.allItems));
      //this.setPage(1);
  }

 /*  getAwsData(){
    this.auditLogDisplayService.getAllAuditLogAWS().subscribe(
      (data) => {
        console.log("AWS", data, typeof(data));
        this.auditLogDataAWS = data;
       
        console.log("merged aw",this.auditLogDataAWS, this.auditLogDataAzure);
        var merged = Object.assign( this.auditLogDataAWS, this.auditLogDataAzure);
        console.log("merged",merged)
      },
      (error) => {
        console.log("Error: " + error)
      });
  } */


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
    console.log("this.allitems", this.allItems)

    // get current page of items
   // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log("Table Data", this.pagedItems)
    this.dataSource = new MatTableDataSource(this.allItems);
    
    console.log("this.dataSource", this.dataSource)
    //this.dataSource.sort = this.sort;
    // this.changeDetectorRefs.detectChanges();
  }

  searchAuditLog() {
    var searchFormData = this.searchForm.value;
    this.auditLogDisplayService.searchAuditLogData(searchFormData).subscribe(response => {
      console.log("search", response, typeof (response));
      this.allItems = response;
      console.log(response)
      this.setPage(1);
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

}

  /*  for (var i = 0; i < this.auditLogData.length; i++) {
        var obj = {};

        for (var k = 0; k < this.auditLogData.keys.length; k++) {
            obj[this.auditLogData.keys[k]] = this.auditLogData[i][k];
        }

        this.output.push(obj);
    } */
    //console.log("output", this.output, typeof(this.output));
