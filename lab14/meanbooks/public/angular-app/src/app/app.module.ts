import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BookListComponent } from './book-list/book-list.component';
import { ErrorPageComponentComponent } from './error-page-component/error-page-component.component';
import { BookPageComponent } from './book-page/book-page.component';
import { BookRatingComponent } from './book-rating/book-rating.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    HeaderComponent,
    BookListComponent,
    ErrorPageComponentComponent,
    BookPageComponent,
    BookRatingComponent,
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
      path:"books",
      component: BookListComponent
    },{
      path:"book/:id",
      component: BookPageComponent
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
