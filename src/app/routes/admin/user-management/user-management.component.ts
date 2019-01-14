import { Component, OnInit } from '@angular/core';
import { ManagerService } from '@app/services/manager.service';
import { ConfirmComponent } from '@app/modals/confirm/confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
    providers: [ManagerService]
})
export class UserManagementComponent implements OnInit {
    managers = [];
    breadcrumbs;
    constructor(private managerService: ManagerService, private modalService: NgbModal, private angularFireAuth: AngularFireAuth) { }

    ngOnInit() {
        this.loadManagers();

        this.breadcrumbs = [
            {
                router: '/admin',
                title: 'Home'
            },
            {
                router: '/admin/user-management',
                title: 'User Management'
            }
        ]
    }

    loadManagers() {
        this.managerService.getAlls().subscribe(managers => {
            this.managers = managers;
        });
    }

    open(id) {
        const modalRef = this.modalService.open(ConfirmComponent, { centered: true });
        modalRef.componentInstance.title = 'Xác nhận xóa';
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.question = 'Bạn có chắc chắn xóa không?';
        modalRef.componentInstance.confirmText = 'Xóa';

        modalRef.result.then((id) => {
            this.managerService.updateBeforeDelete(id).then(() => {
                this.managerService.deleteById(id);
            })
        }, () => { })
    }
}
