import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginRequest } from '../../../core/models/auth.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      if (
        this.loginForm.value.email === 'admin@example.com' &&
        this.loginForm.value.password === 'admin123'
      ) {
        let authData: LoginRequest = {
          email: this.loginForm.value.email as string,
          password: this.loginForm.value.password as string,
        };
        this.authService.login(authData).subscribe({
          next: (res) => {
            if (res?.token) {
              this.authService.setToken(res.token);
              this.toastrService.success('Login Successful!', 'Welcome aboard!');
              this.router.navigate(['/employee'])
            }
          },
          error: (err) => {
            this.toastrService.error(
              'Login Unsuccessful!',
              'Please try again!' + err
            );
            console.error(err);
            
          },
        });
      }
    }
  }
}
