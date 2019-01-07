import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/a', title: 'Contact List',  icon:'education_atom', class: '' },
    // { path: '/a', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/admin/chat', title: 'Chat',  icon:'ui-1_bell-53', class: '' },

    { path: '/admin/users', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/admin/blogs', title: 'Blog',  icon:'design_bullet-list-67', class: '' },
    // { path: '/a', title: 'Typography',  icon:'text_caps-small', class: '' }
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
