import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
}
