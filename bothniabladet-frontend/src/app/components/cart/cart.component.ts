import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CartService } from 'src/app/services/cart.service';
import { Image, images } from 'src/app/images';

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

  checkoutForm = this.formBuilder.group({
    betalningsmetod: ['kontokort',[Validators.required]] 
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    ) {
    this.images=images 
   }
     
  public remove(index: number): void {
    this.items = this.cartService.clearItem(index);
    console.warn('Item has been deleted');
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
