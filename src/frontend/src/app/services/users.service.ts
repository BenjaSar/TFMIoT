import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../model/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  urlApi: string = 'http://localhost:5000/api/v1/';
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'json',
  };
  constructor(private _http: HttpClient) {}

  async addUsers(user: Users): Promise<Users> {
    return await this._http
      .post(this.urlApi + 'users/create', {
        usersName: user.usersName,
        usersSurname: user.usersSurname,
        userPosition: user.userPosition,
        usersEmail: user.usersEmail,
        usersPasswords: user.usersPasswords,
        usersConfirmPasswords: user.usersConfirmPasswords,
      })
      .toPromise()
      .then((user: Users) => {
        return user;
      });
  }

  //TODO login user
  loginUser(user: any): Observable<any> {
    return this._http.post(this.urlApi + 'home-user', user);
  }

  //TODO obtener usuario por id
  async getUserById(id): Promise<Users> {
    return await this._http
      .get(this.urlApi + 'users/' + id)
      .toPromise()
      .then((user: Users) => {
        return user;
      });
  }
}
