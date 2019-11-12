import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ConfirmationResetPasswordComponent } from './confirmation-reset-password/confirmation-reset-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { SeguridadComponent } from './seguridad/seguridad.component';


const routes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'forgot_password', component: ConfirmationResetPasswordComponent},
  {path: 'reset_password/:token', component: ResetPasswordComponent},
  {path: 'register', component: IndexComponent},
  {path: 'home', component: HomeComponent},
  {path: 'confirmAccount/:token', component: ConfirmAccountComponent},
  {path: 'security', component: SeguridadComponent},
  {path: '**', component: NotfoundComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 