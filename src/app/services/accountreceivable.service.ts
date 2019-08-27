import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { accountreceivableData } from '../models/accountreceivable.model';
import { environment } from '../../environments/environment';

@Injectable()
export class AccountreceivableService {

  public url_pledge: string = environment.pledgeServiceURL;
  public url_ar: string = environment.accountReceivableServiceURL;
  public pollerLambdaUrl: string = environment.pollerlambda;
  public headers = environment.headers;

  constructor(private http: HttpClient) { }

  getAllAR(): Observable<accountreceivableData[]> {
    return this.http.get<accountreceivableData[]>(this.url_pledge + '/pledge/getLegalRecordedByApprover', this.headers);
  }

  searchaccountReceivable(postObject) {
    return this.http.post<accountreceivableData[]>(this.url_pledge+'/pledge/searchAR', postObject, this.headers);
  }

  submitAccountReceivable(postObject): Observable<Object> {
    return this.http.post(this.pollerLambdaUrl, postObject, this.headers);
  }
}