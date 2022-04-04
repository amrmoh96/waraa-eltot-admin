import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Media, MediaFile } from 'src/app/models/Media.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MediaService } from 'src/app/services/media.service';

@Component({
	selector: 'app-add-media',
	templateUrl: './add-media.component.html',
	styleUrls: [ './add-media.component.scss' ]
})
export class AddMediaComponent implements OnInit {
	@ViewChild('mediaForm', { static: true })
	public mediaForm: NgForm | undefined;
	public media: Media = {};
	public isEdit: boolean = false;
	public mediaId: number = 0;
	public isSubmitted: boolean = false;
	public mediaTypes: any[] = [ { id: '', name: '' }, { id: 1, name: 'Video' }, { id: 2, name: 'Image' } ];
	public mediaFiles: MediaFile = {};
	public selectedFile: File = new File([], '');
	constructor(
		private mediaService: MediaService,
		private activatedRoute: ActivatedRoute,
		private loader: LoaderService,
		private messageService: MessageService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((P) => {
			this.media.mediaType = 1;
			if (P.id) {
				this.isEdit = true;
				this.mediaId = Number(P.id);
				this.loader.showLoader();
				this.mediaService
					.getMediaById(Number(this.mediaId))
					.then((res) => {
						if (res) {
							this.media = res;
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
			let _newMedia = <Media>JSON.parse(JSON.stringify(this.media));
			console.log(this.media);

			if (this.isEdit) {
				this.editMedia(_newMedia);
			} else {
				this.addNewMedia(_newMedia);
			}
		}
	}

	editMedia(char: Media): void {
		this.mediaService
			.editMedia(char)
			.then((res) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Updated Successfully',
					detail: 'Media updated successfully'
				});
			})
			.catch((err) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'We could not update media, please try again'
				});
			});
	}

	addNewMedia(media: Media): void {
		this.mediaService
			.addMedia(media)
			.then((res) => {
				if (media.mediaType == 2) {
					this.mediaService
						.savePhoto(res.id, this.selectedFile)
						.then((data) => {
							this.loader.hideLoader();
							this.messageService.add({
								severity: 'success',
								summary: 'Added Successfully',
								detail: 'Media added successfully'
							});
							this.router.navigate([ '/media' ]);
						})
						.catch((err) => {
							this.loader.hideLoader();
							this.messageService.add({
								severity: 'error',
								summary: 'Failed to upload image',
								detail: 'Image not uploaded'
							});
							this.router.navigate([ '/media' ]);
						});
				} else {
					this.loader.hideLoader();
				}
			})
			.catch((err) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'We could not save media, please try again'
				});
			});
	}

	imageUpload($event: any) {
		this.selectedFile = $event.target.files[0];
	}
}
