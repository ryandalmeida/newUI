import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PledgeData } from '../models/pledge.model';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { environment } from '../../environments/environment';

@Injectable()
export class PledgeService {
  public serviceUrl = 'https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/getNew';
  result: PledgeData[] = [];
  authToken;
  awsToken;
  localUrl;

  constructor(private http: HttpClient, private msAdalSvc: MsAdalAngular6Service) {
  }

  getAuthToken() {

    this.msAdalSvc.acquireToken('b0f49dbf-f119-4483-9850-1c47b19235a5').subscribe((resToken: string) => {
      console.log("checking microsoft token")
      console.log("microsoft", resToken);
      this.authToken = 'Bearer ' + resToken;
      this.awsToken = resToken;
    });
  }

  getAllPledge(): Observable<PledgeData[]> {
    this.getAuthToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', this.authToken)
    };
    //'https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/getNew'
    //'http://10.103.42.177:8000/pledge/getNew'
    return this.http.get<PledgeData[]>('https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/getNew', options);
  }

  submitPledge(myPostObject): Observable<Object> {
    let options = {
      headers: new HttpHeaders().set('Authorization', `${this.awsToken}`)
    };
    //"https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/initiator-lambda"
    //"http://10.103.42.177:8000/pledge/submit"
    return this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/initiator-lambda", myPostObject, options)
  }

  searchPledge(myPostObject) {
    console.log(myPostObject)
    this.getAuthToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', this.authToken)
    };
    //"https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/search"
    return this.http.post<any>('http://localhost:8000/pledge/search', myPostObject, options)
  }

  approvePledge(myPostObject) {
    let options = {
      headers: new HttpHeaders().set('Authorization', `${this.awsToken}`)
    };
    return this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller", myPostObject, options)
  }

  revisePledge(myPostObject) {
    this.getAuthToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', this.authToken).set('responseType', 'text')
    };
    return this.http.post("https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/revise", myPostObject, options)
  }
}