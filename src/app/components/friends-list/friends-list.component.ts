import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {Follower} from '../../models/Follower';
import {FriendsService} from '../../services/friends.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddFriendComponent} from '../dialogs/add-friend/add-friend.component';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})

export class FriendsListComponent implements OnInit {

  constructor(
    private friendsService: FriendsService,
    public dialog: MatDialog
  ) { }

  @Input() user!: User;
  followed: Follower[] = [];

  getFollowed = async () => this.followed = await this.friendsService.allFollowed(this.user._id);

  removeFollowed = async (friendToUnfollowId: string) => {
    await this.friendsService.remove(this.user._id, friendToUnfollowId);
    window.location.reload();
  }

  openDialogAddFriend = (): void => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {user: this.user._id, followed: this.followed};
    const dialogRef = this.dialog.open(AddFriendComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async () => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.getFollowed();
  }

}
