import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() config: any;

    constructor() { }

    pageChange(page) {
        this.config.currentPage = page;
    }

    prev(page) {
        if (!page.isFirstPage()) {
            page.previous();
        }
    }

    next(page) {
        if (!page.isLastPage()) {
            page.next();
        }
    }

    ngOnInit() {
    }

}
