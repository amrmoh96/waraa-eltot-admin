import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Tag } from 'src/app/models/Tag.model';
import { LoaderService } from 'src/app/services/loader.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
	selector: 'app-add-tag',
	templateUrl: './add-tag.component.html',
	styleUrls: [ './add-tag.component.scss' ]
})
export class AddTagComponent implements OnInit {
	@ViewChild('tagsForm', { static: true })
	public tagsForm: NgForm | undefined;
	public tag: Tag = {};
	public isEdit: boolean = false;
	public tagsId: number = 0;
	public isSubmitted: boolean = false;
	constructor(
		private tagsService: TagsService,
		private activatedRoute: ActivatedRoute,
		private loader: LoaderService,
		private messageService: MessageService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((P) => {
			if (P.id) {
				this.isEdit = true;
				this.tagsId = Number(P.id);
				this.loader.showLoader();
				this.tagsService
					.getTagById(Number(this.tagsId))
					.then((res) => {
						if (res) {
							this.tag = res;
							this.loader.hideLoader();
						}
					})
					.catch((err) => {
						this.loader.hideLoader();
						this.messageService.add({
							severity: 'error',
							summary: 'Error',
							detail: `Can't get tag with id ${this.tagsId}`
						});
						this.router.navigate([ '/tags' ]);
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
			let _newTag = <Tag>JSON.parse(JSON.stringify(this.tag));
			if (this.isEdit) {
				this.edittags(_newTag);
			} else {
				this.addNewtags(_newTag);
			}
		}
	}

	edittags(tags: Tag): void {
		this.tagsService
			.editTag(tags)
			.then((res) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Updated Successfully',
					detail: 'Tag updated successfully'
				});
			})
			.catch((err) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'We could not update tag, please try again'
				});
			});
	}

	addNewtags(tags: Tag): void {
		this.tagsService
			.addTag(tags)
			.then((res) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Updated Successfully',
					detail: 'Tag added successfully'
				});
				this.router.navigate([ '/tags' ]);
			})
			.catch((err) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'We could not save tag, please try again'
				});
			});
	}
}
