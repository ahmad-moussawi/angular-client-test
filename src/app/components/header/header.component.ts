import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap } from 'rxjs/internal/operators/tap';

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

  ngOnInit(): void {
    console.log('IS INIT');
    this.authService.authStatus().pipe(
      tap( console.log ),
      tap( res => {
          this.isLoggedIn$.next(!!res?.body)
      } )
    ).subscribe(
      () => {},
      ( err ) => {
        console.log( err );
        this.isLoggedIn$.next( false );
      }
    )
  }
}