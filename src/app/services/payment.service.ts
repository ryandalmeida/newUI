import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PaymentData } from '../models/payment.model';
import { Adal6Service } from 'adal-angular6';
import { RequestOptions } from '@angular/http';

@Injectable()
export class PaymentService {

  result : PaymentData[]=[];
  
  constructor(private http: HttpClient) { }
  
  searchPayment(myPostObject) {
    return this.http.post<any>('http://localhost:8000/processPayment/searchProcessPayment', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
    //return this.http.post<any>('http://10.103.42.178:8000/processPayment/searchProcessPayment', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  }

  
  submitPayment(myPostObject) {
    return this.http.post<any>('http://localhost:8000/processPayment/submitProcessPayment', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
    //return this.http.post<any>('http://10.103.42.178:8000/processPayment/submitProcessPayment', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  }


public serviceUrl1 = 'http://localhost:8000/processPayment/viewProcessPayment';
//public serviceUrl1 = 'http://10.103.42.178:8000/processPayment/viewProcessPayment';
result2 : PaymentData[]=[];
  
getAllProcessPayments(): Observable<PaymentData[]> {
   return this.http.get<PaymentData[]>(this.serviceUrl1);
}


searchMatchPaymentService(myPostObject) {
  return this.http.post<any>('http://localhost:8000/processPayment/searchMatchPayment', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  //return this.http.post<any>('http://10.103.42.178:8000/processPayment/searchMatchPayment', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
}


completed(myPostObject) {
  return this.http.post<any>('http://localhost:8000/processPayment/submitMatchPayment', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
  //return this.http.post<any>('http://10.103.42.178:8000/processPayment/submitMatchPayment', myPostObject, { headers: new HttpHeaders().set('Azure-Auth', 'true') })
}


public serviceUrl2 = 'http://localhost:8000/processPayment/viewMatchPayment';
//public serviceUrl2 = 'http://10.103.42.178:8000/processPayment/viewMatchPayment';
result5 : PaymentData[]=[];
  
getAllMatchPayments(): Observable<PaymentData[]> {
   return this.http.get<PaymentData[]>(this.serviceUrl2);
}

}







