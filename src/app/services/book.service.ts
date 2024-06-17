import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Book, Response } from '../types/book.type';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  http = inject(HttpClient);
  development = 'http://localhost:3000/api/books/all-books';
  production = 'https://book-store-api-zpwr.onrender.com/api/books/all-books'

  getBooks() {
    return this.http.get<Response<Book[]>>(this.production);
  }
}
