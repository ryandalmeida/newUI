 import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { ErrorDialogService } from '../error-dialog/errordialog.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private MsAdalsvc: MsAdalAngular6Service,private errorDialogService: ErrorDialogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status !=200) {
                console.log(err.status)

                let data = {};
                data = {
                    reason: err && err.error.reason ? err.error.reason : 'Ow Snap!!! Looks like something went wrong!',
                    
                };
                this.errorDialogService.openDialog(data);  
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
} 