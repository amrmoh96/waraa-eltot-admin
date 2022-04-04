import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', component: FeedbackComponent },
	{ path: 'view/:id', component: ViewFeedbackComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class FeedbackRoutingModule {}
