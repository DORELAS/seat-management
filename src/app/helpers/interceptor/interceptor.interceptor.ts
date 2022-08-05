import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TokenService } from '../../services/token/token.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // GET THE TOKEN FROM THE TOKEN SERVICE
    let token = this.tokenService.getToken();

    // IF THERE IS A TOKEN CLONE THE REQUEST WITH THE DETERMINED HEADERS
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    // IF THE REQUEST HEADER NEEDS A CONTENT-TYPE THEN ADD IN THE CLONED REQUEST HEADER THE 'CONTENT-TYPE'
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }
    
    // CLONE THE REQUEST HEADER WHERE THE ACCEPT OBJECT MUST BE ADDED
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));
  }

}