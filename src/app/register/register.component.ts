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
  registerClient() {

    if (!this.register.name || !this.register.email || !this.register.password || !this.register.repeat_password){
      alert('data required');
      return;
  }

      this.userService.registerClient('/addClientProfile', this.register).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res) {
            alert('Registration done successfuly.');
            this.router.navigate(['/login']);
          } else {
            alert(res.message || 'Invalid data');
          }
        },
        error: () => {
          alert('Registration failed. Please try again.');
        }

      })


  }



}
