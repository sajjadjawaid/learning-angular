import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    email: '',
    password: '',
  };

  router = inject(Router);
  onLogin() {
    if (
      this.loginObj.email == 'admin@gmail.com' &&
      this.loginObj.password == '12345'
    ) {
      this.router.navigateByUrl('/client');
      localStorage.setItem('empErpUser', this.loginObj.email);
    } else {
      alert('wrong credentials');
    }
  }
}
