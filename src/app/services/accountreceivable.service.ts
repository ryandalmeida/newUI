import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { accountreceivableData } from '../models/accountreceivable.model';
//import { Adal6Service } from 'adal-angular6';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { environment } from 'src/environments/environment';
//import {AuthenticationContext} from 'adal-angular6/node_modules/adal-angular';
@Injectable()
export class AccountreceivableService {
  public serviceUrl = 'https://wbg-bpm-apim.azure-api.net/pledge-api/pledge/getLegalRecordedByApprover';
  //public serviceUrl = 'http://localhost:8000/pledge/getLegalRecordedByApprover';
  result : accountreceivableData[]=[];
  authToken;
  awsToken;


  constructor(private http: HttpClient, private msAdalSvc: MsAdalAngular6Service) { }
  
  getAuthToken() {

    this.msAdalSvc.acquireToken('b0f49dbf-f119-4483-9850-1c47b19235a5').subscribe((resToken: string) => {
      console.log("checking microsoft token")
      console.log("microsoft", resToken);
      this.authToken = 'Bearer ' + resToken;
      this.awsToken = resToken;
    });
  }

  getAllAR(): Observable<accountreceivableData[]> {

    this.getAuthToken();
    let options = {
      headers: new HttpHeaders().set('Authorization', this.authToken)
    };

       return this.http.get<accountreceivableData[]>(this.serviceUrl, options);
  }
  submitAccountReceivable(myPostObject) :Observable<Object>{
    let options = {
      headers: new HttpHeaders().set('Authorization',`${this.awsToken}`)
    };
    return this.http.post("http://localhost:8300/accountReceivable/submitAccountReceivable", myPostObject, options)

  }

  searchaccountReceivable(myPostObject){
    let options = {
      headers: new HttpHeaders().set('Authorization',`${this.awsToken}`)
    };
    return this.http.get<accountreceivableData[]>('http://localhost:8300/accountReceivable/searchAccountReceivable');
    //return this.http.post("http://10.103.42.177:8080/pledge/search", myPostObject, options)
  }





}