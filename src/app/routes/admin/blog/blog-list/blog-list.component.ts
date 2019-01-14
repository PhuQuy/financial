import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/services/blog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '@app/modals/confirm/confirm.component';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
    selector: 'app-blog-list',
    templateUrl: './blog-list.component.html',
    styleUrls: ['./blog-list.component.scss'],
    providers: [BlogService]
})
export class BlogListComponent implements OnInit {
    blogs = [];
    alls: any;
    constructor(private blogService: BlogService, private modalService: NgbModal, private router: Router) {
        this.alls = this.blogService.getAlls();
    }

    ngOnInit() {
        if (this.alls) {
            this.alls.subscribe(blogs => {
                this.blogs = blogs;
                console.log(blogs);
            });
        }
    }

    deleteUser(id) {
        this.blogService.deleteById(id);
    }

    open(id) {
        const modalRef = this.modalService.open(ConfirmComponent);
        modalRef.componentInstance.title = 'Xác nhận xóa';
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.question = 'Bạn có chắc chắn xóa không?';
        modalRef.componentInstance.confirmText = 'Xóa';

        modalRef.result.then((id) => {
            this.blogService.deleteById(id);

        }, () => { })
    }

    openBlog(id)
    {
        this.router.navigate(['/admin/blogs', id])
    }
}
