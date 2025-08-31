import { Component, model, OnInit } from '@angular/core';
import { Register } from '../register/model/registration-model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  register: Register = new Register();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  validateEmail(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.register.email);
  }

  registerClient() {

    if (!this.register.name) {
      alert('Name is required');
      return;
    }

    if (!this.register.email) {
      alert('Email is required');
      return;
    }

    if (!this.validateEmail()) {
      alert('Invalid email format');
      return;
    }

    if (!this.register.password) {
      alert('password is required');
      return;
    }

    if (!this.register.repeat_password) {
      alert('Confirm Password is required');
      return;
    }

    if (this.register.password !== this.register.repeat_password) {
      alert('Password and Confirm Password do not match!');
      return;
    }
    this.userService.registerClient('/addClientProfile', this.register).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Registration done successfully.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        if (err.error && err.error.message) {
          alert(err.error.message); 
        } else {
          alert('Registration failed. Please try again.');
        }
      }
    });



  }



}
