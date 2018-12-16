import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    loading;
    // @ViewChild('animateChild') animateChild: any;
    constructor(private router: Router, @Inject(PLATFORM_ID) public platformId: string) {
    }

    ngAfterViewInit() {
        // this.router.events
        //     .subscribe((event) => {
        //         if (event instanceof NavigationStart) {
        //             this.loading = true;
        //         }
        //         else if (
        //             event instanceof NavigationEnd ||
        //             event instanceof NavigationCancel
        //         ) {
        //             this.loading = false;

        //             if (isPlatformBrowser(this.platformId)) {
        //                 window.scrollTo(0, 0);
        //             }
        //         }
        //     });
    }
}
