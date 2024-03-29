import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ErrorTimeoutComponent } from './shared/error-timeout/error-timeout.component';
import { AddUserModalComponent } from './manage-user/add-user-modal/add-user-modal.component';
import { DatePipe } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { HealthInfoComponent } from './health-info/health-info.component';
import { ManageToddlerComponent } from './manage-toddler/manage-toddler.component';
import { AddToddlerModalComponent } from './manage-toddler/add-toddler-modal/add-toddler-modal.component';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';
import { ManageCheckupComponent } from './manage-checkup/manage-checkup.component';
import { AddCheckupModalComponent } from './manage-checkup/add-checkup-modal/add-checkup-modal.component';
import { ManageImunisasiComponent } from './manage-imunisasi/manage-imunisasi.component';
import { AddImunisasiModalComponent } from './manage-imunisasi/add-imunisasi-modal/add-imunisasi-modal.component';
import { ManageActivityComponent } from './manage-activity/manage-activity.component';
import { AddActivityModalComponent } from './manage-activity/add-activity-modal/add-activity-modal.component';
import { EditProfileModalComponent } from './edit-profile/edit-profile-modal/edit-profile-modal.component';
import { ReportComponent } from './report/report.component';
import { DownloadModalComponent } from './report/download-modal/download-modal.component';
import { SendModalComponent } from './report/send-modal/send-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavBarComponent,
    SideNavBarComponent,
    EditProfileComponent,
    ManageUserComponent,
    LoadingComponent,
    ErrorTimeoutComponent,
    DeleteModalComponent,
    AddUserModalComponent,
    HealthInfoComponent,
    ManageToddlerComponent,
    AddToddlerModalComponent,
    ManageCheckupComponent,
    AddCheckupModalComponent,
    ManageImunisasiComponent,
    AddImunisasiModalComponent,
    ManageActivityComponent,
    AddActivityModalComponent,
    EditProfileModalComponent,
    ReportComponent,
    DownloadModalComponent,
    SendModalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdbValidationModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule, 
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    Ng2SearchPipeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
