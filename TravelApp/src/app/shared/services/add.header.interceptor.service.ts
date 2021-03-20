import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = request.clone({
      method: 'GET',
      setHeaders: {
        'x-rapidapi-key': '272fed8f58msh8e4b690dee67116p10ffe8jsn96b825cee07d',
        'x-rapidapi-host': 'hotels4.p.rapidapi.com',
      },
    });
    return next.handle(clonedRequest);
  }
}
