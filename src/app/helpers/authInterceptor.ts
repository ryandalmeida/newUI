import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { AuthTokenService } from '../services/authToken.service';
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    authtoken: string;
    role_Object;
    roleObject;

    constructor(private authenticationService: MsAdalAngular6Service, private authService: AuthTokenService) {
        this.role_Object=localStorage.getItem('Role');
        localStorage.removeItem('Role');
        this.roleObject=JSON.parse( this.role_Object);
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService.getAuthToken().subscribe(response => {
            this.authtoken = response;
        });

        if (this.authenticationService.isAuthenticated) {
            let headers;
            if (request.headers.has('azure-auth')) {
                headers = request.headers.delete('azure-auth').set('Authorization', `Bearer ${this.authtoken}`).set('ROLES', `${this.roleObject}`).set('uniqueName',`${this.authenticationService.userInfo.profile.unique_name}`);
            } 
            headers ? request = request.clone({ headers }) : null;
        }
        return next.handle(request);
    }
}