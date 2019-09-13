import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuditLogData } from 'src/app/models/audit.log.model';
import { AuditLogDisplayService } from '../../services/auditLogDisplay.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PagerService } from 'src/app/services/pagerService.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SortService } from 'src/app/services/sortService.service';

@Component({
  selector: 'app-audit-logDisplay',
  templateUrl: './audit-logDisplay.component.html',
  styleUrls: ['./audit-logDisplay.component.css']
})

export class AuditLogDisplayComponent implements OnInit {
  searchForm: FormGroup;
  displayedColumns: string[] = ['auditLogId', 'action', 'content', 'modifiedBy', 'modifiedDate'];
  dataSource: MatTableDataSource<AuditLogData>;
  allItems: any[];
  pagedItems: any[];
  pager: any = {};
  auditLogDataAzure: any[];
  auditLogDataAWS: any[];
  key: string = 'startDate';
  order: boolean = false;
  constructor(private auditLogDisplayService: AuditLogDisplayService, private formBuilder: FormBuilder, private http: HttpClient, public dialog: MatDialog, private pagerService: PagerService, private spinnerService: Ng4LoadingSpinnerService, private sortService: SortService) { }

  ngOnInit() {
    this.pageLoad();
    this.searchForm = this.formBuilder.group({
      action: [''],
      modifiedBy: [''],
      modifiedDate: ['']
    });

  }

  pageLoad() {
    this.spinnerService.show();
    this.auditLogDisplayService.getAllAuditAzure().subscribe(
      (data) => {
        console.log("get pledge", data);
        this.spinnerService.hide();
        this.allItems = data;
        this.tableSort('startDate');
      },
      (err: HttpErrorResponse) => {
        console.log("Error: " , err);
        this.spinnerService.hide();
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
  }

  searchAuditLog() {
    var searchFormData = this.searchForm.value;
    if(searchFormData.modifiedBy == ""){
      searchFormData.modifiedBy = null;
    }
    if(searchFormData.modifiedDate == ""){
      searchFormData.modifiedDate = null;
    }
    if(searchFormData.action == "" || searchFormData.action == null){
      searchFormData.action = null;
    }else{
      searchFormData.action = (searchFormData.action).toUpperCase();
    }
    this.spinnerService.show();
    this.auditLogDisplayService.searchAuditLogData(searchFormData).subscribe(response => {
      this.spinnerService.hide();
      this.allItems = response;
        this.tableSort('startDate');
    }, (err: HttpErrorResponse) => {
      this.spinnerService.hide();
      console.log("ERROR:",err);
    });
  }

  cancelSearch(){
    this.pageLoad();
  }
}

