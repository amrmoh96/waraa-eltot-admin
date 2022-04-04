import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewsRoutingModule } from './news-routing.module';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NewsComponent } from './news/news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { ViewNewsComponent } from './view-news/view-news.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ NewsComponent, AddNewsComponent, ViewNewsComponent ],
	imports: [
		CommonModule,
		NewsRoutingModule,
		TableModule,
		ButtonModule,
		FormsModule,
		ReactiveFormsModule,
		InputTextModule,
		InputTextareaModule,
		RadioButtonModule,
		SharedModule
	]
})
export class NewsModule {}
