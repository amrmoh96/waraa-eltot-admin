import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRoutingModule } from './topic-routing.module';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { TopicComponent } from './topic/topic.component';
import { ViewTopicComponent } from './view-topic/view-topic.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddTopicComponent,
    TopicComponent,
    ViewTopicComponent
  ],
  imports: [
    CommonModule,
    TopicRoutingModule,
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
export class TopicModule { }
