import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PledgeData } from '../models/pledge.model';
import { environment } from '../../environments/environment';

@Injectable()
export class LegalService {

  public baseUrl_azure : string = environment.azureService;
  public baseUrl_aws : string = environment.awsService;
  public azure_headers = { headers: new HttpHeaders().set('Azure-Auth', 'true') }
  public aws_headers = { headers: new HttpHeaders().set('aws-auth', 'true') }

  constructor(private http: HttpClient) { }

  getAllLegalrecords(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>(this.baseUrl_azure+'/pledge-api/pledge/getApproved', this.azure_headers);
  }

  getAllLegalRecordedbyDonor(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>(this.baseUrl_azure+'/pledge-api/pledge/getLegalRecordedByDonor', this.azure_headers);
  }

  onLegalSubmitWBGUser(postObject): Observable<Object> {
    return this.http.post(this.baseUrl_aws+'/tasktokenpoller', postObject, this.aws_headers)
  }

  onLegalSubmitDonor(postObject): Observable<Object> {
    return this.http.post(this.baseUrl_aws+'/tasktokenpoller', postObject, this.aws_headers)
  }

  getSign(postObject) {
    return this.http.post(this.baseUrl_azure+'/legal-api/legalAgreement/getSign', postObject, this.azure_headers)
  }

  search(postObject) {
    return this.http.post<any>(this.baseUrl_azure+'/legal-api/legalAgreement/searchLegalAgreement', postObject, this.azure_headers)
  }
}