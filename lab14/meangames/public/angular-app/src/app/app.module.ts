import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { GameListComponent } from './game-list/game-list.component';
import { ErrorPageComponentComponent } from './error-page-component/error-page-component.component';
import { GamePageComponent } from './game-page/game-page.component';
import { GameRatingComponent } from './game-rating/game-rating.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    HeaderComponent,
    GameListComponent,
    ErrorPageComponentComponent,
    GamePageComponent,
    GameRatingComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{
      path:"",
      component: WelcomeComponent
    },{
      path:"games",
      component: GameListComponent
    },{
      path:"game/:id",
      component: GamePageComponent
    },{
      path: "register",
      component: RegisterComponent
    },{
      path:"**",
      component: ErrorPageComponentComponent
    }])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
