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
    //'http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/processPayment/searchProcessPayment'
    return this.http.post<any>(this.baseUrl_aws+'/processpayment-searchprocesspayment', postObject, this.aws_headers)
  }

  submitPayment(postObject) {
    return this.http.post<any>(this.baseUrl_aws+'/tasktokenpoller', postObject, this.aws_headers)
  }

  getAllProcessPayments(): Observable<PaymentData[]> {
    //this.baseUrl_aws+'/generatebillandinvoice-viewprocessinvoice'
    //'http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/generateBillandInvoice/viewProcessInvoice'
    return this.http.get<PaymentData[]>(this.baseUrl_aws+'/generatebillandinvoice-viewprocessinvoice', this.aws_headers);
  }
}







