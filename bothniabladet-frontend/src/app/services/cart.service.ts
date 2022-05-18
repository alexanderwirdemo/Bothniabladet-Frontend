import { Injectable } from '@angular/core';
import { BothniaImage } from '../components/imageview/imageview.component';
import { Image } from '../images';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public antal = 0;

  items: BothniaImage[] = [/* {
    id: 1,
    name: 'Julfirande på stortorget 1969',
    photograher: 'Owe Sentlig d.ä.',
    price: 199,
  },
  {
    id: 2,
    name: 'Drottning Silvia i stadsparken',
    photograher: 'Hovfotograf Ferdinand',
    price: 149,
  },
  {
    id: 3,
    name: 'Branden i stövelfabriken 2008',
    photograher: 'Owe Sentlig d.y.',
    price: 199,
    } */];

  addToCart(image: BothniaImage) {
    const productExistInCart = this.items.find(({title}) => title === image.title);
    if (!productExistInCart) {
      this.items.push(image);
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  clearItem(index: number) {
    this.items.splice(index, 1)
    return this.items;
  }

  getSumOfPrice() {
    let total = 0
    for (let i = 0; i < this.items.length; i++) {
      total = total + this.items[i].price; 
    }
    return total; 
  }

  getNumberOfItems() {
    this.antal = this.items.length;
    return this.antal;
  }
  constructor() { }
}
