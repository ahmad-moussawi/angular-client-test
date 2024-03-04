import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { noSpace } from '../../validators/no-space.validator';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export default class ResetComponent implements OnInit {

  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);

  router = inject(Router);

  resetForm!: FormGroup;

  responseError: string = '';

  token!: string;

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), noSpace.noSpaceValidator])],
      confirmPassword: ['', Validators.compose([Validators.required, noSpace.noSpaceValidator])]
    },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword')
      })
    this.activatedRoute.params.subscribe(val => {
      this.token = val['token'];
    })
  }

  resetPassword() {
    const resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    }
    this.authService.resetPasswordService(resetObj).subscribe({
      next: (res) => {
        this.resetForm.reset();
        this.responseError = "Your password was sucessfully reset.";
       // this.router.navigate(['login']);
      },
      error: (err) => {
        this.responseError = err.error.message;
      }
    })
  };
}

