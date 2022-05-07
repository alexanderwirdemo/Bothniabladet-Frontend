import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {


  constructor(
    private _userService: UserService,
    private _cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  getUserLoggedIn(): boolean {
    return this._userService.getuserLoggedIn();
  }

  getUserRole(): String {
    return this._userService.getuserRole();
  }

  logoutUser(): void {
    return this._userService.logoutUser();
  }

  numberOfItems(): number {
    return this._cartService.getNumberOfItems();
  }

}

