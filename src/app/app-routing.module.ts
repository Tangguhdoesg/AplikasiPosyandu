import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
        // loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      }, 
      {
        path: 'dashboard',
        component: DashboardComponent
        // loadChildren: () => import('./content/content.module').then(m => m.ContentModule)
      }, 
      {
        path: 'manage-user',
        component: ManageUserComponent
        // loadChildren: () => import('./content/content.module').then(m => m.ContentModule)
      }, 
      {
        path: 'edit-profile',
        component: EditProfileComponent
        // loadChildren: () => import('./content/content.module').then(m => m.ContentModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
