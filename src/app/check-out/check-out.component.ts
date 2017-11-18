import { OrderService } from './../order.service';
import { Subscription } from 'rxjs/Rx';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{

  shipping = {}; 
  cart: ShoppingCart;
  userId: string;
  cartSubscription : Subscription;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart); 
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  
  placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getDate(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totlaPrice: i.totalPrice
        }
      })
    };

    this.orderService.storeOrder(order);
  }    

}
