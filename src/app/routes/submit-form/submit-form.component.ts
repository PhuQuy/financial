import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { environment } from '@env/environment.prod';
import * as JsEncryptModule from 'jsencrypt';


@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss'],
  providers: [UserService]
})
export class SubmitFormComponent implements OnInit {
  user: any = new Object();
  encrypt;
  model;
  constructor(private userService: UserService) {
    this.encrypt = new JsEncryptModule.JSEncrypt();
    this.encrypt.setPublicKey(environment.publishSSHRASKey);

    this.user.name = localStorage.name;
    this.user.phone = localStorage.phone;
    this.user.long = localStorage.long;
    this.user.money = localStorage.money;
  }

  createUser() {
    // console.log(this.user);
    var encrypted = this.encrypt.encrypt(this.user.phone + '');
    this.user.phone = encrypted;
    this.userService.create(this.user);
    this.user = {};
    //console.log(encrypted);
  }

  ngOnInit() {
  }

}
