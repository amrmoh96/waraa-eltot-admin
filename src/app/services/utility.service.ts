import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Media } from '../models/Media.model';

@Injectable({
	providedIn: 'root'
})
export class UtilityService {
	public isMediaShown: boolean = false;
	public mediaObject: Media = {};
	constructor(private sanitizer: DomSanitizer) {}

	public showMedia() {
		this.isMediaShown = true;
	}

	public hideMedia() {
		this.isMediaShown = false;
	}
	iFrameSRC(media:Media) {
		let _URL = `https://www.youtube.com/embed/${media.youtubeId}`;
		return this.sanitizer.bypassSecurityTrustResourceUrl(_URL);
	}
}
