import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IUserRequest } from '../interfaces/user-request.interface';
import { ICreateUserResponse } from '../interfaces/create-user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _url = 'http://localhost:3000/create-user';

  create(userData: IUserRequest){
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token'));

    return this._httpClient.post<ICreateUserResponse>(`${this._url}`, userData, { headers }).pipe(
      map((createUserResponse) => {
        return createUserResponse;
      })
    );
  }
}
