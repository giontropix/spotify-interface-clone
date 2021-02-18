import {Component, Input, OnInit} from '@angular/core';
import {SongsService} from '../../services/songs.service';
import {Song} from '../../models/Song';
import {User} from '../../models/User';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PlaylistsService} from '../../services/playlists.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddSongToPlaylistComponent} from '../dialogs/add-song-to-playlist/add-song-to-playlist.component';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {

  constructor(
    public songsService: SongsService,
    public dialog: MatDialog,
    public playlistsService: PlaylistsService,
    private snackBar: MatSnackBar
  ) { }
  @Input() user!: User;
  songs: Song[] = [];
  search = '';
  isSearch = false;

  getSearch = async () => this.songs = await this.songsService.all(this.search);

  getSongs = async () => this.songs = await this.songsService.all();

  openSnackBar = (message: string, action: string): void => {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  openDialogAddSongToPlaylist = (songId: string, songName: string): void => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {user: this.user._id};
    const dialogRef = this.dialog.open(AddSongToPlaylistComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.playlistsService.addToPlaylist(this.user._id, result.id, {songId});
        } catch (error: any) {
          return this.openSnackBar(error, 'Repeat!');
        }
        this.openSnackBar(`${songName} added to ${result.title}`, '');
      }
    });
  }

  ngOnInit(): void {
    this.getSongs();
  }

}
