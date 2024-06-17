import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import BookCardComponent from 'src/app/components/book-card/book-card.component';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/types/book.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit{

  booksService = inject(BookService);
  books: Book[] = [];

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.booksService.getBooks().subscribe({
      next: (res) => {
        this.books = res.data;
        
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
