import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { environment } from '@env/environment.prod';
import * as JsEncryptModule from 'jsencrypt';
import { HinhThucVayTienComponent } from '@app/routes/submit-form/hinh-thuc-vay-tien/hinh-thuc-vay-tien.component';
import { LaiSuatComponent } from '@app/routes/submit-form/lai-suat/lai-suat.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



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
  constructor(private userService: UserService, private modalService: NgbModal) {
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

  open_hinhthucvay(){
    const modalRef = this.modalService.open(HinhThucVayTienComponent, { centered: true });
    modalRef.componentInstance.title = 'Hình thức nhận tiền vay';
  }

  open_laixuat(){
    const modalRef = this.modalService.open(LaiSuatComponent, { centered: true });
    modalRef.componentInstance.title = 'Lãi suất thỏa thuận';
  }

}
