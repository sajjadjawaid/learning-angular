import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit {
  isLoggedIn: boolean = false;
  router = inject(Router);

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('empErpUser');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  navigateToClient() {
    this.router.navigateByUrl('/client');
  }
}
