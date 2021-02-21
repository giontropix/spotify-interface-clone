import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  setTraslateTitleTrue = () => localStorage.setItem('translateTitle', 'true');

  setTraslateTitleFalse = () => localStorage.setItem('translateTitle', 'false');


  ngOnInit(): void {
  }

}
