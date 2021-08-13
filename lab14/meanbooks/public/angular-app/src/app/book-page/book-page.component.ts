import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Book, BookDataService } from '../book-data.service';

@Component({
  selector: 'app-Book-page',
  templateUrl: './Book-page.component.html',
  styleUrls: ['./Book-page.component.css']
})
export class BookPageComponent implements OnInit {

  Book!: Book;
  BookId!: string;
  updateBookForm!: FormGroup;

  constructor(private service:BookDataService,
              private route:ActivatedRoute,
              private router:Router,
              private formBuilder: FormBuilder,
              ) { }

  ngOnInit(): void {
    this.BookId = this.route.snapshot.params.id;
    this.getOneBook(this.BookId);

    this.updateBookForm = this.formBuilder.group({
      price: [''],
      minPlayers: [''],
      maxPlayers: [''],
      minAge: ['']
    });

  }

  private getOneBook(BookId:string): void {
    this.service.getOneBook(BookId).then((response) => this.gotOneBook(this,response)).catch(this.handleError);
  }

  private gotOneBook(BooksDetailComponent:BookPageComponent,response:Book) {
    console.log(response);
    BooksDetailComponent.Book = response;
  }

  private handleError(error:any) {
    console.log(error);
  }
}
