import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResetComponent } from './components/reset/reset.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './services/auth.guard';
import { BeinspiredComponent } from './components/beinspired/beinspired.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ExpenselistComponent } from './components/expenselist/expenselist.component';
import { EditexpenseComponent } from './components/editexpense/editexpense.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

const routes: Routes = [
  {path:"home",component:HomeComponent,pathMatch:"full" },
  {path:"login",component:LoginComponent,pathMatch:"full" },
  {path:"dashboard",component:DashboardComponent,pathMatch:"full",
  canActivate:[AuthGuard]

},
  {path:"navbar",component:NavbarComponent,pathMatch:"full" },
  {path:"registration",component:RegistrationComponent,pathMatch:"full" },
  {path:"resetPassword",component:ResetComponent,pathMatch:"full" },
  {path:"beinspired",component:BeinspiredComponent,pathMatch:"full" },
  {path:"aboutus",component:AboutusComponent,pathMatch:"full" },
  {path:"expenselist",component:ExpenselistComponent,pathMatch:"full" },
  { path: 'editexpense/:expenseId', component: EditexpenseComponent,pathMatch:"full"  },
  { path: 'userprofile', component: UserprofileComponent,pathMatch:"full"  },
  
  
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
