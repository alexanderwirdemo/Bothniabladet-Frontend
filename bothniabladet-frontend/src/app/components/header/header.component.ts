import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  getUserLoggedIn(): boolean {
    return this._userService.getuserLoggedIn();
  }

}
