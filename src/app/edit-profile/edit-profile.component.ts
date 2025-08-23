import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from './model/profile-model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {


  token: any;
  profile: Profile = new Profile();
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.fetchProfile();
  }

  reload() {
    window.location.reload();
  }

  navigateToDashboard() {
    this.router.navigate(['/profile'])
  }

  fetchProfile() {
  this.userService.getById('/getClientProfile/' + localStorage.getItem('id'), this.token)
    .subscribe((response: any) => {
      if (response && response.length > 0) {
        this.profile = response[0]; 
      }
      console.log(this.profile);
    },
    (error) => { console.error('Error in fetch', error); }
  );
}

 reset() {
    this.profile = { name:'',id: '', email: '', password: '', repeat_password: '',role:'' };
  }



  editProfile() {

     if (this.profile.password !== this.profile.repeat_password) {
    alert('Password and Confirm Password do not match!');
    return; 
  }
    this.userService.put('/updateProfile/', this.profile, this.token).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res) {
          alert('profile updated successfuly.');
          this.router.navigate(['/dashboard']);
        } else {
          alert(res.message || 'Invalid data');
        }
      },
      error: () => {
        alert(' Failed to update profile. Please try again.');
      }

    })


  }






}
