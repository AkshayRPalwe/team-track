import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from './features/employee/employee/employee.component';
import { CounterComponent } from './features/counter/counter.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { LoginGuard } from './core/guards/login/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    // loadComponent: () =>
    //   import('./features/employee/employee/employee.component').then(
    //     (e) => e.EmployeeComponent
    //   ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
