import { Component, OnInit } from '@angular/core';
import { MessagingService } from '@app/services/messaging.service';
import { UserService } from '@app/services/user.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    providers: [UserService]
})
export class AdminComponent implements OnInit {
    message;
    users = [];
    constructor(private messagingService: MessagingService, private userService: UserService) { }

    ngOnInit() {
        this.messagingService.getPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
        this.userService.getAlls().subscribe(users => {
            this.users = users;
        })
    }

}
