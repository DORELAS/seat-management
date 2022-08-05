import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatSelectedComponent } from './components/booker/seat-selected/seat-selected.component';
import { UserSeatsComponent } from './components/booker/user-seats/user-seats.component';
import { UserdashboardComponent } from './components/booker/userdashboard/userdashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/managers/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './helpers/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-dashboard',
    component: UserdashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-seats',
    component: UserSeatsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seat-selected',
    component: SeatSelectedComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
