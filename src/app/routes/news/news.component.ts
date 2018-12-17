import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
    searchText: string = '';
    state;
    @ViewChild('appOutlet') outlet: RouterOutlet;

    constructor(private router: Router) { }

    ngOnInit() {
        this.state = this.outlet.activatedRouteData['routing'];
        console.log(this.state);

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
