import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NopathComponent } from './components/nopath/nopath.component';
import { BuggattiComponent } from './components/buggatti/buggatti.component';
import { LamboComponent } from './components/lambo/lambo.component';
import { MaseratiComponent } from './components/maserati/maserati.component';
import { FerrariComponent } from './components/ferrari/ferrari.component';
import { AllComponent } from './components/all/all.component';
import { UserComponent } from './components/user/user.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'Home', redirectTo: '', pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Buggatti', component: BuggattiComponent},
  {path: 'Lamborghini', component: LamboComponent},
  {path: 'Maserati', component: MaseratiComponent},
  {path: 'Ferrari', component: FerrariComponent},
  {path: 'All', component: AllComponent},
  {path: 'UserProfile', component: UserComponent},
  {path: 'cart', component: CartComponent},
  {path: '**', component: NopathComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
