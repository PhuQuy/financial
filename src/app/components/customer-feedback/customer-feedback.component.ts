import { Component, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'customer-feedback',
    templateUrl: './customer-feedback.component.html',
    styleUrls: ['./customer-feedback.component.scss']
})
export class CustomerFeedbackComponent implements AfterViewInit {

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        $(".owl-carousel").owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            items: 1,
            nav: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
        });
    }
}
