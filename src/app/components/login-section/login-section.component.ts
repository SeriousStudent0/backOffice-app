import { Component } from '@angular/core';
import { BackoffService } from '../../backoff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-section',
  templateUrl: './login-section.component.html',
  styleUrls: ['./login-section.component.scss']
})
export class LoginSectionComponent {

  login: string = "";
  password: string = "";

  constructor(private service: BackoffService, private route: Router){}

  loginRequest(): void {
    console.log('Login:', this.login);
    console.log('Password:', this.password);
  
    this.service.loginAttempt(this.login, this.password).subscribe({
      next: (userId: number | null) => {
        if (userId !== null) {
          console.log(`Logged in as user with ID: ${userId}`);
          this.route.navigate([`logged/${userId}`]); // Redirect on success
        } else {
          console.error('Login failed');
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
  
}
