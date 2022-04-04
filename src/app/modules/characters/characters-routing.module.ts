import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCharactersComponent } from './add-characters-component/add-characters-component.component';
import { CharactersComponent } from './characters-component/characters-component.component';
import { ViewCharacterComponent } from './view-character/view-character.component';

const routes: Routes = [
	{ path: '', component: CharactersComponent },
	{ path: 'create', component: AddCharactersComponent },
	{ path: 'edit/:id', component: AddCharactersComponent },
	{ path: 'view/:id', component: ViewCharacterComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class CharactersRoutingModule {}
