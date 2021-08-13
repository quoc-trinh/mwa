import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  private _welcome = "Welcome to MEAN Games";

  public get welcome(){
    return this._welcome;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
