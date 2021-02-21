import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlaylistsService} from '../../../services/playlists.service';
import {Playlist} from '../../../models/Playlist';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Song} from '../../../models/Song';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public route: ActivatedRoute,
    public playlistsService: PlaylistsService,
    private snackBar: MatSnackBar
  ) { }
  displayedColumns: string[] = ['title', 'length', 'artist', 'genre', 'album', 'play', 'remove'];
  playlist!: Playlist;
  dataSource: Song[] = [];

  getPlaylist = async () => {
    const {user, id} = this.data;
    this.playlist = await this.playlistsService.get(user, id);
    this.dataSource = this.playlist._songs;
  }

  openSnackBar = (message: string, action: string): void => {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  deleteSong = async (songId: string, songTitle: string) => {
    const {user, id} = this.data;
    await this.playlistsService.deleteFromPlaylist(user, id, songId);
    this.snackBar.open( `Song "${songTitle}" removed from playlist "${this.playlist._title}"`);
    await this.getPlaylist();
  }

  ngOnInit(): void {
    this.getPlaylist();
  }

}
