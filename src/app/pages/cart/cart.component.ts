import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export default class CartComponent implements OnInit {
  cartService = inject(CartService);
  public products: any = [];
  public grandTotal!: number;
  public itemTotalPrice!: number;
  public itemCart!: any;

  @Input() cartItems!: any[];

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.itemCart = this.cartService.getTotalItems();
      
    });
  }
  removeItem(item: any) {
    this.cartService.removeSingleItem(item);
  }
  emptyCart() {
    this.cartService.removeAllItems();
  }

  getProductPrice(product: any): number {
    return (this.itemTotalPrice = product.price * product.quantity);
  }

  getCartItemsQuantity(): number {
    return (this.itemCart = this.cartService.getTotalItems());
  }
}
