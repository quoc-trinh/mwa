import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Game, GameDataService } from '../game-data.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  game!: Game;
  gameId!: string;
  updateGameForm!: FormGroup;

  constructor(private service:GameDataService,
              private route:ActivatedRoute,
              private router:Router,
              private formBuilder: FormBuilder,
              ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params.id;
    this.getOneGame(this.gameId);

    this.updateGameForm = this.formBuilder.group({
      price: [''],
      minPlayers: [''],
      maxPlayers: [''],
      minAge: ['']
    });

  }

  private getOneGame(gameId:string): void {
    this.service.getOneGame(gameId).then((response) => this.gotOneGame(this,response)).catch(this.handleError);
  }

  private gotOneGame(gamesDetailComponent:GamePageComponent,response:Game) {
    console.log(response);
    gamesDetailComponent.game = response;
  }

  private handleError(error:any) {
    console.log(error);
  }
}
