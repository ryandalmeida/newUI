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
	  //this.baseUrl_azure+'/pledge-api/pledge/getLegalRecordedByApprover'
    return this.http.get<accountreceivableData[]>('http://10.168.42.156:8080/pledge/getLegalRecordedByApprover', this.azure_headers);
  }

  submitAccountReceivable(postObject): Observable<Object> {
	  //this.baseUrl_aws+'/tasktokenpoller'
    return this.http.post('https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/poller', postObject, this.aws_headers);
  }

  searchaccountReceivable(postObject) {
    //this.baseUrl_aws+'/accountreceivable-searchaccountreceivable'
    return this.http.post<accountreceivableData[]>('http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/accountReceivable/searchAccountReceivable', postObject, this.aws_headers);
  }
}