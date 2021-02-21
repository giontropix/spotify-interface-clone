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
  @Input() songToPlayFromPlaylist: Song | undefined;
  playFromPlaylist = false;
  songs: Song[] = [];
  allSongs: Song[] = [];
  search = '';
  isSearching = false;
  songsOffset = 0;
  songsLimit = 9;
  isListening = false;
  currentSong = '';
  currentArtist = '';
  songUrl = '';

  getSearch = async () => this.songs = await this.songsService.all(this.search);

  getAllSongs = async () => this.allSongs = await this.songsService.all();

  getSongs = async () => this.songs = await this.songsService.all('', String(this.songsOffset),
    String(this.songsLimit))

  checkSearchField = (): void => {
    if (this.search === '') {
      this.isSearching = false;
      this.getSongs();
    }
  }

  startPlaying = (uri: string, title: string, artist: string) => {
    if (this.isListening) { return this.openSnackBarSongWarning('Please stop the current song before change music!', ''); }
    this.songUrl = uri;
    this.currentSong = title;
    this.currentArtist = artist;
    this.isListening = true;
  }

  startPlayingFromPlaylist = (): boolean => {
    if (this.songToPlayFromPlaylist) {
      this.playFromPlaylist = true;
      return true;
    }
    return false;
  }

  stopPlayingFromPlaylist = () => {
    this.songToPlayFromPlaylist = undefined;
    this.playFromPlaylist = false;
  }

  openSnackBar = (message: string, action: string): void => {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  openSnackBarSongWarning = (message: string, action: string): void => {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  hideNextSongButton = (): boolean => this.allSongs.length >= this.songsOffset + this.songsLimit;

  nextSongs = async () => {
    if (this.songsOffset + this.songsLimit <= this.allSongs.length) { this.songsOffset = this.songsOffset + this.songsLimit; }
    this.songs = await this.songsService.all(
      '',
      String(this.songsOffset),
      String(this.songsLimit)
    );
  }

  prevSongs = async () => {
    if (this.songsOffset - this.songsLimit >= 0) { this.songsOffset = this.songsOffset - this.songsLimit; }
    this.songs = await this.songsService.all(
      '',
      String(this.songsOffset),
      String(this.songsLimit)
    );
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
        this.openSnackBar(`Song "${songName}" added to playlist "${result.title}"`, '');
      }
    });
  }

  ngOnInit(): void {
    this.getAllSongs();
    this.getSongs();
  }
}
