import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private baseURL: string = "http://localhost:3000/api";


  constructor(private http:HttpClient) { }

  public register(newUser:User) : Promise<any>{
    const url: string = this.baseURL+"/users/register";
    return this.http.post(url,newUser).toPromise().then(this.registeredUser).catch(this.handleError);
  }

  private registeredUser(resposne:any) : any {
    return resposne;
  }

  private handleError(error:any) : any {
    console.log(error);
  }
}
