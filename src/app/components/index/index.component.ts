import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    private snackBar: MatSnackBar,
  ) { }

  get isRegister(): boolean{
    return this.authService.isRegister;
  }

  openSnackBar = (message: string, action: string): void => {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  goToProfileIfJustLogged = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && refreshToken) {
      try {
        await this.authService.check(accessToken, refreshToken);
      } catch (err) {
        this.openSnackBar(err, 'Warning!');
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
