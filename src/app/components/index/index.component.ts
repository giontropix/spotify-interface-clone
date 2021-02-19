import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  get isRegister(): boolean{
    return this.authService.isRegister;
  }

  goToProfileIfJustLogged = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && refreshToken) {
      try {
        await this.authService.check(accessToken, refreshToken);
      } catch (err) {
        return;
      }
      return this.router.navigate([`/users/${localStorage.getItem('user_id')}`]);
    }
    return;
  }

  ngOnInit(): void {
    this.goToProfileIfJustLogged();
  }
}
