import { Component, OnInit } from '@angular/core';
import { MessagingService } from '@app/services/messaging.service';
import { UserService } from '@app/services/user.service';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from '@env/environment';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    providers: [UserService]
})
export class AdminComponent implements OnInit {
    message;
    users = [];
    encrypt;
    alls: any;
    constructor(private messagingService: MessagingService, private userService: UserService) {
        this.encrypt = new JsEncryptModule.JSEncrypt();
        this.encrypt.setPrivateKey(environment.privateSSHRASKey);

        this.alls = this.userService.getAlls();
    }

    ngOnInit() {
        this.messagingService.getPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
        if (this.alls) {
            this.alls.subscribe(users => {
                // console.log(users);
                this.users = users;
                this.users.forEach((item, index) => {
                    if (item.phone) {
                        item.phone = this.encrypt.decrypt(item.phone);
                    }
                });
            });
        }

    }

    deleteUser(id) {
        this.userService.deleteById(id);
    }

}
