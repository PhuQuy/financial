import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from '@env/environment';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  providers: [UserService]
})
export class UserDetailComponent implements OnInit {
  user:any = new Object();
  id: any;
  alls: any;
  encrypt;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.encrypt = new JsEncryptModule.JSEncrypt();
    this.encrypt.setPrivateKey(environment.privateSSHRASKey);
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
    });
    this.alls = this.userService.getById(this.id);
  }

  ngOnInit() {
    if (this.alls) {
      this.alls.subscribe(user => {
          this.user = user;
          this.user.phone = this.encrypt.decrypt(this.user.phone);
      });
    }
    
    

}

}
