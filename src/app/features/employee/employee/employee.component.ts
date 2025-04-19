import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../../core/models/employee.model';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import {
  debounceTime,
  distinctUntilChanged,
  Subscription,
  switchMap,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  empList: Employee[] = [];
  searchControl = new FormControl('');
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
    private _employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllEmployees();
    this.setupSearch();
  }

  setupSearch() {
    const searchSub = this.searchControl.valueChanges
      .pipe(
        debounceTime(1000), // Wait after typing
        distinctUntilChanged(), // Only if value changed
        switchMap((query) => {
          if (!query || query.trim() === '') {
            return this._employeeService.getAllEmployees();
          }
          return this._employeeService.getFilteredEmployees(query);
        })
      )
      .subscribe((items: any) => {
        this.empList = items.data || items.results || [];
        this.dataSource = new MatTableDataSource(this.empList);
      });

    this.subscriptions.add(searchSub);
  }

  getAllEmployees() {
    let subscribeGetAllEmployees = this._employeeService
      .getAllEmployees()
      .subscribe((item: any) => {
        this.empList = item.data;
        this.dataSource = new MatTableDataSource(this.empList);
      });
    this.subscriptions.add(subscribeGetAllEmployees);
  }

  addEmployee() {
    this.openPopup(0);
  }

  logout() {
    this.authService.clearToken();
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
