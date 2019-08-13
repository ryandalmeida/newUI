import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { AuthTokenService } from '../services/authToken.service';
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    authtoken: string;

    constructor(private authenticationService: MsAdalAngular6Service, private authService: AuthTokenService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService.getAuthToken().subscribe(response => {
            this.authtoken = response;
        });

        if (this.authenticationService.isAuthenticated) {
            let headers;
            if (request.headers.has('azure-auth')) {
                headers = request.headers.delete('azure-auth').set('Authorization', `Bearer ${this.authtoken}`);
            } else if (request.headers.has('aws-auth')) {
                headers = request.headers.delete('aws-auth').set('Authorization', `${this.authtoken}`);
            }
            headers ? request = request.clone({ headers }) : null;
        }
        return next.handle(request);
    }
}