import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "src/app/_share/services/authentication.services";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(this.authenticationService.userValue)
            // if ([401, 403].includes(err.status) && this.authenticationService.userValue.flag) {
            if ([401, 403].includes(err.status) || !this.authenticationService.userValue.flag) {
             
                this.authenticationService.logout();
            }
            const error = (err && err.error && err.error.message) || err.statusText;
            return throwError(error);
        }))
    }
}
