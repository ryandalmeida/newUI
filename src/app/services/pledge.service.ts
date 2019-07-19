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
    return this.http.get<PledgeData[]>(this.baseUrl_azure+'/pledge-api/pledge/getAll', this.azure_headers);
  }

  getNewPledge(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>(this.baseUrl_azure+'/pledge-api/pledge/getNew', this.azure_headers);
  }

  submitPledge(postObject): Observable<Object> {
    return this.http.post(this.baseUrl_aws+'/initiator-lambda', postObject, this.aws_headers);
  }

  searchPledge(postObject): Observable<Object[]> {
    return this.http.post<Object[]>(this.baseUrl_azure+'/pledge-api/pledge/search', postObject, this.azure_headers)
  }

  searchPledgeApprover(postObject) {
    return this.http.post<any>(this.baseUrl_azure+'/pledge-api/pledge/searchApprover', postObject, this.azure_headers)
  }

  approvePledge(postObject) {
    return this.http.post(this.baseUrl_aws+'/tasktokenpoller', postObject, this.aws_headers)
  }

  revisePledge(postObject) {
    return this.http.post(this.baseUrl_aws+'/tasktokenpoller', postObject, this.aws_headers)
  }
}