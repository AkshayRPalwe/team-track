import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-employee',
  standalone: false,
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {
  title = 'Add Employee';
  dialogData: any;
  isEdit = false;

  constructor(
    private _employeeService: EmployeeService,
    private _matDialogRef: MatDialogRef<AddEmployeeComponent>,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogData = this.data;
    if (this.dialogData.code > 0) {
      this.title = 'Edit Employee';
      this.isEdit = true;
      this._employeeService
        .getEmployee(this.dialogData.code)
        .subscribe((item) => {
          let data = item;
          if (data != null) {
            this.empForm.setValue({
              id: data.id,
              name: data.name,
              date_of_joining: data.date_of_joining,
              role: data.role,
              salary: data.salary,
            });
          }
        });
    }
  }

  empForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    date_of_joining: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
  });

  saveEmployee() {
    if (this.empForm.valid) {
      let data: Employee = {
        id: this.empForm.value.id as number,
        name: this.empForm.value.name as string,
        date_of_joining: new Date(this.empForm.value.date_of_joining as Date),
        role: this.empForm.value.role as string,
        salary: this.empForm.value.salary as number,
      };

      if (this.isEdit) {
        this._employeeService.updateEmployee(data).subscribe((item) => {
          this._toastrService.success(
            'Employee details updated successfully!',
            'Employee Updated'
          );
          this.closePopup();
        });
      } else {
        this._employeeService.createEmployee(data).subscribe((item) => {
          this._toastrService.success(
            'New employee has been added successfully!',
            'Employee Added'
          );
          this.closePopup();
        });
      }
    }
  }

  closePopup() {
    this._matDialogRef.close();
  }
}
