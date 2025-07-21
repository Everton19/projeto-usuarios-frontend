import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _httpClient = inject(HttpClient);
  private readonly _loginUrl = 'http://localhost:3000/';

  login(username: string, password: string):  Observable<{ token: string }> {
    return this._httpClient.post<{ token: string }>(this._loginUrl + 'login', {
      username: username,
      password: password
    });
  }
}
