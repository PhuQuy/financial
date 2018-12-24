import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news.component';

const routes: Routes = [
    {
        path: '',
        component: NewsComponent,
        children: [
            { path: '', component: NewsListComponent, data: { routing: 'blog' } },
            { path: ':id', component: NewsDetailComponent, data: { routing: 'detail' } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class NewsRoutingModule { }
