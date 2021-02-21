import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    public router: Router) {
  }

  group?: FormGroup;

  getMailErrorMessage = (): string => {
    if (this.group?.controls.mail.hasError('required')) {
      return 'You must enter a value';
    }
    return this.group?.controls.mail.hasError('email')
      ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage = (): string => {
    if (this.group?.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.group?.controls.password.hasError('minlength')
      ? 'Insert 3 char al least'
      : '';
  }

  openSnackBar = (message: string, action: string): void => {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  goToUser = (id: string) => this.router.navigate([`/users/${id}`]);

  loginUser = async () => {
    let user: any = {};
    if (this.group?.status === 'INVALID') {
      return this.openSnackBar('Field not properly compiled', 'Repeat');
    }
    try {
      user = await this.authService.login(this.group?.controls.mail.value, this.group?.controls.password.value);
    } catch (error: any) {
      return this.openSnackBar(error, 'Repeat!');
    }
    localStorage.setItem('refresh_token', user.refresh_token);
    localStorage.setItem('access_token', user.access_token);
    localStorage.setItem('user_id', user.id);
    await this.goToUser(user.id);
  }

  ngOnInit(): void {
    localStorage.setItem('translateTitle', 'true');
    this.group = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
