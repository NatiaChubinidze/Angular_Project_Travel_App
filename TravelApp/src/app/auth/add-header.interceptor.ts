import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable({
  providedIn:'root',
})
export class HttpHeaderInterceptor implements HttpInterceptor {
  
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(!request.url.includes("reqres")){
      return next.handle(request);
    }
    const clonedRequest = request.clone({
      setHeaders: {
        'content-type': 'application/json'
      },
    });
    return next.handle(clonedRequest);
  
  }
}