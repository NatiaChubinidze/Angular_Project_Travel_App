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
        'x-rapidapi-key': '218a3bc526msh45af1c5ed29b081p16aaeajsn2ee62334378d',
        'x-rapidapi-host': 'hotels4.p.rapidapi.com',
      },
    });
    return next.handle(clonedRequest);
  }
}
