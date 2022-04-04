import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewsComponent } from './add-news/add-news.component';
import { NewsComponent } from './news/news.component';
import { ViewNewsComponent } from './view-news/view-news.component';

const routes: Routes = [
	{ path: '', component: NewsComponent },
	{ path: 'create', component: AddNewsComponent },
	{ path: 'edit/:id', component: AddNewsComponent },
	{ path: 'view/:id', component: ViewNewsComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class NewsRoutingModule {}
