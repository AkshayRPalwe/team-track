import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url = 'https://teamtrack.akshaypalwe.com/api/employees.php';

  constructor(private _http: HttpClient) {}

  getAllEmployees() {
    return this._http.get<Employee[]>(this.url);
  }

  getFilteredEmployees(empName: string) {
    return this._http.get<Employee[]>(`${this.url}?search=${empName}`);
  }

  getEmployee(empId: number) {
    return this._http.get<Employee>(this.url + '/' + empId);
  }

  createEmployee(data: Employee) {
    return this._http.post<Employee>(this.url, data);
  }

  updateEmployee(data: Employee) {
    return this._http.put<Employee>(this.url + '/' + data.id, data);
  }

  deleteEmployee(empId: number) {
    return this._http.delete(this.url + '/' + empId);
  }
}

// GET /api/employees.php?search=Akshay

// {
//   "matched": 1,
//   "results": [
//     {
//       "id": 1,
//       "name": "Akshay Palwe",
//       "role": "Developer",
//       "date_of_joining": "2022-03-12",
//       "salary": "2500000"
//     }
//   ],
//   "counter": {
//     "value": 0
//   }
// }
