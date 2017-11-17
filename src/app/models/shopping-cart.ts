import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor (public itemsMap: { [productId: string] : ShoppingCartItem }) {
      for(let productId in itemsMap) {
        let item = itemsMap[productId];
        // 遍历循环数组中的数据
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }
    }

    get productIds() {
      return Object.keys(this.itemsMap);
    }

    get totalPrice () {
      let sum = 0;
      for(let productId in this.items) 
        sum += this.items[productId].totalPrice;
      return sum;
    }

    get totalItemsCount () {
      let count = 0;
      for (let productId in this.itemsMap) 
        count += this.itemsMap[productId].quantity;
      return count;
    }
}
