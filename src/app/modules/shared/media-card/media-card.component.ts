import { Media } from './../../../models/Media.model';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
	selector: 'app-media-card',
	templateUrl: './media-card.component.html',
	styleUrls: [ './media-card.component.scss' ]
})
export class MediaCardComponent implements OnInit {
	public imgApi: string = environment.imgApi;
	@Input() media: Media = {};
	@Input() width: number = 200;
	@Input() height: number = 200;
	constructor(public UtilityService: UtilityService) {}

	ngOnInit(): void {}
}
