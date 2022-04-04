import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTagComponent } from './add-tag/add-tag.component';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
	{ path: '', component: TagsComponent },
	{ path: 'create', component: AddTagComponent },
	{ path: 'edit/:id', component: AddTagComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class TagsRoutingModule {}
