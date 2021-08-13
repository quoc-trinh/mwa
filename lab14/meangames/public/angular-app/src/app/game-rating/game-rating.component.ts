import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-rating',
  templateUrl: './game-rating.component.html',
  styleUrls: ['./game-rating.component.css']
})
export class GameRatingComponent implements OnInit {
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
