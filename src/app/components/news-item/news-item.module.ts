import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsItemComponent } from './news-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [NewsItemComponent],
    exports: [NewsItemComponent]
})
export class NewsItemModule { }
