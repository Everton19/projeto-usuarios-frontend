import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (req.headers.get('useAuth') === 'n') {
    return next(req);
  }

  const NEW_REQUEST = req.clone({
    headers: req.headers.set(
      'authorization',
      'Bearer ' + localStorage.getItem('token')
    ),
  });
  return next(NEW_REQUEST);
}
