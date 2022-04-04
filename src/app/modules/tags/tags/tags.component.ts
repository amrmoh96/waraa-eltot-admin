import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Tag } from 'src/app/models/Tag.model';
import { LoaderService } from 'src/app/services/loader.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  public tags: Tag[] = [];
	constructor(
		public tagService: TagsService,
		private loader: LoaderService,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		this.loader.showLoader();
		this.tagService
			.getTags()
			.then((res) => {
				this.tags = res;
				this.loader.hideLoader();
			})
			.catch((err) => {
				this.loader.hideLoader();
			});
	}

	deleteTag(id: number) {
		this.loader.showLoader();
		this.tagService
			.deleteTags(id)
			.then((result) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Deleted Successfully',
					detail: 'deleted successfully'
				});
			})
			.catch((err) => {
				this.loader.hideLoader();
			});
	}

}
