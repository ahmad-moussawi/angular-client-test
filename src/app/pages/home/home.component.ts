import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  loggedInUserId: string = '';
  isLoggedIn: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);
  ngOnInit(): void {
    //this.isLoggedIn = this.authService.authStatus()
  }
}
