import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';


@Component({
    selector: 'app-admin-nav',
    templateUrl: './admin-nav.component.html',
    styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    public isCollapsed = true;

    constructor(location: Location, private element: ElementRef, private router: Router) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler');
        // this.sidebarClose();

    }

    ngAfterViewInit() {
        let routerChange = this.router.events;
        if (routerChange && routerChange != undefined) {
            routerChange.subscribe((event) => {
                this.sidebarClose();
                var $layer: any = document.getElementsByClassName('close-layer');
                if ($layer) {
                    $layer.remove();
                    this.mobile_menu_visible = 0;
                }
            });
        }
    }


    collapse() {
        this.isCollapsed = !this.isCollapsed;
        console.log(this.isCollapsed);

        const navbar = document.getElementsByTagName('nav')[0];
        if (!this.isCollapsed) {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('bg-white');
        } else {
            navbar.classList.add('navbar-transparent');
            navbar.classList.remove('bg-white');
        }

    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
        const html = document.getElementsByTagName('html')[0];
        if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
        }

        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        html.classList.add('nav-admin-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];

        if (window.innerWidth < 991) {
            setTimeout(function () {
                mainPanel.style.position = '';
            }, 500);
        }
        this.sidebarVisible = false;
        html.classList.remove('nav-admin-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const html = document.getElementsByTagName('html')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const html = document.getElementsByTagName('html')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-admin-open');
            html.classList.remove('nav-admin-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (html.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (html.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                html.classList.remove('nav-admin-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            html.classList.add('nav-admin-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        titlee = titlee.split('/').pop();

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

}
