import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/services/blog.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  providers: [BlogService]
})
export class NewsListComponent implements OnInit {

  blogs = [];
  alls: any;
  p: number = 1;

  config: PaginationInstance = {
    itemsPerPage: 10,
    currentPage: 1
  };
  constructor(private blogService: BlogService) {
    this.alls = this.blogService.getAlls()
  }

  ngOnInit() {
    if (this.alls) {
      this.alls.subscribe(blogs => {
        this.blogs = blogs;
      });

    }
  }


}
