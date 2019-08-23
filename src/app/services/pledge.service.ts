import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PledgeData } from '../models/pledge.model';
import { Adal6Service } from 'adal-angular6';
import { RequestOptions } from '@angular/http';
//import { RequestOptions } from '@angular/http';
@Injectable()
export class PledgeService {
  public serviceUrl = 'https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/pledge-getnew';
  //'http://52.168.108.138/pledge/getNew'; 
  //'https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/pledge-getnew';
  //'https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/pledge-getnew'
  /* 'http://10.103.42.177:8080/pledge/get'; */
  result : PledgeData[]=[];
  
  constructor(private http: HttpClient, private adalSvc: Adal6Service) { }
  
  getAllPledge(): Observable<PledgeData[]> {
   // this.result = this.http.get(this.serviceUrl);
  // let myHeaders = new Headers();
      // this.adalSvc.userInfo.token= this.adalSvc.userInfo.token+'abcsfg';
    //myHeaders.append('Authorization',`${this.adalSvc.userInfo.token}`);
   // let options = new RequestOptions({ headers: myHeaders});

    let options = {
         headers: new HttpHeaders().set('Authorization',`${this.adalSvc.userInfo.token}`)
       };


    return this.http.get<PledgeData[]>(this.serviceUrl, options);
  }

/*   getAllPledges() {
     //this.result = this.http.get(this.serviceUrl);
     this.http.get<PledgeData[]>(this.serviceUrl).subscribe((response) => {
         this.result = response;
         console.log("in service", response)
     });
     return this.result;
   } */
  
}