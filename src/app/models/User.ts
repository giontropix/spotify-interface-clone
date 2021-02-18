import {Follower} from './Follower';
import {Playlist} from './Playlist';

export interface User {
  _id: string;
  _user_name: string;
  _mail: string;
  _playlist: Playlist[];
  _followers: Follower[];
  _following: Follower[];
}