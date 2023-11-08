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
  delay: boolean = false;
  idUser: number = -1;

  constructor(private service: BackoffService, private route: Router){}

  loginRequest(): void {
    console.log('Login:', this.login);
    console.log('Password:', this.password);
  
    this.delay = true
    this.service.loginAttempt(this.login, this.password).subscribe({
      next: (userId: number | null) => {
        if (userId !== null) {
          this.idUser = userId;
          console.log(`Logged in as user with ID: ${userId}`);
          this.delay = true
        } else {
          this.delay = false
          console.error('Login failed');
        }
      },
      error: (error) => {
        this.delay = false
        console.error('Login failed', error);
      },
    });
  }

  captchat(): void{
    this.loginRequest()
    this.route.navigate([`logged/${this.idUser}`]);
  }
  
}
