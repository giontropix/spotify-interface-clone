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
  allFollowed: Follower[] = [];
  followedOffset = 0;
  followedLimit = 10;

  getAllFollowed = async () => this.allFollowed = await this.friendsService.allFollowed(this.user._id);

  getFollowed = async () => this.followed =
    await this.friendsService.allFollowed(this.user._id, String(this.followedOffset), String(this.followedLimit))

  nextFollowed = async () => {
    if (this.followedOffset + this.followedLimit <= this.allFollowed.length) {
      this.followedOffset = this.followedOffset + this.followedLimit;
    }
    this.followed = await this.friendsService.allFollowed(
      this.user._id,
      String(this.followedOffset),
      String(this.followedLimit)
    );
  }

  prevFollowed = async () => {
    if (this.followedOffset - this.followedLimit >= 0) {
      this.followedOffset = this.followedOffset - this.followedLimit;
    }
    this.followed = await this.friendsService.allFollowed(
      this.user._id,
      String(this.followedOffset),
      String(this.followedLimit)
    );
  }

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
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) { window.location.reload(); }
    });
  }

  ngOnInit(): void {
    this.getAllFollowed();
    this.getFollowed();
  }

}
