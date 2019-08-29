import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PledgeData } from '../models/pledge.model';
import { environment } from '../../environments/environment';

@Injectable()
export class LegalService {

  public url_pledge : string = environment.pledgeServiceURL;
  public url_legal : string = environment.legalServiceURL;
  public pollerLambdaUrl: string = environment.pollerlambda;
  public headers = environment.headers;

  constructor(private http: HttpClient) { }

  getAllLegalrecords(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>(this.url_pledge+'/pledge/getApproved', this.headers);
  }

  getAllLegalRecordedbyDonor(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>(this.url_pledge+'/pledge/getLegalRecordedByDonor', this.headers);
  }

  getSign(postObject) {
    return this.http.post(this.url_legal+'/legalAgreement/getSign', postObject, this.headers)
  }

  search(postObject) {
    return this.http.post<any>(this.url_legal+'/legalAgreement/searchLegalAgreement', postObject, this.headers)
  }

  searchApprover(postObject) {
    return this.http.post<any>(this.url_legal+'/legalAgreement/searchLegalAgreementApprover', postObject, this.headers)
  }

  onLegalSubmitWBGUser(postObject): Observable<Object> {
    return this.http.post(this.pollerLambdaUrl, postObject, this.headers)
  }

  onLegalSubmitDonor(postObject): Observable<Object> {
    return this.http.post(this.pollerLambdaUrl, postObject,this.headers)
  }


}