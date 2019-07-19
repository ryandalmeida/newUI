import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { accountreceivableData } from '../models/accountreceivable.model';
import { environment } from '../../environments/environment';

@Injectable()
export class AccountreceivableService {

  public baseUrl_azure : string = environment.azureService;
  public baseUrl_aws : string = environment.awsService;
  public azure_headers = { headers: new HttpHeaders().set('Azure-Auth', 'true') }
  public aws_headers = { headers: new HttpHeaders().set('aws-auth', 'true') }

  constructor(private http: HttpClient) { }

  getAllAR(): Observable<accountreceivableData[]> {
    return this.http.get<accountreceivableData[]>(this.baseUrl_azure+'/pledge-api/pledge/getLegalRecordedByApprover', this.azure_headers);
  }

  submitAccountReceivable(postObject): Observable<Object> {
    return this.http.post(this.baseUrl_aws+'/tasktokenpoller', postObject, this.aws_headers);
  }

  searchaccountReceivable(postObject) {
    //this.baseUrl_aws+'/accountreceivable-searchaccountreceivable'
    return this.http.post<accountreceivableData[]>('http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/accountReceivable/searchAccountReceivable', postObject, this.aws_headers);
  }
}