import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Playlist} from '../models/Playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  public API_BASE_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  all = (id: string, offset: string = '', limit: string = ''): Promise<any[]> =>
    this.http.get<any[]>(`${this.API_BASE_URL}/${id}/playlists?offset=${offset}&limit=${limit}`).toPromise()

  get = (id: string, listId: string): Promise<Playlist> =>
    this.http.get<Playlist>(`${this.API_BASE_URL}/${id}/playlists/${listId}`).toPromise()

  create = (id: string, title: any): Promise<void> =>
    this.http.post<void>(`${this.API_BASE_URL}/${id}/playlists`, title).toPromise()
      .catch(({error: {error}}) => {
        throw new Error(error);
      })

  delete = (id: string, playlistID: any): Promise<void> =>
    this.http.delete<void>(`${this.API_BASE_URL}/${id}/playlists/${playlistID}`).toPromise()
      .catch(({error: {error}}) => {
      throw new Error(error);
    })

  addToPlaylist = (id: string, playlistId: string, song: any): Promise<void> =>
    this.http.put<void>(`${this.API_BASE_URL}/${id}/playlists/${playlistId}/songs`, song).toPromise()
      .catch(({error: {error}}) => {
      throw new Error(error);
    })

  deleteFromPlaylist = (id: string, playlistId: string, songId: string): Promise<void> =>
    this.http.delete<void>(`${this.API_BASE_URL}/${id}/playlists/${playlistId}/songs/${songId}`).toPromise()
      .catch(({error: {error}}) => {
        throw new Error(error);
      })
}
