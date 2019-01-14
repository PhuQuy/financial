import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule
    ],
    declarations: [PaginationComponent],
    exports: [PaginationComponent, NgxPaginationModule]
})
export class PaginationModule { }
