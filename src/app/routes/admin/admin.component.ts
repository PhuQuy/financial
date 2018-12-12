import { Component, OnInit } from '@angular/core';
import { MessagingService } from '@app/services/messaging.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    message;
    constructor(private messagingService: MessagingService) { }

    ngOnInit() {
        this.messagingService.getPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
    }

}
