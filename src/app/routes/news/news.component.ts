import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  searchText: string = '';
  constructor() { }

  ngOnInit() {
  }
  
  getPage(outlet) {
    return outlet.activatedRouteData['routing'] == 'detail';
  }

  search(){

  }
}
