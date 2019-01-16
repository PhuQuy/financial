import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmComponent } from '@app/modals/confirm/confirm.component';
import { UserService } from '@app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationInstance } from 'ngx-pagination';

@Component({
    selector: 'app-user-listing',
    templateUrl: './user-listing.component.html',
    styleUrls: ['./user-listing.component.scss'],
    providers: [UserService]
})
export class UserListingComponent implements OnInit {
    users = [];
    alls: any;
    id_delete;
    length: any;
    breadcrumbs;
    term;
    config: PaginationInstance = {
        id: 'comment',
        itemsPerPage: 10,
        currentPage: 1
    };
    constructor(private userService: UserService, private modalService: NgbModal, private router: Router) {
    }

    ngOnInit() {
        this.loadClient();
        this.breadcrumbs = [
            {
                router: '/admin',
                title: 'Home'
            },
            {
                router: '/admin/users',
                title: 'Users'
            }
        ]
    }

    loadClient() {
        this.alls = this.userService.getAlls();
        if (this.alls) {
            this.alls.subscribe(users => {
                this.users = users;
            });
        }
    }

    deleteUser(id) {
        this.userService.deleteById(id);
    }

    open(id) {
        const modalRef = this.modalService.open(ConfirmComponent, { centered: true });
        modalRef.componentInstance.title = 'Xác nhận xóa';
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.question = 'Bạn có chắc chắn xóa không?';
        modalRef.componentInstance.confirmText = 'Xóa';

        modalRef.result.then((id) => {
            this.userService.deleteById(id);

        }, () => { })
        // this.modalService.open(content);
        // this.id_delete = id
    }

    openDetail(id) {
        this.router.navigate(['/admin/users', id]);
    }

    checkSeen(user) {
        user.checked = true;
        this.userService.updateElement(user.id, user);
    }
    setItemPerpage(page) {
        this.config.itemsPerPage = page;
    }
}
