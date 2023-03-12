import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { CheckupComponent } from './checkup/checkup.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ImunisasiComponent } from './imunisasi/imunisasi.component';
import { LoginComponent } from './login/login.component';
import { ManageActivityComponent } from './manage-activity/manage-activity.component';
import { ManageCheckupComponent } from './manage-checkup/manage-checkup.component';
import { ManageImunisasiComponent } from './manage-imunisasi/manage-imunisasi.component';
import { ManageToddlerComponent } from './manage-toddler/manage-toddler.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ReportComponent } from './report/report.component';
import { ToddlerComponent } from './toddler/toddler.component';

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
        path: 'report',
        component: ReportComponent
      },
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
        path: 'toddler',
        component: ToddlerComponent
      },
      {
        path: 'checkup',
        component: CheckupComponent
      },
      {
        path: 'imunisasi',
        component: ImunisasiComponent
      },
      {
        path: 'activity',
        component: ActivityComponent
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
