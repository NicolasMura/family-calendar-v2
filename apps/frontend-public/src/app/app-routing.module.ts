import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@family-calendar-v2/frontend-tools';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
// import { SomethingIsBrokenComponent } from 'projects/tools/src/lib/components/something-is-broken/something-is-broken.component';


const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [ AuthGuard ]
  },
  // {
  //   path: '**',
  //   component: SomethingIsBrokenComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
