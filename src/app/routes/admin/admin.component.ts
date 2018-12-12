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
    constructor(private messagingService: MessagingService, private userService: UserService) {
        this.encrypt = new JsEncryptModule.JSEncrypt();
        this.encrypt.setPrivateKey(environment.privateSSHRASKey);
    }

    ngOnInit() {
        this.messagingService.getPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;
        this.userService.getAlls().subscribe(users => {
            this.users = users;
            this.users.forEach((item, index) => {
                if (item.phone) {
                    item.phone = this.encrypt.decrypt(item.phone);
                    console.log(item);
                }
            });
            // console.log(users);
        });





        // this.encrypt.setPublicKey(environment.publishSSHRASKey);
        // var encrypted = this.encrypt.encrypt('phuquy');

        // console.log(encrypted);

    }

}
