import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noSpace } from '../../validators/no-space.validator';
import { CommonModule } from '@angular/common';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  router = inject(Router);

  registerForm !: FormGroup;

  responseError: string = '';

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), noSpace.noSpaceValidator])],
      confirmPassword: ['', Validators.compose([Validators.required, noSpace.noSpaceValidator])]
    },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword')
      });
  }

  register(): void {
    this.authService.registerService(this.registerForm.value)
      .subscribe({
        next: (res: any) => {
          alert(`http://localhost:4500/verify?token=${res.message}`);
          this.registerForm.reset();
          this.router.navigate(['login'])
          this.responseError = '';
        },
        error: (err) => {
          this.responseError = err.error.message;
        }
      })
  }
}
