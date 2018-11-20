import { Component, AfterViewInit } from '@angular/core';
import { SeoService } from '@app/services/seo.service';
import { BaseService } from '@app/services/base.service';
import { UserService } from '@app/services/news.service';

declare var $: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [SeoService, UserService]
})
export class HomeComponent implements AfterViewInit {
    user: any = new Object();
    constructor(private seoService: SeoService, private userService: UserService) {
        userService.getAlls().subscribe(data => {
            console.log(data);

        })
    }

    createUser() {
        console.log(this.user);
        this.userService.create(this.user);
    }

    ngOnInit() {
        this.seoService.generateTags({
            title: 'Feeds | Tin đăng mới nhất trên Hosiana',
            description: 'Cập nhật tin đăng bất động sản mới nhất, mua bán nhà đất, trao đổi nhà đất, dự án mới nhất, đại lý bất động sản, tin tức bất động sản, dịch vụ nhà cửa',
            slug: 'feeds',
            keywords: 'tin dang bat dong san, dai ly bat dong san, tin tuc bat dong san, dai ly bat dong san, dich vu nha cua'
        });

    }

    ngAfterViewInit() {
        $(".news-carousel").owlCarousel({
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
                    items: 3,
                    nav: false,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 1000,
                    autoplayHoverPause: true,
                },
                1000: {
                    items: 4,
                    nav: true,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,

                }
            }
        });

        $(".owl-carousel2").owlCarousel({
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
