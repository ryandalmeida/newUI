import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { PledgeService } from '../../services/pledge.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { PledgeData } from '../../models/pledge.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm = new FormGroup({
    country: new FormControl(),
    pledgeFundType: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    status: new FormControl(),
    donorName: new FormControl(),
    ar_no: new FormControl(),
    invoice_no: new FormControl()
  });

  displayedColumns: string[] = ['pledgeId', 'donorName', 'ar_no', 'invoice_no', 'amount', 'country', 'installments', 'startDate', 'endDate'];
  dataSource: MatTableDataSource<PledgeData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() childMessage: boolean;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private pledgeService: PledgeService, private http: HttpClient) { }

  ngOnInit() {
    console.log("childmsg", this.childMessage);
    this.pledgeService.getAllPledge().subscribe(
      (data) => {
        console.log("dataaa",data)
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log("Error: " + error)
      });
  }

  searchPledge() {
    console.log("search clicked", this.searchForm.value);

    var searchFormData = this.searchForm.value;

   this.http.post("http://10.103.42.177:8080/pledge/search", searchFormData, {responseType: 'json'})
           .subscribe(response => {
             //debugger;
             console.log("search",response, typeof(response));
           },(err: HttpErrorResponse) => {
             console.log(err);
         }); 
  }
}
