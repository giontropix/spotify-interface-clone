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
    let apiAnswer: any;
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && refreshToken) {
      try {
        apiAnswer = await this.authService.check(accessToken, refreshToken);
      } catch (err) {
        return this.openSnackBar(err, 'Warning!');
      }
      localStorage.setItem('access_token', apiAnswer.access_token);
      localStorage.setItem('refresh_token', apiAnswer.refresh_token);
      return this.router.navigate([`/users/${localStorage.getItem('user_id')}`]);
    }
  }

  getTraslateTitleFromLocalStorage = () => localStorage.getItem('translateTitle');

  ngOnInit(): void {
    localStorage.setItem('translateTitle', 'false');
    this.goToProfileIfJustLogged();
  }
}
