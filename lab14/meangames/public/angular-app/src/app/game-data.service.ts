import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private baseURL: string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getGames() : Promise<Game[]> {
    const url: string = `${this.baseURL}/games`;
    return this.http.get(url).toPromise().then(this.handleGamesResponse).catch(this.handleError);
  }

  private handleGamesResponse(response:any): Game[]{
    return response as Game[];
  }

  public getOneGame(gameId:string) : Promise<Game> {
    const url: string = `${this.baseURL}/games/${gameId}`;
    return this.http.get(url).toPromise().then(this.handleResponse).catch(this.handleError);
  }

  public addOneGame(game:Game) : Promise<Game>{
    const url: string = `${this.baseURL}/games`;
    return this.http.post(url,game).toPromise().then(this.handleResponse).catch(this.handleError);
  }

  private handleResponse(response:any): Game{
    return response as Game;
  }

  private handleError(error:any): any {
    console.log("Error ",error);
  }
}

export class Game{
   _id!: string;
  title!: string;
  price: number = 0;
  year: number = 990; 
  minPlayers: number = 1;
  maxPlayers: number = 1;
  minAge: number = 6;
  publisherName!: string;
  rate!:number;
}