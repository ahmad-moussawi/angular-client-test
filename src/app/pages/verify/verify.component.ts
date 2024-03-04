import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export default class VerifyComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  router = inject(Router);

  progressMessage: string = "Verifying your account..."
  ngOnInit() {
    let token = this.activatedRoute.snapshot.queryParamMap.get('token');
    if (token) {
      this.authService.verifyService(token)
        .subscribe({
          next: () => {
            this.progressMessage = 'Account verified Correctly. Redirecting you to the login page...';
            setTimeout(() => {
              this.router.navigate(['login'])
            }, 3000);
          },
          error: (err: any) => {
            this.progressMessage = err.error.message;
          }
        })
    }
    else this.progressMessage = "No valid token was provided."
  }
}

