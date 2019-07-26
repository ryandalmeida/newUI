import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PaymentData } from '../models/payment.model';
import { environment } from '../../environments/environment';

@Injectable()
export class PaymentService {
  public baseUrl_aws : string = environment.awsService;
  public aws_headers = { headers: new HttpHeaders().set('aws-auth', 'true') }

  constructor(private http: HttpClient) { }
  
  searchPayment(postObject) {
    //this.baseUrl_aws+'/processpayment-searchprocesspayment'
    return this.http.post<any>('http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/processPayment/searchProcessPayment', postObject, this.aws_headers)
  }

  submitPayment(postObject) {
	  //this.baseUrl_aws+'/tasktokenpoller'
    return this.http.post<any>('https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/poller', postObject, this.aws_headers)
  }

  getAllProcessPayments(): Observable<PaymentData[]> {
    //this.baseUrl_aws+'/generatebillandinvoice-viewprocessinvoice'
    return this.http.get<PaymentData[]>('http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/generateBillandInvoice/viewProcessInvoice', this.aws_headers);
  }
}







