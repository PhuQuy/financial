import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalStorageService } from '@app/services/local-storage.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    isAdmin: boolean
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard', icon: 'design_app', class: '', isAdmin: true },
    { path: '/admin/contact', title: 'Contact List', icon: 'education_atom', class: '', isAdmin: false },
    { path: '/admin/user-management', title: 'User Management',  icon:'location_map-big', class: '' , isAdmin: true},
    { path: '/admin/chat', title: 'Chat', icon: 'ui-1_bell-53', class: '', isAdmin: false },

    { path: '/admin/users', title: 'User Profile', icon: 'users_single-02', class: '', isAdmin: false },
    { path: '/admin/blogs', title: 'Blog', icon: 'design_bullet-list-67', class: '', isAdmin: false },
    { path: '/admin/system', title: 'System',  icon:'text_caps-small', class: '', isAdmin: true  }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor(private localStorageService: LocalStorageService) { }

    ngOnInit() {
        let user = this.localStorageService.getItem('user');
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        // if (user && user.role == 'admin') {
        //     this.menuItems = ROUTES.filter(menuItem => menuItem);
        // } else {
        //     this.menuItems = ROUTES.filter(menuItem => menuItem.isAdmin == false);

        // }

    }
    isMobileMenu() {
        if (window.innerWidth > 991) {
            return false;
        }
        return true;
    };
}
