import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Character } from 'src/app/models/Character.model';
import { CharacterMedia } from 'src/app/models/CharacterMedia.model';
import { Media } from 'src/app/models/Media.model';
import { CharacterMediaService } from 'src/app/services/character-media.service';
import { CharacterService } from 'src/app/services/character.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-view-character',
	templateUrl: './view-character.component.html',
	styleUrls: [ './view-character.component.scss' ]
})
export class ViewCharacterComponent implements OnInit {
	public character: Character = {};
	public characterID: number = 0;
	public characterMedia:Media[] = [];
	public characterImage:string="";
	constructor(
		private characterService: CharacterService,
		private activatedRoute: ActivatedRoute,
		private loader: LoaderService,
		private messageService: MessageService,
		private router: Router,
		private characterMediaService:CharacterMediaService,
		private mediaService:MediaService,
		private tagService:TagsService
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((P) => {
			if (P.id) {
				this.characterID = Number(P.id);
				this.loader.showLoader();
				this.characterService
					.getCharacterById(Number(P.id))
					.then((res) => {
						if (res) {
							this.character = res;
							this.getMediaTags();
						}
					})
					.catch((err) => {
						this.loader.hideLoader();
					});
			}
		});
	}

	assignMedia($event: any) {
		let _characterMedia: CharacterMedia = { charachterId: this.characterID, mediaId: $event.id };
		if(this.characterMedia?.find(MT => MT.id == _characterMedia.mediaId)){
			this.messageService.add({
				severity: 'info',
				summary: 'Media Exist',
				detail: `${this.characterMedia?.find(MT => MT.id == _characterMedia.mediaId)?.title} is already assigned to ${this.character.firstname}`
			});
		}else{
			this.loader.showLoader();
			this.characterMediaService.addCharacterMedia(_characterMedia).then((res) => {
				this.getMediaTags();
				this.messageService.add({
					severity: 'success',
					summary: 'Tag Assigned',
					detail: `media assigned to ${this.character.firstname} succussfully`
				});
			}).catch(err => {
				this.messageService.add({
					severity: 'error',
					summary: `Can't assign Tag`,
					detail: `media  assigned to ${this.character.firstname} failed, please try again`
				});
			});
		}
	}

	getMediaTags() {
		this.mediaService.getMediaByCharacterId(this.characterID).then((res) => {
			this.characterMedia = res;
			for (let index = 0; index < this.characterMedia.length; index++) {
				const element = this.characterMedia[index];
				if(element.id){
					this.tagService.getTagsByMediaId(element.id).then(tags => {
						if(tags?.find(T => T.tag1 == 'main_image')){
							this.characterImage = `${environment.imgApi}/Media/GetMedia?id=${element.id}`;
						}
					})
				}
			}
			this.loader.hideLoader();
		});
	}
	deleteMedia(id:number){
		this.characterMediaService.deleteCharacterMedia(id).then()
	}
}
