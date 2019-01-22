import { AfterViewInit, Component } from '@angular/core';
import { BlogService } from '@app/services/blog.service';
import { SeoService } from '@app/services/seo.service';
import { UserService } from '@app/services/user.service';
import { SharedService } from '@app/services/shared.service';
import { LocalStorageService } from '@app/services/local-storage.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [SeoService, UserService, BlogService]
})
export class HomeComponent implements AfterViewInit {
    user: any = new Object();
    encrypt;
    moneySelected: number;
    longSelected: number;
    images = [];
    blogs = [];
    moneys: Array<Object> = [
        { num: 500000, title: 'SỐ TIỀN VAY (VNĐ)' },
        { num: 500000, title: '500.000 VNĐ' },
        { num: 1000000, title: '1.000.000 VNĐ' },
        { num: 1500000, title: '1.500.000 VNĐ' },
        { num: 2000000, title: '2.000.000 VNĐ' },
        { num: 2500000, title: '2.500.000 VNĐ' },
        { num: 3000000, title: '3.000.000 VNĐ' },
        { num: 3500000, title: '3.500.000 VNĐ' },
        { num: 4000000, title: '4.000.000 VNĐ' },
        { num: 4500000, title: '4.500.000 VNĐ' },
        { num: 5000000, title: '5.000.000 VNĐ' }
    ];

    longs: Array<Object> = [
        { num: 3, title: 'BAO LÂU?' },
        { num: 3, title: '3 Tháng' },
        { num: 6, title: '6 Tháng' },
        { num: 8, title: '8 Tháng' },
        { num: 10, title: '10 Tháng' },
        { num: 12, title: '1 Năm' }
    ];

    carouselOption = {
        items: 3,
        dots: false,
        loop: false,
        navigation: false,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: false
            }
        }
    };

    constructor(private seoService: SeoService, private userService: UserService, private blogService: BlogService, private shareService: SharedService, private localStoredService: LocalStorageService) {
    }

    changeMoney(moneySelected) {
        this.user.money = moneySelected;
    }

    changeTime(longSelected) {
        this.user.long = longSelected;
    }

    saveUserLocal() {
        this.localStoredService.setItem('currentUser', this.user);
    }


    createUser() {
        this.userService.createUser(this.user);
        this.user = {};
    }

    ngOnInit() {
        this.seoService.generateTags({
            title: 'Vay vốn sinh viên',
            description: 'Vay vốn sinh viên',
            slug: 'home',
            keywords: 'vay von sinh vien'
        });

        this.blogService.getAlls().subscribe(blogs => {
            this.blogs = blogs;
        })
    }

    ngAfterViewInit() {

    }

}
