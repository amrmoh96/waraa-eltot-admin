import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags/tags.component';
import { AddTagComponent } from './add-tag/add-tag.component';
import { ViewTagComponent } from './view-tag/view-tag.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
	declarations: [ TagsComponent, AddTagComponent, ViewTagComponent ],
	imports: [
		CommonModule,
		TagsRoutingModule,
		TableModule,
		ButtonModule,
		FormsModule,
		ReactiveFormsModule,
		InputTextModule,
		InputTextareaModule,
		RadioButtonModule
	]
})
export class TagsModule {}
