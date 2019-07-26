import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Billing } from '../models/billing.model';
import { environment } from '../../environments/environment';

@Injectable()
export class BillingService {
 
  public baseUrl_aws : string = environment.awsService;
  public aws_headers = { headers: new HttpHeaders().set('aws-auth', 'true') }

  constructor(private http: HttpClient) { }

  getAllAR(): Observable<Billing[]> {
    //this.baseUrl_aws+'/accountreceivable-getactivear'
    return this.http.get<Billing[]>('http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/accountReceivable/getActiveAR', this.aws_headers);
  }

  search(searchFormData) {
    //this.baseUrl_aws+'/generateBillandInvoice-searchGenerateBilling'
    return this.http.post<Billing[]>('http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/generateBillandInvoice/searchGenerateBilling', searchFormData, this.aws_headers);
  }

  submitBill(submitObject): Observable<Object> {
	  //this.baseUrl_aws+'/tasktokenpoller'
    return this.http.post('https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/poller', submitObject, this.aws_headers);
  }
}