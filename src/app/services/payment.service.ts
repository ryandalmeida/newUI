// import { Injectable }   from '@angular/core';
// import { HttpClient, HttpHeaders }   from '@angular/common/http';
// import { Observable }   from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import { PaymentData } from '../models/payment.model';
// import { Adal6Service } from 'adal-angular6';
// import { RequestOptions } from '@angular/http';
// //import { RequestOptions } from '@angular/http';
// @Injectable()
// export class PaymentService {
//  // public serviceUrl = 'https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/pledge-getnew';
//  public serviceUrl='http://10.103.42.177:8000/pledge/getNew';
//   /* 'http://10.103.42.177:8080/pledge/get'; */
//   result : PaymentData[]=[];
  
//   constructor(private http: HttpClient, private adalSvc: Adal6Service) { }
  
//   getAllPledge(): Observable<PaymentData[]> {
//    // this.result = this.http.get(this.serviceUrl);
//   // let myHeaders = new Headers();
//       // this.adalSvc.userInfo.token= this.adalSvc.userInfo.token+'abcsfg';
//     //myHeaders.append('Authorization',`${this.adalSvc.userInfo.token}`);
//    // let options = new RequestOptions({ headers: myHeaders});

//     let options = {
//          headers: new HttpHeaders().set('Authorization',`${this.adalSvc.userInfo.token}`)
//        };

//     return this.http.get<PaymentData[]>(this.serviceUrl, options);
//   }

// /*   getAllPledges() {
//      //this.result = this.http.get(this.serviceUrl);
//      this.http.get<PledgeData[]>(this.serviceUrl).subscribe((response) => {
//          this.result = response;
//          console.log("in service", response)
//      });
//      return this.result;
//    } */
  
// }