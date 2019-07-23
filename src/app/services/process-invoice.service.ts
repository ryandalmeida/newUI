import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProcessInvoice } from '../models/process-invoice.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ProcessInvoiceService {

  public baseUrl_aws : string = environment.awsService;
  public aws_headers = { headers: new HttpHeaders().set('aws-auth', 'true') }

  constructor(private http: HttpClient) { }

  getAllBillGenerated(): Observable<ProcessInvoice[]> {
    //this.baseUrl_aws+'/generatebillandinvoice-getallinvoicebillgenerated'
    return this.http.get<ProcessInvoice[]>('http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/generateBillandInvoice/getAllInvoiceBillGenerated', this.aws_headers);
  }

  submitInvoice(postObject): Observable<Object> {
	  //this.baseUrl_aws+'/tasktokenpoller'
    return this.http.post('https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/poller', postObject, this.aws_headers);
  }

  searchInvoice(postObject){
    //this.baseUrl_aws+'/generatebillandinvoice-searchprocessinvoice'
    return this.http.post<any[]>('http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com/generateBillandInvoice/searchProcessInvoice', postObject, this.aws_headers);
  }
}