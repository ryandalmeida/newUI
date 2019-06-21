
import { Injectable } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';


@Injectable()
export class AuthTokenService {

    constructor( private msAdalSvc: MsAdalAngular6Service) {
    }

getAuthToken() {
    return this.msAdalSvc.acquireToken('b0f49dbf-f119-4483-9850-1c47b19235a5');
   
  }

}