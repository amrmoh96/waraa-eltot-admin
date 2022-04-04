import { UtilityService } from './../../../services/utility.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Character } from 'src/app/models/Character.model';
import { CharacterMedia } from 'src/app/models/CharacterMedia.model';
import { Media } from 'src/app/models/Media.model';
import { MediaTag } from 'src/app/models/MediaTag.model';
import { Tag } from 'src/app/models/Tag.model';
import { CharacterMediaService } from 'src/app/services/character-media.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MediaTagService } from 'src/app/services/media-tag.service';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-view-media',
	templateUrl: './view-media.component.html',
	styleUrls: [ './view-media.component.scss' ]
})
export class ViewMediaComponent implements OnInit {
	public media: Media = {};
	public mediaID: number = 0;
	public mediaTags: Tag[] | undefined = [];
	public characters:Character[] = [];
	public imgApi:string = environment.imgApi;
	constructor(
		private mediaService: MediaService,
		private activatedRoute: ActivatedRoute,
		private loader: LoaderService,
		private messageService: MessageService,
		private router: Router,
		private mediaTagService: MediaTagService,
		private tagService: TagsService,
		private characterMediaService:CharacterMediaService,
		public UtilityService:UtilityService
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((P) => {
			if (P.id) {
				this.mediaID = Number(P.id);
				this.loader.showLoader();
				this.mediaService
					.getMediaById(Number(P.id))
					.then((res) => {
						if (res) {
							this.media = res;
							this.getMediaTags();
							this.getMediaCharacters();
						}
					})
					.catch((err) => {
						this.loader.hideLoader();
					});
			}
		});
	}

	assignTag($event: any) {
		console.log($event);
		let _mediaTag: MediaTag = { tagId: $event.id, mediaId: this.mediaID };
		if(this.mediaTags?.find(MT => MT.id == _mediaTag.tagId)){
			this.messageService.add({
				severity: 'info',
				summary: 'Tag Exist',
				detail: `${this.mediaTags?.find(MT => MT.id == _mediaTag.tagId)?.tag1} is already assigned to ${this.media.title}`
			});
		}else{
			this.loader.showLoader();
			this.mediaTagService.addMediaTag(_mediaTag).then((res) => {
				this.getMediaTags();
				this.messageService.add({
					severity: 'success',
					summary: 'Tag Assigned',
					detail: `Tag assigned to ${this.media.title} succussfully`
				});
			}).catch(err => {
				this.messageService.add({
					severity: 'error',
					summary: `Can't assign Tag`,
					detail: `${this.mediaTags?.find(MT => MT.id == _mediaTag.tagId)?.tag1} assigned to ${this.media.title} failed, please try again`
				});
			});
		}
	}

	assignCharacter($event:any){
		console.log($event);
		let _characterMedia: CharacterMedia = { charachterId: $event.id, mediaId: this.mediaID };
		if(this.characters?.find(MT => MT.id == _characterMedia.mediaId)){
			this.messageService.add({
				severity: 'info',
				summary: 'Character Exist',
				detail: `${this.characters?.find(MT => MT.id == _characterMedia.mediaId)?.firstname} is already assigned to ${this.media.title}`
			});
		}else{
			this.loader.showLoader();
			this.characterMediaService.addCharacterMedia(_characterMedia).then((res) => {
				this.getMediaCharacters();
				this.messageService.add({
					severity: 'success',
					summary: 'Characters Assigned',
					detail: `character assigned to ${this.media.title} succussfully`
				});
				this.loader.hideLoader();
			}).catch(err => {
				this.messageService.add({
					severity: 'error',
					summary: `Can't assign Character`,
					detail: `assign character to ${this.media.title} failed, please try again`
				});
				this.loader.hideLoader();
			});
		}
	}


	getMediaTags() {
		this.tagService.getTagsByMediaId(this.mediaID).then((res) => {
			console.log(res);
			this.mediaTags = res;
			this.loader.hideLoader();
		});
	}

	getMediaCharacters(){
		this.mediaService.getCharactersByMediaId(this.mediaID).then(res => {
			this.characters = res;
		});
	}

	removeTag(tagID:number = 0){
		console.log(this.mediaTags);
		// this.mediaTagService.deleteMediaTag(tagID).then(res => {
		// 	console.log(res);
		// })
		
	}

	viewMedia(){
		this.UtilityService.mediaObject = this.media;
		this.UtilityService.showMedia();
	}
}
