import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _loginUrl = 'http://localhost:3000/';

  login(username: string, password: string): Observable<ILoginResponse> {
    const HEADERS = new HttpHeaders().set('useAuth', 'n');

    return this._httpClient
      .post<ILoginResponse>(
        this._loginUrl + 'login',
        {
          username: username,
          password: password,
        },
        { headers: HEADERS }
      )
      .pipe(
        map((tokenResponse) => {
          localStorage.setItem('token', tokenResponse.token);

          return tokenResponse;
        })
      );
  }
}
