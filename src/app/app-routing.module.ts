import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { ManageActivityComponent } from './manage-activity/manage-activity.component';
import { ManageCheckupComponent } from './manage-checkup/manage-checkup.component';
import { ManageImunisasiComponent } from './manage-imunisasi/manage-imunisasi.component';
import { ManageToddlerComponent } from './manage-toddler/manage-toddler.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { HealthInfoComponent } from './health-info/health-info.component';

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
        path: 'health-info',
        component: HealthInfoComponent
      },
      // {
      //   path: 'report',
      //   component: ReportComponent
      // },
      {
        path: 'manage-toddler',
        component: ManageToddlerComponent
      },
      {
        path: 'manage-checkup',
        component: ManageCheckupComponent
      },
      {
        path: 'manage-imunisasi',
        component: ManageImunisasiComponent
      },
      {
        path: 'manage-activity',
        component: ManageActivityComponent
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
