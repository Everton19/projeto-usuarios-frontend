import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly _loginService = inject(LoginService);

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  onLogin(){
    this._loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (response) => {
        this.router.navigate(['/user-infos']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.loginForm.setErrors({ invalidCredentials: true });
        } else {
          this.loginForm.setErrors({ generalCredentialsError: true });
        }
      }
    });
  }
}
