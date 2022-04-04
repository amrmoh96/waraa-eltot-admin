import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Topic } from 'src/app/models/Topic.model';
import { LoaderService } from 'src/app/services/loader.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  public topic: Topic[] = [];
	constructor(
		public topicService: TopicService,
		private loader: LoaderService,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		this.loader.showLoader();
		this.topicService
			.getTopic()
			.then((res) => {
				this.topic = res;
				this.loader.hideLoader();
			})
			.catch((err) => {
				this.loader.hideLoader();
			});
	}

	deleteTopic(id: number) {
		this.loader.showLoader();
		this.topicService
			.deleteTopic(id)
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
