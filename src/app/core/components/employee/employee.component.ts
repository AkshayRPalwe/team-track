import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../models/employee.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  empList: Employee[] = [];
  dataSource!: MatTableDataSource<Employee>;
  displayedColumns: string[] = [
    'id',
    'name',
    'role',
    'date_of_joining',
    'salary',
    'action',
  ];
  subscriptions = new Subscription();

  constructor(
    private _dialog: MatDialog,
    private _employeeService: EmployeeService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    let subscribeGetAllEmployees = this._employeeService
      .getAllEmployees()
      .subscribe((item) => {
        this.empList = item;
        this.dataSource = new MatTableDataSource(this.empList);
      });
    this.subscriptions.add(subscribeGetAllEmployees);
  }

  addEmployee() {
    this.openPopup(0);
  }

  deleteEmployee(empId: number) {
    if (confirm('Are you sure?')) {
      let deleteEmployeeSubscription = this._employeeService
        .deleteEmployee(empId)
        .subscribe((item) => {
          this.getAllEmployees();
        });
      this.subscriptions.add(deleteEmployeeSubscription);
    }
  }
  editEmployee(empId: number) {
    this.openPopup(empId);
  }

  openPopup(empId: number) {
    this._dialog
      .open(AddEmployeeComponent, {
        width: '50%',
        // exitAnimationDuration: '1000ms',
        // enterAnimationDuration: '1000ms',
        data: {
          code: empId,
        },
      })
      .afterClosed()
      .subscribe((o) => {
        this.getAllEmployees();
      });
  }
}
 