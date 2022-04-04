import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters-component/characters-component.component';
import { AddCharactersComponent } from './add-characters-component/add-characters-component.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { ViewCharacterComponent } from './view-character/view-character.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ CharactersComponent, AddCharactersComponent, ViewCharacterComponent ],
	imports: [
		CommonModule,
		CharactersRoutingModule,
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
export class CharactersModule {}
