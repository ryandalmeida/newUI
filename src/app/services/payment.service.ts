import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PaymentData } from '../models/payment.model';
import { Adal6Service } from 'adal-angular6';
import { RequestOptions } from '@angular/http';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient) { }
  searchPayment(myPostObject) {
    return this.http.post<any>('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/processpayment-searchprocesspayment', myPostObject,  { headers: new HttpHeaders().set('aws-auth', 'true') })
  }

  submitPayment(myPostObject) {
    return this.http.post<any>('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller', myPostObject, { headers: new HttpHeaders().set('aws-auth', 'true') })
  }

  getAllProcessPayments(): Observable<PaymentData[]> {
    return this.http.get<PaymentData[]>('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/generatebillandinvoice-viewprocessinvoice', { headers: new HttpHeaders().set('aws-auth', 'true') });
  }
}







