import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Book, BookDataService } from '../book-data.service';

@Component({
  selector: 'app-Book-list',
  templateUrl: './Book-list.component.html',
  styleUrls: ['./Book-list.component.css']
})
export class BookListComponent implements OnInit {

  title = "MEAN Books";

  Books!: Book[];

  message!: string;
  err!: string;

  addBookForm!: FormGroup;

  constructor(private service: BookDataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.addBookForm = this.formBuilder.group({
      title: [''],
      price: [''],
      year: [''],
      rate: [''],
      authors: [''],
      isbn10: [''],
      isbn13: [''],
      pages: ['']
    });

    this.getBooks();
  }

  private getBooks(): void {
    this.service.getBooks().then((response) => this.handleBookResponse(response)).catch(this.handleError);
  }

  deleteBook(bookId: string): void {
    this.service.deleteBook(bookId).then(() => this.router.navigate(['/books'])).catch(this.handleError);
  }

  private handleBookResponse(response: Book[]) {
    console.log(response);
    this.Books = response;
  }

  private addOneBook(): void {
    this.service.addOneBook(this.addBookForm.value)
      .then((response) => this.addedOneBook(response))
      .catch((error) => this.handleError(error));
  }

  onAddBook(): void {
    this.addOneBook();
  }

  private addedOneBook(response: any): void {
    console.log(response);
    this.router.navigate([this.router.url]);

  }

  private handleError(error: any) {
    console.log(error);
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
