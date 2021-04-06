import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public API_BASE_URL = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  all = (): Promise<User[]> => this.http.get<User[]>(this.API_BASE_URL).toPromise();

  get = (id: string): Promise<User> => this.http.get<User>(`${this.API_BASE_URL}/${id}`).toPromise();

  increaseSongView = (id: string, songId: { song_id: string }): Promise<void> =>
    this.http.put<void>(`${this.API_BASE_URL}/${id}`, songId).toPromise()
      .catch(({error: {error}}) => {
        throw new Error(error);
      })
}
