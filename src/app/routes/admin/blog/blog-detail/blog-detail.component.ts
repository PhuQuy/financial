import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/services/blog.service'
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  providers: [BlogService]
})
export class BlogDetailComponent implements OnInit {
  blog: any = new Object();
  time = new Date();
  constructor(private blogService: BlogService) { }

  ngOnInit() {
  }

  createBlog(){
    this.blog.time = this.time.getTime();
    this.blogService.create(this.blog);
    this.blog = {};
  }
}
