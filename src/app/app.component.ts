import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Configuration } from './components/redux/actions/auth.action';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    loading;
    constructor(private router: Router, @Inject(PLATFORM_ID) public platformId: string, private store: Store<any>) {
        this.store.dispatch(new Configuration());
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
