import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/User';
import {FriendsService} from '../../../services/friends.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Follower} from '../../../models/Follower';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private friendsService: FriendsService,
    private snackBar: MatSnackBar
  ) {
  }

  users: User[] = [];

  getUsers = async () => this.users = await this.usersService.all();

  removeJustFollowed = (id: string) => this.data.followed.find((item: Follower) => item._id === id);

  openSnackBar = (message: string, action: string): void => {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  addFriend = async (userIdToFollow: string) => {
    try {
      await this.friendsService.add(this.data.user, {userIdToFollow});
    } catch (error: any) {
      return this.openSnackBar(error, 'Repeat!');
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }

}
