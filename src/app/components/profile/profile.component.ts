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
    const refresgToken = localStorage.getItem('refresh_token');
    console.log(accessToken, refresgToken);
    if (accessToken && refresgToken) {
      await this.authService.logout(accessToken, refresgToken);
      await this.router.navigate(['/welcome']);
  }
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
      if (result) {
        console.log( result);
        try {
          await this.playlistsService.delete(this.route.snapshot.params.id, result);
        } catch (error: any) {
          return this.openSnackBar(error, 'Repeat!');
        }
        window.location.reload();
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
        window.location.reload();
      }
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getAllPlaylists();
    this.getPlaylists();
  }

}
