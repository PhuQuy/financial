import { Component, AfterViewInit } from '@angular/core';
import { BlogService } from '@app/services/blog.service';
import { ActivatedRoute } from '@angular/router';



declare var $: any;
@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss'],
    providers: [BlogService]
})
export class NewsDetailComponent implements AfterViewInit {

    blog: any;
    id: any;
    constructor(private blogService: BlogService, private route: ActivatedRoute) {


    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != 'create') {
                this.id = params['id'];
                this.blogService.getById(this.id).subscribe(blog => {
                    console.log(blog);
                    
                    this.blog = blog;
                })
            }
        });
    }

    ngAfterViewInit() {


        // $(".custom1").owlCarousel({
        //     loop: true,
        //     margin: 10,
        //     responsiveClass: true,
        //     animateOut: 'slideOutDown',
        //     animateIn: 'flipInX',
        //     responsive: {
        //         0: {
        //             items: 1,
        //             nav: true,
        //             loop: true,
        //             autoplay: true,
        //             autoplayTimeout: 1000,
        //             autoplayHoverPause: true,
        //         },
        //         600: {
        //             items: 2,
        //             nav: false,
        //             loop: true,
        //             autoplay: true,
        //             autoplayTimeout: 1000,
        //             autoplayHoverPause: true,
        //         },
        //         1000: {
        //             items: 3,
        //             nav: true,
        //             loop: true,
        //             autoplay: true,
        //             autoplayTimeout: 5000,
        //             autoplayHoverPause: true,

        //         }
        //     }
        // });
    }
}
