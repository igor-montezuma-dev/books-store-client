import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import AuthService from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  cartService = inject(CartService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  isLoggedIn: boolean = false;
  userName!: string;
  showMenu: boolean = false;
  public total: number = 0;
  public cartItems!: any[];

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((value) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });

    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.userName = user.userName;
      }
    });

    this.cartService.getCartItemsChanged().subscribe(() => {
      this.total = this.cartService.getTotalItems();
    });

    this.cartService.getProducts().subscribe();
  }

  getTotalItems(): number {
    let totalItems = 0;
    this.cartItems.forEach((item: any) => {
      totalItems += item.quantity;
    });
    return totalItems;
  }

  getTotal() {
    this.total = this.cartService.getTotalItems();
    console.log(this.total);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  goToCart() {
    this.router.navigate(['/carrinho'], { relativeTo: this.activatedRoute });
    console.log('carrinho');
  }

  logout() {
    localStorage.removeItem('user_id');
    this.authService.isLoggedIn$.next(false);
  }
}
