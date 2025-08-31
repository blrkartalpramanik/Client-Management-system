import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meeting } from './model/meeting-model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule-meeting',
  standalone: false,
  templateUrl: './schedule-meeting.component.html',
  styleUrl: './schedule-meeting.component.css'
})

export class ScheduleMeetingComponent implements OnInit {
  token: any;
  id: any;
  isVisible: boolean = true;
  isLoader: boolean = false;
  meeting: Meeting = new Meeting();
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {


    this.token = localStorage.getItem('token')

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.id = +idParam;
        this.isLoader = true;
        this.isVisible = false;
        this.fetchMeeting();
      }


    });
  }

  validateNumber(event: any, field: string) {
    let value = event.target.value.replace(/[^0-9]/g, ''); // remove non-numeric
    event.target.value = value;

    if (field === 'phone') {
      this.meeting.phone = value;
    } else if (field === 'number_of_people') {
      this.meeting.number_of_people = value ? Number(value) : 0;
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token'); // remove token
    }
    this.router.navigate(['/login']); // go back to login page
  }

  reload() {
    window.location.reload();
  }

  reset() {
    this.meeting = { meeting_id: '', client_id: '', meeting_topic: '', start_time: '', number_of_people: '', phone: '', meeting_link: '', start_link: '', remarks: '' };
  }

  navigateToList() {
    this.router.navigate(['/meeting'])
  }

  fetchMeeting() {
    this.userService.getById('/getMeeting/' + this.id, this.token)
      .subscribe((response: any) => {
        this.meeting = response[0];
        this.meeting.start_time = new Date(this.meeting.start_time).toISOString().slice(0, 16);
        setTimeout(() => {
          this.isLoader = false;
        }, 1000);
      },
        (error) => { console.error('Error in fetch', error); }
      );
  }

  addMeeting() {
    if (!this.meeting.meeting_topic) {
      alert('Pleas enter topic !');
      return;
    }
    if (!this.meeting.start_time) {
      alert('Pleas enter Start time !');
      return;
    }
    if (!this.meeting.number_of_people) {
      alert('Pleas enter number of people !');
      return;
    }
    if (!this.meeting.phone) {
      alert('Pleas enter Phone number !');
      return;
    }
    if (this.meeting.number_of_people <= 1) {
      alert('Pleas enter number of people greater than one !');
      return;
    }

    if (!this.meeting.remarks) {
      alert('Pleas enter remarks !');
      return;
    }

    if (new Date(this.meeting.start_time) <= new Date()) {

      alert('Start time must be greater than current time');
      return;
    }


    this.meeting.client_id = localStorage.getItem('id');

    this.userService.post('/createMeeting/', this.meeting, this.token).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res) {
          alert('Meeting Created successfuly.');
          this.router.navigate(['/meeting']);
        } else {
          alert(res.message || 'Invalid data');
        }
      },
      error: () => {
        alert(' Failed to create meeting. Please try again.');
      }

    })


  }

  UpdateMeeting() {

  }
}
