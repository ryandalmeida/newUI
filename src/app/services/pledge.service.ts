import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PledgeData } from '../models/pledge.model';
import { environment } from '../../environments/environment';

@Injectable()
export class PledgeService {

  public baseUrl_azure : string = environment.azureService;
  public baseUrl_aws : string = environment.awsService
  public azure_headers = { headers: new HttpHeaders().set('Azure-Auth', 'true') }
  public aws_headers = { headers: new HttpHeaders().set('aws-auth', 'true') }

  constructor(private http: HttpClient) { }

  getAllPledge(): Observable<PledgeData[]> {
	  //this.baseUrl_azure+'/pledge-api/pledge/getAll'
    return this.http.get<PledgeData[]>('http://10.168.42.189:8080/pledge/getAll', this.azure_headers);
  }

  getNewPledge(): Observable<PledgeData[]> {
	  //this.baseUrl_azure+'/pledge-api/pledge/getNew'
    return this.http.get<PledgeData[]>('http://10.168.42.189:8080/pledge/getNew', this.azure_headers);
  }

  submitPledge(postObject): Observable<Object> {
	  //this.baseUrl_aws+'/initiator-lambda'
    return this.http.post('https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/initiator', postObject, this.aws_headers);
  }

  searchPledge(postObject): Observable<Object[]> {
	  //this.baseUrl_azure+'/pledge-api/pledge/search'
    return this.http.post<Object[]>('http://10.168.42.189:8080/pledge/search', postObject, this.azure_headers)
  }

  searchPledgeApprover(postObject) {
	  //this.baseUrl_azure+'/pledge-api/pledge/searchApprover'
    return this.http.post<any>('http://10.168.42.189:8080/pledge/searchApprover', postObject, this.azure_headers)
  }

  approvePledge(postObject) {
	  //this.baseUrl_aws+'/tasktokenpoller'
    return this.http.post('https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/poller', postObject, this.aws_headers)
  }

  revisePledge(postObject) {
	  //this.baseUrl_aws+'/tasktokenpoller'
    return this.http.post('https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/poller', postObject, this.aws_headers)
  }
}