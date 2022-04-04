import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Media } from 'src/app/models/Media.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MediaService } from 'src/app/services/media.service';

@Component({
	selector: 'app-media-selector',
	templateUrl: './media-selector.component.html',
	styleUrls: [ './media-selector.component.scss' ]
})
export class MediaSelectorComponent implements OnInit {
	public media: Media[] = [];
	public selectedMedia: Media = {};
	display: boolean = false;
	@Output() onMediaSelect: EventEmitter<any> = new EventEmitter();

	constructor(private mediaService: MediaService, private loader: LoaderService) {}

	ngOnInit(): void {}

	public getMedias(): void {
		this.loader.showLoader();
		this.mediaService
			.getAllMedia()
			.then((res) => {
				console.log(res);
				this.media = res;
				this.selectedMedia = res[0];
				this.loader.hideLoader();
			})
			.catch((err) => {
				this.loader.hideLoader();
			});
	}

	showDialog() {
		this.display = true;
		this.getMedias();
	}
	selectMedia(m: Media) {
		this.selectedMedia = m;
	}
	emitMedia() {
		this.onMediaSelect.emit(this.selectedMedia);
		this.display = false;
	}
	dropdownChange($event: any) {
		this.selectedMedia = $event.value;
	}
}
