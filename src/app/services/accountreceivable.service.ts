import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { accountreceivableData } from '../models/accountreceivable.model';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable()
export class AccountreceivableService {
  public serviceUrl = 'https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/getLegalRecordedByApprover';
  result : accountreceivableData[]=[];
  authToken;
  awsToken;

  constructor(private http: HttpClient, private msAdalSvc: MsAdalAngular6Service) { }
  
  submitPledge(myPostObject): Observable<Object> {
    return this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/initiator-lambda", myPostObject, { headers: new HttpHeaders().set('aws-auth', 'true') });
  }

  getAllAR(): Observable<accountreceivableData[]> {
 return this.http.get<accountreceivableData[]>(this.serviceUrl,{ headers: new HttpHeaders().set('Azure-Auth', 'true') } );
  }
  submitAccountReceivable(myPostObject) :Observable<Object>{  
    return this.http.post("https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller", myPostObject, { headers: new HttpHeaders().set('aws-auth', 'true')});

  }
  searchaccountReceivable(myPostObject){
    return this.http.post<accountreceivableData[]>('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/accountreceivable-searchaccountreceivable',myPostObject,{ headers: new HttpHeaders().set('aws-auth', 'true')});
   
  }





}