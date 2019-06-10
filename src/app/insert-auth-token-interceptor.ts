import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
 
@Injectable()
export class InsertAuthTokenInterceptor implements HttpInterceptor {
 
    constructor(private adal: MsAdalAngular6Service) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // get api url from adal config
        const resource = 'b0f49dbf-f119-4483-9850-1c47b19235a5';
        if (!resource || !this.adal.isAuthenticated) {
            return next.handle(req);
        }
 
        // merge the bearer token into the existing headers
        return this.adal.acquireToken(resource).pipe(
            mergeMap((token: string) => {
                const authorizedRequest = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${token}`),
                });
                return next.handle(authorizedRequest);
        }));
    }
}