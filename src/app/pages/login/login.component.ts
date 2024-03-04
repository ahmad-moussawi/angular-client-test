import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  appComponent = inject(AppComponent);

  router = inject(Router);

  loginForm!: FormGroup;

  responseError: string = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  login(): void {
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        this.loginForm.reset();
        this.responseError = '';
        this.router.navigate(['home']);
        this.appComponent.isLoggedIn = true;
      },
      error: (err) => {
        this.responseError = err.error.message;
      },
    });
  }
}
