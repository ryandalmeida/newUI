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
  pledgeServiceURL: 'https://wbgeabpmservicesaz.worldbankgroup.org',
  legalServiceURL: 'https://wbgeabpmservicesalbaz.worldbankgroup.org',
  accountReceivableServiceURL: 'https://wbgeabpmservicesalbaws.worldbankgroup.org',
  billingServiceURL:'https://wbgeabpmservicesalbaws.worldbankgroup.org',
  processInvoiceServiceURL : 'https://wbgeabpmservicesalbaws.worldbankgroup.org',
  processPaymentServiceURL: 'https://wbgeabpmservicesalbaws.worldbankgroup.org',
  matchPaymentServiceURL: 'https://wbgeabpmservicesalbaws.worldbankgroup.org',
  userRoleServiceURL:'https://wbgeabpmservicesprem.worldbankgroup.org:9090',
  auditAzure:'https://wbgeabpmwebalb.worldbankgroup.org',
  auditAWS:'https://wbgeabpmservicesalbaws.worldbankgroup.org',
  initiatorlambda :'https://wbgeabpmservicesaws.worldbankgroup.org/initiator',
  pollerlambda : 'https://wbgeabpmservicesaws.worldbankgroup.org/poller',
  headers : { headers: new HttpHeaders().set('Azure-Auth', 'true') },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
