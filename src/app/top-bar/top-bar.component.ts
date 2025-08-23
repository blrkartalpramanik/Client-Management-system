import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: false,
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit {
 name:any;
  role:any;

constructor(private router:Router,private userService:UserService){}

ngOnInit(): void {
  this.name = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  if(role == 'c'){
     this.role = 'Client';
  }
 else {
  this.role ='Admin';
 }
}

  logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token'); 
  }
  this.router.navigate(['/login']); // go back to login page
}

}
