import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Follower} from '../models/Follower';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  public API_BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  allFollowed = (id: string, offset: string = '', limit: string = ''): Promise<Follower[]> =>
    this.http.get<Follower[]>(`${this.API_BASE_URL}/users/${id}/followed?offset=${offset}&limit=${limit}`).toPromise()

  allFollowers = (id: string, offset: string = '', limit: string = ''): Promise<Follower[]> =>
    this.http.get<Follower[]>(`${this.API_BASE_URL}/users/${id}/followers?offset=${offset}&limit=${limit}`).toPromise()

  add = (id: string, userId: any): Promise<void> =>
    this.http.put<void>(`${this.API_BASE_URL}/users/${id}/followed`, userId).toPromise()
      .catch(({error: {error}}) => {
      throw new Error(error);
    })

  remove = (id: string, userId: string): Promise<void> =>
    this.http.delete<void>(`${this.API_BASE_URL}/users/${id}/followed/${userId}`).toPromise()
      .catch(({error: {error}}) => {
        throw new Error(error);
      })

  block = (id: string, userId: string): Promise<void> =>
    this.http.delete<void>(`${this.API_BASE_URL}/users/${id}/followers/${userId}`).toPromise()
      .catch(({error: {error}}) => {
        throw new Error(error);
      })
}
