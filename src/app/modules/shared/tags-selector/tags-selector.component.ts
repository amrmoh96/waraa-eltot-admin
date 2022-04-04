import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Tag } from 'src/app/models/Tag.model';
import { LoaderService } from 'src/app/services/loader.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
	selector: 'app-tags-selector',
	templateUrl: './tags-selector.component.html',
	styleUrls: [ './tags-selector.component.scss' ]
})
export class TagsSelectorComponent implements OnInit {
	public tags: Tag[] = [];
	public selectedTag: Tag = {};
	display: boolean = false;
	@Output() onTagSelect: EventEmitter<any> = new EventEmitter();

	constructor(private tagService: TagsService, private loader: LoaderService) {}

	ngOnInit(): void {}

	public getTags(): void {
		this.loader.showLoader();
		this.tagService
			.getTags()
			.then((res) => {
				console.log(res);
				this.tags = res;
				this.selectedTag = res[0];
				this.loader.hideLoader();
			})
			.catch((err) => {
				this.loader.hideLoader();
			});
	}

	showDialog() {
		this.display = true;
		this.getTags();
	}
	selectTag() {
		this.onTagSelect.emit(this.selectedTag);
		this.display = false;
	}
	dropdownChange($event: any) {
		this.selectedTag = $event.value;
	}
}
