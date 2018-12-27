import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'news-item',
    templateUrl: './news-item.component.html',
    styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
    @Input() blog: any;
    constructor() { }

    ngOnInit() {
    }

}
