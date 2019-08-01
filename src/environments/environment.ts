import { HttpHeaders } from '@angular/common/http';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* export const environment = {
  production: false
}; */

export const environment = {
  production: false,
  azureService : 'https://wbg-bpm-apim.azure-api.net',
  awsService : 'https://5ufe1v6q92.execute-api.us-east-1.amazonaws.com/test',
  pledgeServiceURL: 'http://10.168.42.166:8080',
  legalServiceURL: 'http://10.168.42.189:8080',
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


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
