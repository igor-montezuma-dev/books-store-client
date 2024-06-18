import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { Book } from 'src/app/types/book.type';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export default class BookCardComponent {
  @Input({ required: true }) book!: Book;

  cartService = inject(CartService);
  booksService = inject(BookService);

  addToCart(item: any){
    this.cartService.addToCart(this.book);
    console.log(this.book);
  }
}
