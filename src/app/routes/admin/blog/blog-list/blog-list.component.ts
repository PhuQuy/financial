import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/services/blog.service';

@Component({
    selector: 'app-blog-list',
    templateUrl: './blog-list.component.html',
    styleUrls: ['./blog-list.component.scss'],
    providers: [BlogService]
})
export class BlogListComponent implements OnInit {
    blogs = [];
    alls: any;
    constructor(private blogService: BlogService) {
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

}
