import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public API_BASE_URL = 'http://localhost:3000';

  isRegister = false;

  constructor(private http: HttpClient) {}

  register = async (mail: string, userName: string, password: string): Promise<void> =>
    this.http.post<void>(`${this.API_BASE_URL}/register`, {
      mail,
      user_name: userName,
      password
    }).toPromise().catch(({error: {error}}) => {
      throw new Error(error);
    })

  login = async (mail: string, password: string): Promise<void> =>
    this.http.get<void>(`${this.API_BASE_URL}/login`, {
      headers: {Accept: 'application/json', mail, password}}).toPromise().catch(({error: {error}}) => {
      throw new Error(error);
    })

  check = async (accessToken: string, refreshToken: string): Promise<void> => {
    this.http.get<void>(`${this.API_BASE_URL}/check`, {
      headers: {Accept: 'application/json', access_token: accessToken, refresh_token: refreshToken}})
      .toPromise()
      .catch(({error: {error}}) => {
        throw new Error(error);
      });
  }

  logout = async (accessToken: string, refreshToken: string): Promise<void> =>
    this.http.delete<void>(`${this.API_BASE_URL}/logout`, {
      headers: {Accept: 'application/json', access_token: accessToken, refresh_token: refreshToken}})
      .toPromise()
      .catch(({error: {error}}) => {
      throw new Error(error);
    })
}
