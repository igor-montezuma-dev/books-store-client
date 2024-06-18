import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Book } from '../types/book.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  private cartItemsChanged = new Subject<void>();

  getProducts() {
    this.cartItemList = JSON.parse(localStorage.getItem('products') || '[]');
    this.productList.next(this.cartItemList);
    this.cartItemsChanged.next();
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
    localStorage.setItem('products', JSON.stringify(this.cartItemList));
    this.cartItemsChanged.next();
  }

  addToCart(product: any) {
    const newProduct = { ...product, quantity: 1 };
    this.cartItemList.push(newProduct);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    localStorage.setItem('products', JSON.stringify(this.cartItemList));
    this.cartItemsChanged.next();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.forEach((item: any) => {
      grandTotal += parseFloat(item.price);
    });
    return grandTotal;
  }

  getTotalItems(): number {
    return this.cartItemList.length;
  }

  getProductQuantity(product: Book): number {
    const item = this.cartItemList.find(
      (item: Book) => item._id === product._id
    );
    return item ? item.quantity : 0;
  }

  removeSingleItem(product: any) {
    const index = this.cartItemList.findIndex(
      (item: any) => item.id === product.id
    );
    if (index > -1) {
      this.cartItemList.splice(index, 1);
      this.productList.next(this.cartItemList);
      localStorage.setItem('products', JSON.stringify(this.cartItemList));
      this.cartItemsChanged.next();
    }
  }

  removeAllItems() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    localStorage.removeItem('products');
    this.cartItemsChanged.next();
  }

  getCartItemsChanged() {
    return this.cartItemsChanged.asObservable();
  }
}
