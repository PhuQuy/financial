import { Component, AfterViewInit } from '@angular/core';

declare var $: any;
@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements AfterViewInit {

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        $(".custom1").owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            animateOut: 'slideOutDown',
            animateIn: 'flipInX',
            responsive: {
                0: {
                    items: 1,
                    nav: true,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 1000,
                    autoplayHoverPause: true,
                },
                600: {
                    items: 2,
                    nav: false,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 1000,
                    autoplayHoverPause: true,
                },
                1000: {
                    items: 3,
                    nav: true,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,

                }
            }
        });
    }
}
