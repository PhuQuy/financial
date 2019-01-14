import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BlogService } from '@app/services/blog.service';
import { SeoService } from '@app/services/seo.service';
import { SharedService } from '@app/services/shared.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    providers: [SeoService, BlogService]

})
export class NewsComponent implements OnInit {
    searchText: string = '';
    state;
    blogs = [];
    alls: any;
    title;
    detail;
    @ViewChild('appOutlet') outlet: RouterOutlet;

    constructor(private router: Router, private seoService: SeoService, private blogService: BlogService, private sharedService: SharedService) {
        this.alls = this.blogService.getAlls();
        sharedService.title.subscribe(title => {
            this.title = title;
            console.log(title);

        })
    }

    ngOnInit() {
        this.state = this.outlet.activatedRouteData['routing'];
        console.log(this.state);
        this.seoService.generateTags({
            title: ' Liên hệ vay vốn sinh viên',
            description: 'Liên hệ Vay vốn sinh viên',
            slug: 'contact',
            keywords: 'vay von sinh vien'
        });
        if (this.alls) {
            this.alls.subscribe(blogs => {
                this.blogs = blogs;
                console.log(this.blogs);

            });
        }

    }

    search() {

    }

    ngAfterViewInit() {
        // this.router.events
        //     .subscribe((event) => {
        //         if (event instanceof NavigationStart) {

        //         }
        //         else if (
        //             event instanceof NavigationEnd ||
        //             event instanceof NavigationCancel
        //         ) {
        //             this.state = this.outlet.activatedRouteData['routing'];
        //             console.log(this.state);

        //         }
        //     });
    }
}
