import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user_name:string='';
  password:string='';

  constructor(private userService:UserService,private router:Router){}



    login() {
    this.userService.userLogin(this.user_name, this.password).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('id', res.id);
          localStorage.setItem('name', res.name);
          localStorage.setItem('email', res.email);
          localStorage.setItem('role', res.role);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        } else {
          alert(res.message || 'Invalid credentials');
        }
      },
      error: () => {
        alert('Login failed. Please try again.');
      }
    });
  }
  }



