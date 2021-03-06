import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Song} from '../models/Song';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  public API_BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  all = (filter: string = '', offset: string = '', limit: string = '', option: string = ''): Promise<Song[]> =>
    this.http.get<Song[]>(`${this.API_BASE_URL}/songs?filter=${filter}&offset=${offset}&limit=${limit}&option=${option}`).toPromise()
}
