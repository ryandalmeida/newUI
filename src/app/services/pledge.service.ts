import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PledgeData } from '../models/pledge.model';

@Injectable()
export class PledgeService {

  constructor(private http: HttpClient) { }

  getAllPledge(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>('https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/getAll', { headers: new HttpHeaders().set('Azure-Auth', 'true') });
  }

  getNewPledge(): Observable<PledgeData[]> {
    return this.http.get<PledgeData[]>('https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/getNew', { headers: new HttpHeaders().set('Azure-Auth', 'true') });
  }

  submitPledge(myPostObject): Observable<Object> {
    return this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/initiator-lambda", myPostObject, { headers: new HttpHeaders().set('aws-auth', 'true') });
  }

  searchPledge(myPostObject) {
    return this.http.post<any>('https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/search', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  }

  approvePledge(myPostObject) {
    return this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller", myPostObject, { headers: new HttpHeaders().set('aws-auth', 'true') })
  }

  revisePledge(myPostObject) {
    return this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller", myPostObject, { headers: new HttpHeaders().set('aws-auth', 'true') })
  }
}