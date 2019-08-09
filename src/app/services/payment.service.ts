import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PaymentData } from '../models/payment.model';
import { environment } from '../../environments/environment';

@Injectable()
export class PaymentService {

  public url: string = environment.processPaymentServiceURL;
  public pollerLambdaUrl: string = environment.pollerlambda;
  public headers = environment.headers;

  constructor(private http: HttpClient) { }
  
  searchPayment(postObject) {
    return this.http.post<any>(this.url+'/processPayment/searchProcessPayment', postObject, this.headers)
  }
  
  getAllProcessPayments(): Observable<PaymentData[]> {
    return this.http.get<PaymentData[]>(this.url+'/generateBillandInvoice/viewProcessInvoice', this.headers);
  }

  submitPayment(postObject) {
    return this.http.post<any>(this.pollerLambdaUrl, postObject, this.headers)
  }

}







