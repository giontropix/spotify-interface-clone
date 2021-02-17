import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Song} from '../models/Song';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  public API_BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  all = (): Promise<Song[]> =>
    this.http.get<Song[]>(`${this.API_BASE_URL}/songs`).toPromise()
}
