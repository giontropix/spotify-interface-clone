import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PlaylistsService} from '../../../services/playlists.service';

@Component({
  selector: 'app-add-song-to-playlist',
  templateUrl: './add-song-to-playlist.component.html',
  styleUrls: ['./add-song-to-playlist.component.css']
})
export class AddSongToPlaylistComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public playlistsService: PlaylistsService
  ) { }

  playlists: any[] = [];

  getPlaylists = async () => this.playlists = await this.playlistsService.all(this.data.user);

  ngOnInit(): void {
    this.getPlaylists();
  }

}
