import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

import {key} from 'src/rapid-api-key';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('reqres')) {
      return next.handle(request);
    }
    const clonedRequest = request.clone({
      method: 'GET',
      setHeaders: {
        'x-rapidapi-key': key,
        'x-rapidapi-host': 'hotels4.p.rapidapi.com',
      },
    });
    return next.handle(clonedRequest);
  }
}
