import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User';
import {PlaylistsService} from '../../services/playlists.service';
import {AddPlaylistComponent} from '../dialogs/add-playlist/add-playlist.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PlaylistDetailsComponent} from '../dialogs/playlist-details/playlist-details.component';
import {AuthService} from '../../services/auth.service';
import {Song} from '../../models/Song';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public usersService: UsersService,
    public playlistsService: PlaylistsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    public router: Router
  ) { }

  user!: User;
  playlists: any[] = [];
  allPlaylists: any[] = [];
  playlistOffset = 0;
  playlistLimit = 3;
  songToPlayFromPlaylist!: Song;

  getUser = async () => this.user = await this.usersService.get(this.route.snapshot.params.id);

  getPlaylists = async () => this.playlists =
    await this.playlistsService.all(this.route.snapshot.params.id, String(this.playlistOffset), String(this.playlistLimit))

  getAllPlaylists = async () => this.allPlaylists = await this.playlistsService.all(this.route.snapshot.params.id);

  nextPlaylists = async () => {
    if (this.playlistOffset + this.playlistLimit <= this.allPlaylists.length) {
      this.playlistOffset = this.playlistOffset + this.playlistLimit;
    }
    this.playlists = await this.playlistsService.all(
      this.route.snapshot.params.id,
      String(this.playlistOffset),
      String(this.playlistLimit)
    );
  }

  prevPlaylists = async () => {
    if (this.playlistOffset - this.playlistLimit >= 0) { this.playlistOffset = this.playlistOffset - this.playlistLimit; }
    this.playlists = await this.playlistsService.all(
      this.route.snapshot.params.id,
      String(this.playlistOffset),
      String(this.playlistLimit)
    );
  }

  logout = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && refreshToken) {
      await this.authService.logout(accessToken, refreshToken);
      localStorage.setItem('access_token', '');
      localStorage.setItem('refresh_token', '');
      await this.router.navigate(['/welcome']);
    }
  }

  goToIndexIfNotLogged = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    console.log(accessToken, refreshToken);
    if (accessToken && refreshToken) {
      try {
        await this.authService.check(accessToken, refreshToken);
      } catch (err) {
        this.openSnackBar(err, 'Warning!');
        return this.router.navigate(['/welcome']);
      }
      return;
    }
    return this.router.navigate(['/welcome']);
  }

  openSnackBar = (message: string, action: string): void => {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  openDialogPlaylistDetails = (id: string): void => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {id, user: this.route.snapshot.params.id};
    dialogConfig.width = '100%';
    const dialogRef = this.dialog.open(PlaylistDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result._src) {
        this.songToPlayFromPlaylist = result;
      }
      else if (result._id) {
        try {
          await this.playlistsService.delete(this.route.snapshot.params.id, result._id);
        } catch (error: any) {
          return this.openSnackBar(error, 'Repeat!');
        }
        this.openSnackBar(`Playlist "${result._title}" removed from your list!`, '');
        this.getPlaylists();
        this.getAllPlaylists();
      }
      });
  }

  openDialogAddPlaylist = (): void => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddPlaylistComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.playlistsService.create(this.route.snapshot.params.id, {name: result.controls.title.value});
        } catch (error: any) {
          return this.openSnackBar(error, 'Repeat!');
        }
        this.openSnackBar(`Playlist "${result.controls.title.value}" added to your list!`, '');
        this.getPlaylists();
        this.getAllPlaylists();
      }
    });
  }

  ngOnInit(): void {
    this.goToIndexIfNotLogged();
    this.getUser();
    this.getAllPlaylists();
    this.getPlaylists();
  }

}
