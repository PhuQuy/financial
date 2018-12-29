import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsRoutingModule } from './news-routing.module';
import { FormsModule } from '@angular/forms';
import { NewsItemModule } from '@app/components/news-item/news-item.module';
import { ChangeMonth } from '@app/core/changemonth';
import { NgxPaginationModule } from 'ngx-pagination'

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    FormsModule,
    NewsItemModule,
    NgxPaginationModule
  ],
  declarations: [
    NewsComponent,
    NewsListComponent, 
    NewsDetailComponent,
    ChangeMonth
  ]
})
export class NewsModule { }
