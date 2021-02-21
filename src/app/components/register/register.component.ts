import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private snackBar: MatSnackBar) {
  }

  group?: FormGroup;

  getMailErrorMessage = (): string => {
    if (this.group?.controls.mail.hasError('required')) {
      return 'You must enter a value';
    }
    return this.group?.controls.mail.hasError('email')
      ? 'Not a valid email' : '';
  }

  getUserNameErrorMessage = (): string => {
    if (this.group?.controls.user_name.hasError('required')) {
      return 'You must enter a value';
    }
    return this.group?.controls.user_name.hasError('minlength')
      ? 'Insert 3 char al least'
      : '';
  }

  getPasswordErrorMessage = (): string => {
    if (this.group?.controls.user_name.hasError('required')) {
      return 'You must enter a value';
    }
    return this.group?.controls.user_name.hasError('minlength')
      ? 'Insert 3 char al least'
      : '';
  }

  openSnackBar = (message: string, action: string): void => {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  regUser = async () => {
    if (this.group?.status === 'INVALID') { return this.openSnackBar('Field not properly compiled', 'Repeat'); }
    try {
      await this.authService
        .register(this.group?.controls.mail.value, this.group?.controls.user_name.value,
          this.group?.controls.password.value, this.group?.controls.sex.value);
    } catch (error: any){
      return this.openSnackBar(error, 'Repeat!');
    }
    return this.openSnackBar(`User ${this.group?.controls.user_name.value} created!`, '');
  }

  ngOnInit(): void {
    localStorage.setItem('translateTitle', 'true');
    this.group = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      user_name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      sex: ['M', [Validators.required]]
    });
  }

}
