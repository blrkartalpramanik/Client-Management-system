import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router,private userService:UserService){}

meetingList:any;


  token:any;
  ngOnInit(): void {
  this.token = localStorage.getItem('token');  
  }


logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token'); 
  }
  this.router.navigate(['/login']); // go back to login page
}

}