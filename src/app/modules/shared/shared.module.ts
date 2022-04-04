import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MediaSelectorComponent } from './media-selector/media-selector.component';
import { TagsSelectorComponent } from './tags-selector/tags-selector.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CharacterSelectorComponent } from './character-selector/character-selector.component';
import { MediaFullSizeComponent } from './media-full-size/media-full-size.component';
import { MediaCardComponent } from './media-card/media-card.component';
import { MediaTableComponent } from './media-table/media-table.component';

@NgModule({
	declarations: [ MediaSelectorComponent, TagsSelectorComponent, CharacterSelectorComponent, MediaFullSizeComponent, MediaCardComponent, MediaTableComponent ],
	imports: [ CommonModule, SharedRoutingModule, DropdownModule, DialogModule, ButtonModule,FormsModule, TableModule ],
	exports: [ TagsSelectorComponent, MediaSelectorComponent, CharacterSelectorComponent, DropdownModule, MediaFullSizeComponent, MediaCardComponent, MediaTableComponent]
})
export class SharedModule {}
