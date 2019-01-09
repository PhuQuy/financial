import { Component, AfterViewInit } from '@angular/core';
import { BlogService } from '@app/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { stringCompare } from '@firebase/database/dist/src/core/util/util';



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

        console.log(this.formatStringtoSlug('Chính Sách Vay Vốn Sinh Viên'));
        
    }
    formatStringtoSlug(title: string): string{
            let formated = title.replace(/\s+/g, '-').toLowerCase();
            formated = formated.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            formated = formated.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            formated = formated.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            formated = formated.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            formated = formated.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            formated = formated.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            formated = formated.replace(/đ/g, "d");
            return formated;
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
