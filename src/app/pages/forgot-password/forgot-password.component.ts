import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export default class ForgotPasswordComponent implements OnInit {

  responseError: string = '';

  forgotForm !: FormGroup;

  fb = inject(FormBuilder);

  router = inject(Router)

  authService = inject(AuthService)

  forgot(): void {
    this.authService.sendResetPasswordTokenEmailService(this.forgotForm.value.email).subscribe({
      next: (res) => {
        this.forgotForm.reset();
        this.responseError = 'Your password reset token was sent to your email.';
        //this.router.navigate(['login']);
      },
      error: (err) => {
        this.responseError = err.error.message;
      }
    })
    console.log(this.forgotForm.value.email);
  }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }
}
