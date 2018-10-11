import { Component, OnInit } from '@angular/core';

import { User, UserService, JwtService } from '../../core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public checkLogin: boolean;
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
    this.checkLogin = false;
  }

  currentUser: User;

  ngOnInit() {
   if (this.jwtService.getToken()) {
      this.checkLogin = true;
   } else {

   }
  }

  logout() {
    this.jwtService.destroyToken();
    this.checkLogin = false;
  }
}
