import { UtilityService } from './../../../services/utility.service';
import { Media } from './../../../models/Media.model';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-media-table',
	templateUrl: './media-table.component.html',
	styleUrls: [ './media-table.component.scss' ]
})
export class MediaTableComponent implements OnInit {
	@Input() media: Media[] = [];
	public imgApi: string = environment.imgApi;
	constructor(public UtilityService: UtilityService) {}

	ngOnInit(): void {}
	viewMedia(media: Media) {
		this.UtilityService.mediaObject = media;
		this.UtilityService.showMedia();
	}
}
