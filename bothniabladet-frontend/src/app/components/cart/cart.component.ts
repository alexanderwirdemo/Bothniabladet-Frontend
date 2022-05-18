import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BothniaImage } from '../imageview/imageview.component';
import { CartService } from 'src/app/services/cart.service';
import { ApiService } from 'src/app/services/api.service';
// import { Image, images } from 'src/app/images';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



export interface DialogData {
  photographer: any;
  image_filepath: any;
  price: any;
  restrictions: any;
  remaining_publications: any;
  description: any;
  date_added: any;
  gps: any;
  city: any;
  country: any;
  place: any;
  region: any;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //Till Dialog
  photographer: any;
  image_filepath: any;
  price: any;
  restrictions: any;
  remaining_publications: any;
  description: any;
  date_added: any;
  gps: any;
  city: any;
  country: any;
  place: any;
  region: any;


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
    public dialog: MatDialog,
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


  openDialog(image: any): void {

    console.dir(image);
    this.image_filepath = image.variants[0];
    this.photographer = image.photographer;
    this.price = image.price;
    this.restrictions = image.restrictions;
    this.remaining_publications = image.remaining_publications;
    this.description = image.description;
    this.date_added = image.date;
    this.gps = image.Location.GPSCoordinates;
    this.city = image.Location.city;
    this.country = image.Location.country;
    this.place = image.Location.place;
    this.region = image.Location.region;

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '700px',
      height: '500px',

      data: { photographer: this.photographer, image_filepath: this.image_filepath, price: this.price, restrictions: this.restrictions, remaining_publications: this.remaining_publications, description: this.description, date: this.date_added, gps: this.gps, city: this.city, country: this.country, place: this.place, region: this.region },

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogen stängdes')
    })
  };


}

@Component({

  selector: 'app-dialog',
  templateUrl: '../dialog/dialog.component.html'
})

export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }
}
