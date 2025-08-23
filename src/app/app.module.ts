import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component'
import { AuthGuard } from './auth.guard';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FullCalendarModule } from '@fullcalendar/angular';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: DashboardComponent,   
    children: [
      { path: 'dashboard', component: DashboardHomeComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: EditProfileComponent, canActivate: [AuthGuard] }, 
      { path: 'meeting', component: MeetingListComponent, canActivate: [AuthGuard] },
      { path: 'create', component: ScheduleMeetingComponent, canActivate: [AuthGuard] },
      {path:'edit/:id',component:ScheduleMeetingComponent, canActivate: [AuthGuard]}

    ]
  },

  { path: '**', redirectTo: 'login' }
];



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    SideBarComponent,
    TopBarComponent,
    ScheduleMeetingComponent,
    MeetingListComponent,
    DashboardHomeComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    FullCalendarModule

  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
