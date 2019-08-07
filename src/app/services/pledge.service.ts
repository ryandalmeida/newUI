import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PledgeData } from '../models/pledge.model';
import { environment } from '../../environments/environment';

@Injectable()
export class PledgeService {

  public url : string = environment.pledgeServiceURL;
  public initiatorLambdaUrl: string = environment.initiatorlambda;
  public pollerLambdaUrl: string = environment.pollerlambda;
  public headers = environment.headers;

  constructor(private http: HttpClient) { }

  getAllPledge(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>(this.url+'/pledge/getAll',this.headers);
  }

  getNewPledge(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>(this.url+'/pledge/getNew', this.headers);
  }

  searchPledge(postObject): Observable<Object[]> {
    return this.http.post<Object[]>(this.url+'/pledge/search', postObject, this.headers)
  }

  searchPledgeApprover(postObject) {
    return this.http.post<any>(this.url+'/pledge/searchApprover', postObject, this.headers)
  }

  submitPledge(postObject): Observable<Object> {
    return this.http.post(this.initiatorLambdaUrl, postObject, this.headers);
  }

  approvePledge(postObject) {
    return this.http.post(this.pollerLambdaUrl, postObject, this.headers)
  }

  revisePledge(postObject) {
    return this.http.post(this.pollerLambdaUrl, postObject, this.headers)
  }
}