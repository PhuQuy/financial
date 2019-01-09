import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { SeoService } from '@app/services/seo.service';
import { BlogService } from '@app/services/blog.service';

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
    @ViewChild('appOutlet') outlet: RouterOutlet;

    constructor(private router: Router, private seoService: SeoService, private blogService: BlogService) {
        this.alls = this.blogService.getAlls();
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
