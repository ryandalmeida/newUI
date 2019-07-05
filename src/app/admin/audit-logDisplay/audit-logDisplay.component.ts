import { Component, OnInit, ViewChild, Input,Inject } from '@angular/core';
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
  searchForm = new FormGroup({
    auditLogId: new FormControl(),
    action: new FormControl(),
    content: new FormControl(),
    modifiedBy: new FormControl(),
    modifiedDate: new FormControl()
   });

  displayedColumns: string[] = [ 'auditLogId', 'action','content','modifiedBy', 'modifiedDate'];
  dataSource: MatTableDataSource<AuditLogData>;
  selection = new SelectionModel<AuditLogData>(true, []);
  isRowClicked : boolean = false;
  rowData;
  checkedRows;
  checkedArray: any[]=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() childMessage: boolean;
  auditLogDisplayForm: FormGroup;
  private allItems: any[];
  pagedItems: any[];
  checkedRowsObject;
  pager: any = {};

  submitted=false;
  constructor(private auditLogDisplayService: AuditLogDisplayService, private formBuilder: FormBuilder, private http: HttpClient,public dialog: MatDialog,private pagerService: PagerService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.pageLoad();
    //this.dataSource.paginator = this.paginator;
    console.log("testing")
    this.auditLogDisplayService.getAllAuditLog().subscribe(
      (data) => {

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log("Error: " + error)
      });

      this.auditLogDisplayForm = this.formBuilder.group({
       
    auditLogId:[''],
    action: [''],
    content: [''],
    modifiedBy: [''],
    modifiedDate: [''],
      
   });
  }

 

  pageLoad() {
    this.spinnerService.show();
    this.auditLogDisplayService.getAllAuditLog().subscribe(
      (data) => {
        this.spinnerService.hide();
        this.allItems = data;
        this.setPage(1);
      },
      (error) => {
        console.log("Error: " + error)
      });
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
    