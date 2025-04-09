import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './core/components/counter/counter.component';
import { EmployeeComponent } from './core/components/employee/employee.component';

const routes: Routes = [
  {
    path: '',
    component: CounterComponent,
  },
  {
    path: 'employee',
    component: EmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
