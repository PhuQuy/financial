import { Component, OnInit, Input } from '@angular/core';
import { ConfirmComponent } from '@app/modals/confirm/confirm.component';
import { ManagerService } from '@app/services/manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationInstance } from 'ngx-pagination';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
    providers: [ManagerService]
})
export class UserManagementComponent implements OnInit {
    @Input() component = false;
    managers = [];
    breadcrumbs;
    term;
    config: PaginationInstance = {
        id: 'comment',
        itemsPerPage: 10,
        currentPage: 1
    };
    constructor(private managerService: ManagerService, private modalService: NgbModal) { }

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

    setItemPerpage(page) {
        this.config.itemsPerPage = page;
    }
}
