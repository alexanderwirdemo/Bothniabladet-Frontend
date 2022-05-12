import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _cartService: CartService,
    private _router: Router
  ) { }

  ngOnInit(): void {
   
  }

  getUserLoggedIn(): boolean {
    return this._userService.getuserLoggedIn();
  }

  getUserRole(): any {
    return this._userService.getuserRole();
  }

  logoutUser(): void {
    this._userService.logoutUser();
    this._router.navigate(['/archiveview']);

  }

  numberOfItems(): number {
    return this._cartService.getNumberOfItems();
  }

}

