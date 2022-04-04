import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { TopicComponent } from './topic/topic.component';

const routes: Routes = [
  { path: '', component: TopicComponent },
	{ path: 'create', component: AddTopicComponent },
	{ path: 'edit/:id', component: AddTopicComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
