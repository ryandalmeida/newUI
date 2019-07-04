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
  
  constructor(private http: HttpClient, private msAdalSvc: MsAdalAngular6Service) { }

  getAllLegalrecords(): Observable<PledgeData[]> {

    return this.http.get<PledgeData[]>(this.getApprovedUrl, { headers: new HttpHeaders().set('Azure-Auth', 'true') });
  }


  getAllLegalRecordedbyDonor(): Observable<PledgeData[]> {

    return this.http.get<PledgeData[]>(this.getLegalDonorUrl, { headers: new HttpHeaders().set('Azure-Auth', 'true') });
  }

  onLegalSubmitWBGUser(myPostObject): Observable<Object> {
   
    return this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller", myPostObject, {headers: new HttpHeaders().set('aws-auth', 'true') })
  }

  onLegalSubmitDonor(myPostObject): Observable<Object> {
    
    return this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller", myPostObject, {headers: new HttpHeaders().set('aws-auth', 'true') })
  }

  getSign(myPostObject) {
    //https://wbg-bpm-apim.azure-api.net/legal-api/legalAgreement/getSign
    return this.http.post("https://wbg-bpm-apim.azure-api.net/legal-api/legalAgreement/getSign", myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  }

  search(myPostObject) {
    
    return this.http.post<any>("https://wbg-bpm-apim.azure-api.net/legal-api/legalAgreement/searchLegalAgreement", myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  }
}