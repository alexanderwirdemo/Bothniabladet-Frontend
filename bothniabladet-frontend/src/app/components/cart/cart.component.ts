import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CartService } from 'src/app/services/cart.service';
import { Image, images } from 'src/app/images';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = this.cartService.getItems();
  images = images;
  summa = this.cartService.getSumOfPrice();
  antalVaror = this.cartService.getNumberOfItems();
  // rabatt = this.userService.getDiscount();
  rabatt = 10;
  pris = this.summa*(100-this.rabatt)/100;

  checkoutForm = this.formBuilder.group({
    betalningsmetod: ['kontokort',[Validators.required]] 
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    ) {
    this.images=images 
   }
     
  public remove(index: number): void {
    var name = this.items[index].name; 
    this.items = this.cartService.clearItem(index);
    console.warn('Item: ', name, ' has been deleted');
    this.summa = this.cartService.getSumOfPrice();
    this.antalVaror = this.cartService.getNumberOfItems();
  }

  onSubmit(): void {
    // Process checkout data here
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
    this.summa = this.cartService.getSumOfPrice();
    this.antalVaror = this.cartService.getNumberOfItems();
  }

  ngOnInit(): void {
  }

}
