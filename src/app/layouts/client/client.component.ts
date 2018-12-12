import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})
export class ClientComponent implements AfterViewInit {
    loading;
    constructor(private router: Router, @Inject(PLATFORM_ID) public platformId: string) {
    }

    ngOnInit() {
        console.log('ahihi');
        
    }

    ngAfterViewInit() {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.loading = true;
                }
                else if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel
                ) {
                    this.loading = false;

                    if (isPlatformBrowser(this.platformId)) {
                        window.scrollTo(0, 0);
                    }
                }
            });
    }

}
