
import { Injectable } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';


@Injectable()
export class AuthTokenService {

  constructor(private msAdalSvc: MsAdalAngular6Service) { }

  getAuthToken() {
    return this.msAdalSvc.acquireToken('aab07566-64b5-4ad7-a180-4dc881196361');
  }

}