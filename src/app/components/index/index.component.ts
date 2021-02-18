import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public authService: AuthService) { }

  get isRegister(): boolean{
    return this.authService.isRegister;
  }

  ngOnInit(): void {
  }

}
