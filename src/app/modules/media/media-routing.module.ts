import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMediaComponent } from './add-media/add-media.component';
import { MediaComponent } from './media/media.component';
import { ViewMediaComponent } from './view-media/view-media.component';

const routes: Routes = [
	{ path: '', component: MediaComponent },
	{ path: 'create', component: AddMediaComponent },
	{ path: 'edit/:id', component: AddMediaComponent },
	{ path: 'view/:id', component: ViewMediaComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class MediaRoutingModule {}
