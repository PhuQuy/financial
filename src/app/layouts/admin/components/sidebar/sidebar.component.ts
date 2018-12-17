import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/a', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/a', title: 'Icons',  icon:'education_atom', class: '' },
    { path: '/a', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/a', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },

    { path: '/admin/users', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/a', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/a', title: 'Typography',  icon:'text_caps-small', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
