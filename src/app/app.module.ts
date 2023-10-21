import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from 'src/server/data.service';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { WebinfoComponent } from './components/webinfo/webinfo.component';
import { NopathComponent } from './components/nopath/nopath.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LamboComponent } from './components/lambo/lambo.component';
import { MaseratiComponent } from './components/maserati/maserati.component';
import { BuggattiComponent } from './components/buggatti/buggatti.component';
import { FerrariComponent } from './components/ferrari/ferrari.component';
import { CartComponent } from './components/cart/cart.component';
import { AllComponent } from './components/all/all.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    WebinfoComponent,
    NopathComponent,
    LoginComponent,
    RegisterComponent,
    LamboComponent,
    MaseratiComponent,
    BuggattiComponent,
    FerrariComponent,
    CartComponent,
    AllComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
