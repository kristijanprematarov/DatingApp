import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  //either intercept the request that goes out or the response that comes back in the next
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(errorResponse => {
        if (errorResponse) {
          switch (errorResponse.status) {
            case 400:
              if (errorResponse.error.errors) {
                const modelStateErrors = [];

                for (const key in errorResponse.error.errors) {
                  if (errorResponse.error.errors[key]) {
                    modelStateErrors.push(errorResponse.error.errors[key]);//flatten the array of errors
                  }
                }

                throw modelStateErrors.flat();//useful to throw a list of errors under a form
              }
              else {
                this.toastr.error(errorResponse.error.title, errorResponse.status);
              }
              break;

            case 401:
              this.toastr.error("Unauthorized", errorResponse.status);
              break;

            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            case 500:
              const navigationExtras: NavigationExtras = { state: { error: errorResponse.error } };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.toastr.error('Something unexpected went wrong...')
              console.log(errorResponse);
              break;
          }
        }
        return throwError(errorResponse); //we should never hit this
      })
    );
  }
}
