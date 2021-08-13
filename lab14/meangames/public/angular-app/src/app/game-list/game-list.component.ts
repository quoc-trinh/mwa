import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Game, GameDataService } from '../game-data.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  title= "MEAN Games";

  games!: Game[]; // = [this.gam1e,this.game2];

  message!:string;
  err!:string;

  addGameForm!: FormGroup;

  constructor(private gamesDataService:GameDataService,
              private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.addGameForm = this.formBuilder.group({
      title: [''],
      price: [''],
      year: [''],
      rate: [''],
      minPlayers: [''],
      maxPlayers: [''],
      minAge: [''],
      designer: ['']
    });

    this.getGames();
  }

  private getGames(): void {
    this.gamesDataService.getGames().then((response) => this.handleGameResponse(response)).catch(this.handleError);
  }

  private handleGameResponse(response: Game[]) {
    console.log(response);
    this.games = response;
  }

  private addOneGame() : void {
    this.gamesDataService.addOneGame(this.addGameForm.value)
      .then((response) => this.addedOneGame(response))
      .catch((error) => this.handleError(error));
  }

  onAddGame(): void {
    this.addOneGame();
  }

  private addedOneGame(response:any) : void {
    console.log(response);
    this.router.navigate([this.router.url]);

  }

  private handleError(error:any) {
    console.log(error);
  }

   isLoggedIn():boolean {
     return this.auth.isLoggedIn();
   }
}
