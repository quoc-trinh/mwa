import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Book-rating',
  templateUrl: './Book-rating.component.html',
  styleUrls: ['./Book-rating.component.css']
})
export class BookRatingComponent implements OnInit {
  private _rating! :number;
  ratings :number[] = [1];

 @Input() set rating(rating:number){
     this._rating = rating;
     this.convert();
   }

  convert() {
    this.ratings = new Array(this._rating);
  }

  constructor() {}

  ngOnInit(): void {}
}
