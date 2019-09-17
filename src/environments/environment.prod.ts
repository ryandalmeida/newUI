import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,
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
