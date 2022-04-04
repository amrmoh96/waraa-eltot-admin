import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media/media.component';
import { AddMediaComponent } from './add-media/add-media.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ViewMediaComponent } from './view-media/view-media.component';
import { SharedModule } from '../shared/shared.module';
import { TagModule } from 'primeng/tag';



@NgModule({
	declarations: [ MediaComponent, AddMediaComponent, ViewMediaComponent ],
	imports: [
		CommonModule,
		MediaRoutingModule,
		TableModule,
		ButtonModule,
		FormsModule,
		ReactiveFormsModule,
		InputTextModule,
		InputTextareaModule,
		RadioButtonModule,
		SharedModule,
		TagModule
	]
})
export class MediaModule {}
