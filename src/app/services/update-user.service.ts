import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IUserRequest } from '../interfaces/user-request.interface';
import { IUpdateUserResponse } from '../interfaces/update-user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _url = 'http://localhost:3000/update-user';

  update(userData: IUserRequest) {
    return this._httpClient.put<IUpdateUserResponse>(`${this._url}`, userData).pipe(
      map((updateUserToken) => {
        localStorage.setItem('token', updateUserToken.token);

        return updateUserToken;
      })
    );
  }
}
