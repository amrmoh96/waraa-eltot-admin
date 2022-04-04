import { UtilityService } from './../../../services/utility.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Media } from 'src/app/models/Media.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MediaService } from 'src/app/services/media.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-media',
	templateUrl: './media.component.html',
	styleUrls: [ './media.component.scss' ]
})
export class MediaComponent implements OnInit {
	public media: Media[] = [];
	public imgApi: string = environment.imgApi;
	constructor(
		public mediaService: MediaService,
		private loader: LoaderService,
		private messageService: MessageService,
		public UtilityService: UtilityService
	) {}

	ngOnInit(): void {
		this.loader.showLoader();
		this.mediaService
			.getAllMedia()
			.then((res) => {
				this.media = res;
				this.loader.hideLoader();
			})
			.catch((err) => {
				this.loader.hideLoader();
			});
	}

	deleteMedia(id: number) {
		this.loader.showLoader();
		this.mediaService
			.deleteMedia(id)
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

	viewMedia(media: Media) {
		this.UtilityService.mediaObject = media;
		this.UtilityService.showMedia();
	}
}
