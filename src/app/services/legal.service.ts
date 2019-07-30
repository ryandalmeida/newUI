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
	//this.baseUrl_azure+'/pledge-api/pledge/getApproved'
    return this.http.get<PledgeData[]>('http://10.168.42.189:8080/pledge/getApproved', this.azure_headers);
  }

  getAllLegalRecordedbyDonor(): Observable<PledgeData[]> {
	  //this.baseUrl_azure+'/pledge-api/pledge/getLegalRecordedByDonor'
    return this.http.get<PledgeData[]>('http://10.168.42.189:8080/pledge/getLegalRecordedByDonor', this.azure_headers);
  }

  onLegalSubmitWBGUser(postObject): Observable<Object> {
	  //this.baseUrl_aws+'/tasktokenpoller'
    return this.http.post('https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/poller', postObject, this.aws_headers)
  }

  onLegalSubmitDonor(postObject): Observable<Object> {
	  //this.baseUrl_aws+'/tasktokenpoller'
    return this.http.post('https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/poller', postObject, this.aws_headers)
  }

  getSign(postObject) {
	  //this.baseUrl_azure+'/legal-api/legalAgreement/getSign'
    return this.http.post('http://10.168.42.168:8080/legalAgreement/getSign', postObject, this.azure_headers)
  }

  search(postObject) {
	  //this.baseUrl_azure+'/legal-api/legalAgreement/searchLegalAgreement'
    return this.http.post<any>('http://10.168.42.168:8080/legalAgreement/searchLegalAgreement', postObject, this.azure_headers)
  }
}