import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingServiceCart: ShoppingCartService) {}

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingServiceCart.clearCart();
    return result;
  }

}
