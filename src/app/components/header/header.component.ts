import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  authService = inject(AuthService)

  isLoggedIn$ = new BehaviorSubject<Boolean>(false);

  authenticationStatus!: Observable<HttpResponse<object>>;

  constructor() {
    this.authenticationStatus = this.authService.authStatus()

  }
  ngOnInit(): void {
    this.authenticationStatus.subscribe({
      next: (res: any) => {
        if (res.body) {
          this.isLoggedIn$.next(true)
        } else this.isLoggedIn$.next(false)
      },
      error: (err) => {
        this.isLoggedIn$.next(false)
      }
    });
  }
}
