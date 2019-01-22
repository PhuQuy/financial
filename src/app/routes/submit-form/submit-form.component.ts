import { Component, OnInit } from '@angular/core';
import { HinhThucVayTienComponent } from '@app/routes/submit-form/hinh-thuc-vay-tien/hinh-thuc-vay-tien.component';
import { LaiSuatComponent } from '@app/routes/submit-form/lai-suat/lai-suat.component';
import { LocalStorageService } from '@app/services/local-storage.service';
import { UserService } from '@app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '@app/modals/confirm/confirm.component';
import { Router } from '@angular/router';
import { configurationState } from '@app/components/redux/app.states';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-submit-form',
    templateUrl: './submit-form.component.html',
    styleUrls: ['./submit-form.component.scss'],
    providers: [UserService]
})
export class SubmitFormComponent implements OnInit {

    moneys: Array<Object> = [
        { num: 500000, title: 'SỐ TIỀN VAY (VNĐ)' },
        { num: 500000, title: '500.000 VNĐ' },
        { num: 1000000, title: '1.000.000 VNĐ' },
        { num: 1500000, title: '1.500.000 VNĐ' },
        { num: 2000000, title: '2.000.000 VNĐ' },
        { num: 2500000, title: '2.500.000 VNĐ' },
        { num: 3000000, title: '3.000.000 VNĐ' },
        { num: 3500000, title: '3.500.000 VNĐ' },
        { num: 4000000, title: '4.000.000 VNĐ' },
        { num: 4500000, title: '4.500.000 VNĐ' },
        { num: 5000000, title: '5.000.000 VNĐ' }
    ];

    longs: Array<Object> = [
        { num: 3, title: 'BAO LÂU?' },
        { num: 3, title: '3 Tháng' },
        { num: 6, title: '6 Tháng' },
        { num: 8, title: '8 Tháng' },
        { num: 10, title: '10 Tháng' },
        { num: 12, title: '1 Năm' }
    ];
    user: any;
    encrypt;
    model;
    configuration;
    constructor(private userService: UserService, private modalService: NgbModal, private localStoredService: LocalStorageService, public router: Router, private store: Store<any>) {
        this.user = this.localStoredService.getItem('currentUser');
        store.select(configurationState).subscribe((configuration) => {
            this.configuration = configuration;
        });
    }

    createUser() {
        console.log(this.user);
        this.user.laixuat = this.configuration.laixuat
        this.userService.createUser(this.user).then(() => {
            const modalRef = this.modalService.open(ConfirmComponent, { centered: true });
            modalRef.componentInstance.title = 'Bạn đã gửi thành công';
            modalRef.componentInstance.question = 'Chúng tôi sẽ liên hệ với bạn ngay lập tức';
            modalRef.componentInstance.confirmText = "Đóng"
            modalRef.result.then(() => {
                this.router.navigate(['/']);
            })
                .catch(() => this.router.navigate(['/']))
        });
        this.user = {};
        //console.log(encrypted);
    }

    ngOnInit() {
    }

    open_hinhthucvay() {
        const modalRef = this.modalService.open(HinhThucVayTienComponent, { centered: true });
        modalRef.componentInstance.title = 'Hình thức nhận tiền vay';
    }

    open_laixuat() {
        const modalRef = this.modalService.open(LaiSuatComponent, { centered: true });
        modalRef.componentInstance.title = 'Lãi suất thỏa thuận';
    }

}
