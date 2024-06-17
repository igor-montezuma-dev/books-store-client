import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  userName!: string;
  showMenu: boolean = false;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((value) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });

    this.authService.getUser().subscribe(user => {
      if (user) {
        this.userName = user.userName;
      }
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    localStorage.removeItem('user_id');
    this.authService.isLoggedIn$.next(false);
  }
}
