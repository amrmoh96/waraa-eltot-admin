import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Character } from 'src/app/models/Character.model';
import { CharacterService } from 'src/app/services/character.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
	selector: 'app-characters-component',
	templateUrl: './characters-component.component.html',
	styleUrls: [ './characters-component.component.scss' ]
})
export class CharactersComponent implements OnInit {
	public characters: Character[] = [];
	constructor(
		public characterService: CharacterService,
		private loader: LoaderService,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		this.loader.showLoader();
		this.characterService
			.getCharacters()
			.then((res) => {
				this.characters = res;
				this.loader.hideLoader();
			})
			.catch((err) => {
				this.loader.hideLoader();
			});
	}

	deleteCharacter(id: number) {
		this.loader.showLoader();
		this.characterService
			.deleteCharacter(id)
			.then((result) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Deleted Successfully',
					detail: 'Character deleted successfully'
				});
			})
			.catch((err) => {
				this.loader.hideLoader();
			});
	}
}
