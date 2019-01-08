import { Component, OnInit } from '@angular/core';
import { MessagingService } from '@app/services/messaging.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    message;

  constructor(private messagingService: MessagingService ) { }

  ngOnInit() {
      try {
          this.messagingService.getPermission();
          this.messagingService.receiveMessage();
          this.message = this.messagingService.currentMessage;
      } catch(error) {

      }
  }

}
