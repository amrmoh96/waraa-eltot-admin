import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Character } from 'src/app/models/Character.model';
import { CharacterService } from 'src/app/services/character.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
	selector: 'app-add-characters-component',
	templateUrl: './add-characters-component.component.html',
	styleUrls: [ './add-characters-component.component.scss' ]
})
export class AddCharactersComponent implements OnInit {
	@ViewChild('characterForm', { static: true })
	public characterForm: NgForm | undefined;
	public character: Character = {};
	public isEdit: boolean = false;
	public characterId: number = 0;
	public isSubmitted: boolean = false;
	constructor(
		private characterService: CharacterService,
		private activatedRoute: ActivatedRoute,
		private loader: LoaderService,
		private messageService: MessageService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((P) => {
			if (P.id) {
				this.isEdit = true;
				this.characterId = Number(P.id);
				this.loader.showLoader();
				this.characterService
					.getCharacterById(Number(this.characterId))
					.then((res) => {
						if (res) {
							this.character = res;
							this.loader.hideLoader();
						}
					})
					.catch((err) => {
						this.loader.hideLoader();
					});
			}
		});
	}

	ngAfterViewInit(): void {}

	onSubmit(f: NgForm) {
		this.isSubmitted = true;
		if (f.valid) {
			this.isSubmitted = false;
			this.loader.showLoader();
			let _newChar = <Character>JSON.parse(JSON.stringify(this.character));
			_newChar.gender = Number(_newChar.gender);
			if (this.isEdit) {
				this.editCharacter(_newChar);
			} else {
				this.addNewCharacter(_newChar);
			}
		}
	}

	editCharacter(char: Character): void {
		this.characterService
			.editCharacter(char)
			.then((res) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Updated Successfully',
					detail: 'Character updated successfully'
				});
			})
			.catch((err) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'We could not update character, please try again'
				});
			});
	}

	addNewCharacter(char: Character): void {
		this.characterService
			.addCharacter(char)
			.then((res) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Updated Successfully',
					detail: 'Character added successfully'
				});
				this.router.navigate([ '/characters' ]);
			})
			.catch((err) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'We could not save character, please try again'
				});
			});
	}
}
