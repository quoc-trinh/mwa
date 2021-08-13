import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {
  private baseURL: string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getBooks() : Promise<Book[]> {
    const url: string = `${this.baseURL}/books`;
    return this.http.get(url).toPromise().then(this.handleBooksResponse).catch(this.handleError);
  }

  private handleBooksResponse(response:any): Book[]{
    return response as Book[];
  }

  public getOneBook(BookId:string) : Promise<Book> {
    const url: string = `${this.baseURL}/books/${BookId}`;
    return this.http.get(url).toPromise().then(this.handleResponse).catch(this.handleError);
  }

  public deleteBook(BookId:string) : Promise<Book> {
    const url: string = `${this.baseURL}/books/${BookId}`;
    return this.http.delete(url).toPromise().then(this.handleResponse).catch(this.handleError);
  }

  public addOneBook(Book:Book) : Promise<Book>{
    const url: string = `${this.baseURL}/books`;
    return this.http.post(url,Book).toPromise().then(this.handleResponse).catch(this.handleError);
  }

  private handleResponse(response:any): Book{
    return response as Book;
  }

  private handleError(error:any): any {
    console.log("Error ",error);
  }
}

export class Book{
   _id!: string;
  title!: string;
  price: number = 0;
  year: number = 990; 
  pages: number = 1;
  isbn10: string = "";
  isbn13: string = "";
  publisherName!: string;
  rate!:number;
  authors!: string[];
}