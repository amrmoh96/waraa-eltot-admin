import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/models/Character.model';
import { CharacterService } from 'src/app/services/character.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-character-selector',
  templateUrl: './character-selector.component.html',
  styleUrls: ['./character-selector.component.scss']
})
export class CharacterSelectorComponent implements OnInit {

  
  public characters: Character[] = [];
	public selectedCharacter: Character = {};
	display: boolean = false;
	@Output() onCharacterSelect: EventEmitter<any> = new EventEmitter();

	constructor(private characterService: CharacterService, private loader: LoaderService) {}

	ngOnInit(): void {}

	public getCharacters(): void {
		this.loader.showLoader();
		this.characterService
			.getCharacters()
			.then((res) => {
				console.log(res);
				this.characters = res;
				this.selectedCharacter = res[0];
				this.loader.hideLoader();
			})
			.catch((err) => {
				this.loader.hideLoader();
			});
	}

	showDialog() {
		this.display = true;
		this.getCharacters();
	}
	selectCharacter() {
		this.onCharacterSelect.emit(this.selectedCharacter);
		this.display = false;
	}
	dropdownChange($event: any) {
		this.selectedCharacter = $event.value;
	}

}
