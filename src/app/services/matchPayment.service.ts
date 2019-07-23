import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PaymentData } from '../models/payment.model';
import { environment } from '../../environments/environment';

@Injectable()
export class MatchPaymentService {
    
    public baseUrl_aws : string = environment.awsService;
    public aws_headers = { headers: new HttpHeaders().set('aws-auth', 'true') }

    constructor(private http: HttpClient) { }

    searchMatchPaymentService(postObject) {
        //this.baseUrl_aws+'/processpayment-searchmatchpayment'
        return this.http.post<any>('http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/processPayment/searchMatchPayment', postObject, this.aws_headers)
    }

    completed(postObject) {
		//this.baseUrl_aws+'/tasktokenpoller'
        return this.http.post<any>('https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/poller', postObject, this.aws_headers)
    }

    getAllMatchPayments(): Observable<PaymentData[]> {
        //this.baseUrl_aws+'/processpayment-viewprocesspayment'
        return this.http.get<PaymentData[]>('http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/processPayment/viewProcessPayment', this.aws_headers);
    }
}







