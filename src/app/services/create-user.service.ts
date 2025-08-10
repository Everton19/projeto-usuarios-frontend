import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _url = 'http://localhost:3000/create-user';

  create(userData: {name: string, email: string, username: string, password: string}){
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

    return this._httpClient.post<{message: string}>(`${this._url}`, userData, { headers }).pipe(
      map((createUserToken) => {
        return createUserToken;
      })
    );
  }
}
