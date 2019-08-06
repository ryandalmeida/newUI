import { HttpHeaders } from '@angular/common/http';

/* export const environment = {
  production: true
}; */

export const environment = {
  production: true,
  azureService : 'https://wbg-bpm-apim.azure-api.net',
  awsService : 'https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test',
  pledgeServiceURL: 'http://10.177.197.134:8080',
  legalServiceURL: 'http://10.177.197.134:8081',
  accountReceivableServiceURL: 'http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com',
  billingServiceURL:'http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com',
  processInvoiceServiceURL : 'http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com',
  processPaymentServiceURL: 'http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com',
  matchPaymentServiceURL: 'http://internal-ea-paas-backend-alb-738279272.us-east-1.elb.amazonaws.com',
  initiatorlambda :'https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/initiator',
  pollerlambda : 'https://q6r5yh21l2.execute-api.us-east-1.amazonaws.com/test/poller',
  headers : { headers: new HttpHeaders().set('Azure-Auth', 'true') },
  aws_headers : { headers: new HttpHeaders().set('aws-auth', 'true') }

};
