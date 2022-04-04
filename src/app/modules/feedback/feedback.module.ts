import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';

@NgModule({
	declarations: [ FeedbackComponent, ViewFeedbackComponent ],
	imports: [ CommonModule, FeedbackRoutingModule, SharedModule, TableModule, ButtonModule ]
})
export class FeedbackModule {}
