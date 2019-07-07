import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PaymentData } from '../models/payment.model';

@Injectable()
export class MatchPaymentService {
    constructor(private http: HttpClient) { }

    searchMatchPaymentService(myPostObject) {
        return this.http.post<any>('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/processpayment-searchmatchpayment ', myPostObject, { headers: new HttpHeaders().set('aws-auth', 'true') })
    }

    completed(myPostObject) {
        return this.http.post<any>('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/tasktokenpoller', myPostObject, { headers: new HttpHeaders().set('aws-auth', 'true') })
    }

    getAllMatchPayments(): Observable<PaymentData[]> {
        return this.http.get<PaymentData[]>('https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test/processpayment-viewprocesspayment', { headers: new HttpHeaders().set('aws-auth', 'true') });
    }
}







