import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LegalData } from '../models/legal.model';
import{MsAdalAngular6Service}from  'microsoft-adal-angular6';
import { environment } from 'src/environments/environment';
import { PledgeData } from '../models/pledge.model';

 
@Injectable()
export class LegalService {

  public getApprovedUrl = 'https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/getApproved';
  public getLegalDonorUrl = 'https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/getLegalRecordedByDonor';
  result: LegalData[] = [];
  authToken;
  awstoken;
  constructor(private http: HttpClient, private msAdalSvc: MsAdalAngular6Service) { }

  getAuthToken() {
    

    this.msAdalSvc.acquireToken('b0f49dbf-f119-4483-9850-1c47b19235a5').subscribe((resToken: string) => {
      console.log("checking microsoft token")
      console.log("microsoft",resToken);
      this.authToken= 'Bearer '+ resToken;
      this.awstoken=resToken;
    });
  }

  getAllLegalrecords(): Observable<PledgeData[]> {
    this.getAuthToken();

    let options = {
      headers: new HttpHeaders().set('Authorization', this.authToken)
    };
    return this.http.get<PledgeData[]>(this.getApprovedUrl, options);
  }


  getAllLegalRecordedbyDonor(): Observable<PledgeData[]> {

    this.getAuthToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', this.authToken)
    };
    return this.http.get<PledgeData[]>(this.getLegalDonorUrl, options);
  }

  onLegalSubmitWBGUser(myPostObject): Observable<Object> {
    let options = {
      headers: new HttpHeaders().set('Authorization', `${this.awstoken}`)
    };
    return this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller", myPostObject, options)
  }

  onLegalSubmitDonor(myPostObject): Observable<Object> {
    let options = {
      headers: new HttpHeaders().set('Authorization', `${this.awstoken}`)
    };
    return this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller", myPostObject, options)
  }

  getSign(myPostObject) {
    this.getAuthToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', this.authToken)
    };
    return this.http.post("https://wbg-bpm-apim.azure-api.net/legal-api/legalAgreement/getSign", myPostObject, options)
  }

  search(myPostObject) {
    this.getAuthToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', this.authToken)
    };
    return this.http.post<any>("https://wbg-bpm-apim.azure-api.net/legal-api/legalAgreement/searchLegalAgreement", myPostObject, options)
  }
}