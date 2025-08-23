import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-meeting-list',
  standalone: false,
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.css'
})

export class MeetingListComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  meetingList: any;

  searchCriteria: any = {
    meeting_topic: '',
    client_id:'',
    start_time: '',
    phone: ''
  };

  token: any;
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.list();
  }


  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']); // go back to login page
  }
  navigateTocreate() {
    this.router.navigate(['/create']);
  }

  list() {
    const client_id = localStorage.getItem('id');
    this.userService.getById('/getAllById', this.token,{client_id}).subscribe({

      next: (res: any) => {
        console.log(res);
        if (res) {

          this.meetingList = res;
        }
      },
      error: () => {
        alert('Failed. Please try again.');
      }
    })

  }

  findBy() {
    this.searchCriteria.client_id = localStorage.getItem('id');
    this.userService.find('/searchMeeting', this.token, this.searchCriteria).subscribe({
      next: (res: any) => {
        console.log('Search result:', res);
        this.meetingList = res;
      },
      error: () => {
        alert('Search failed. Please try again.');
      }
    });

  }

  reset() {
    this.searchCriteria = { topic: '', date: '', time: '', phone: '' };
    this.list();
  }


  delete(id: any) {
   
    this.userService.delete(`/deleteMeetingBy`,id, this.token).subscribe({
        next: (res: any) => {
            if (res) {
                alert('Meeting deleted successfully');
                 this.router.navigate(['/meeting']);
            }
        },
        error: (err) => {
            console.error('Delete failed', err);
        }
    });
}


exportToPdf(){ alert('hello')
 const pdf = new jsPDF();

    autoTable(pdf, { html: '#myTable' });


    pdf.save('table-data.pdf');
  
}


}