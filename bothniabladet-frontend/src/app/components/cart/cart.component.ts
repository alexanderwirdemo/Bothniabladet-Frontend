import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BothniaImage } from '../imageview/imageview.component';
import { CartService } from 'src/app/services/cart.service';
import { ApiService } from 'src/app/services/api.service';
// import { Image, images } from 'src/app/images';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = this.cartService.getItems();
  images: Array<BothniaImage>;
  summa = this.cartService.getSumOfPrice();
  antalVaror = this.cartService.getNumberOfItems();
  inloggad = this.userService.getuserLoggedIn();
  roll = this.userService.getuserRole();
  rabatt = this.userService.getUserDiscount();
  rabattKr = this.summa*this.rabatt/100;
  pris = this.summa*(100-this.rabatt)/100;

  checkoutForm = this.formBuilder.group({
    betalningsmetod: ['kontokort',[Validators.required]] 
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _apiService: ApiService,
    ) { 
   }

  public remove(index: number): void {
    var title = this.items[index].title; 
    this.items = this.cartService.clearItem(index);
    console.warn('Item: ', title, ' has been deleted');
    this.summa = this.cartService.getSumOfPrice();
    this.rabatt = this.userService.getUserDiscount();
    this.rabattKr = this.summa*this.rabatt/100;
    this.pris = this.summa*(100-this.rabatt)/100;
    this.antalVaror = this.cartService.getNumberOfItems();
  }

  onSubmit(): void {
    for (let i=0; i < this.items.length; i++) {
      if (this.items[i].restrictions == "Begränsad") {
        console.log("remaining publication removed");
        var updatedpublications = this.items[i].remaining_publications - 1;
    
        console.dir(this.items[i].title);
        console.log(updatedpublications + " publications left");

      const body = {
        _id: this.items[i]._id,
        remaining_publications: updatedpublications,
      };
      this._apiService.putTypeRequest('images/reviewed/update/'+this.items[i]._id, body).subscribe(response => {
        console.log(response);
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
      } 
    }
    // Process checkout data here
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
    this.summa = this.cartService.getSumOfPrice();
    this.antalVaror = this.cartService.getNumberOfItems();
    this.rabatt = this.userService.getUserDiscount();
    this.rabattKr = this.summa*this.rabatt/100;

  }

  ngOnInit(): void {

  }

}
