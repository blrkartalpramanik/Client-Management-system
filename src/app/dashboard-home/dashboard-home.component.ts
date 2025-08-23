import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  meetingList: any[] = [];
  token: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.list(); // fetch data when page loads
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    events: [], // initially empty
    editable: true,
    selectable: true,
    contentHeight: 'auto'
  };

  list() {
    const client_id = localStorage.getItem('id');

    this.userService.getById('/getAllById', this.token, { client_id }).subscribe({
      next: (res: any) => {
        if (res) {
          this.meetingList = res;

          const today = new Date();
          const eventList = this.meetingList.map((meeting: any) => {
            const meetingDate = new Date(meeting.start_time);
            let titlePrefix = '';
            let eventUrl: string | null = null;

            if (meetingDate.toDateString() === today.toDateString()) {
              titlePrefix = 'Join Meeting';
              eventUrl = meeting.start_link; console.log("meeting_link"+JSON.stringify(meeting.start_link))
            } else if (meetingDate > today) {
              titlePrefix = 'Upcoming Meeting';
            } else {
              titlePrefix = 'Meeting Passed';
            }

            return {
  title: `${meeting.meeting_topic}`,
  start: meeting.start_time,
  url: eventUrl && eventUrl.trim() !== '' ? eventUrl : undefined, 
  color:
    titlePrefix === 'Join Meeting'
      ? 'blue'
      : titlePrefix === 'Upcoming Meeting'
        ? 'green'
        : 'red',
  extendedProps: {
    prefix: titlePrefix,
    meetingLink: eventUrl // ✅ Store the link for custom logic
  }
};

          });

          // Assign events + eventClick + eventContent
          this.calendarOptions = {
            ...this.calendarOptions,
            events: eventList,
            eventContent: (arg) => {
              const prefix = arg.event.extendedProps['prefix'] || '';
              const color = arg.event.extendedProps['color'] || 'gray'; // use extendedProps

              return {
                html: `
      <div style="text-align:center; line-height:1.2; display:flex; flex-direction:column; align-items:center;">
        <div style="width:8px; height:8px; border-radius:50%; background-color:${color}; margin-bottom:2px;"></div>
        <div style="font-weight:bold;">${prefix}</div>
        <div>${arg.timeText} - ${arg.event.title}</div>
      </div>
    `
              };
            },
            eventClick: (info) => {
              if (info.event.url) {
                window.open(info.event.url, '_blank'); 
                info.jsEvent.preventDefault();
              } else {
                alert('This meeting is not available today.');
                info.jsEvent.preventDefault();
              }
            }
          };
        }
      },
      error: () => {
        alert('Failed. Please try again.');
      }
    });
  }
}
