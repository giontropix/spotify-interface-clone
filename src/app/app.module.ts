import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {LoginComponent} from './components/login/login.component';
import {NavComponent} from './components/nav/nav.component';
import {IndexComponent} from './components/index/index.component';
import {ProfileComponent} from './components/profile/profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {AddPlaylistComponent} from './components/dialogs/add-playlist/add-playlist.component';
import {PlaylistDetailsComponent} from './components/dialogs/playlist-details/playlist-details.component';
import {SongsListComponent} from './components/songs-list/songs-list.component';
import {AddSongToPlaylistComponent} from './components/dialogs/add-song-to-playlist/add-song-to-playlist.component';
import {FriendsListComponent} from './components/friends-list/friends-list.component';
import {AddFriendComponent} from './components/dialogs/add-friend/add-friend.component';
import {MatRadioModule} from '@angular/material/radio';
import {CollapseModule} from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    IndexComponent,
    ProfileComponent,
    AddPlaylistComponent,
    PlaylistDetailsComponent,
    SongsListComponent,
    AddSongToPlaylistComponent,
    FriendsListComponent,
    AddFriendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatRadioModule,
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
