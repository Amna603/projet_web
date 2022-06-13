import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PublicationComponent } from './components/publication/publication.component';
import { UserComponent } from './components/user/user.component'
const routes: Routes = [  
    {path: 'user', component: UserComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'publication', component: PublicationComponent}


    ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
