import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { NewsItemModule } from '@app/components/news-item/news-item.module';
import { OwlModule } from 'ngx-owl-carousel';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NewsItemModule,
    OwlModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
