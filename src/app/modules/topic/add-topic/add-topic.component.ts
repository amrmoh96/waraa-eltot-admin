import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Topic } from 'src/app/models/Topic.model';
import { LoaderService } from 'src/app/services/loader.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {

  @ViewChild('topicForm', { static: true })
	public topicForm: NgForm | undefined;
	public topic: Topic = {};
	public isEdit: boolean = false;
	public topicId: number = 0;
	public isSubmitted: boolean = false;
	constructor(
		private topicService: TopicService,
		private activatedRoute: ActivatedRoute,
		private loader: LoaderService,
		private messageService: MessageService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((P) => {
			if (P.id) {
				this.isEdit = true;
				this.topicId = Number(P.id);
				this.loader.showLoader();
				this.topicService
					.getTopicById(Number(this.topicId))
					.then((res) => {
						if (res) {
							this.topic = res;
							this.loader.hideLoader();
						}
					})
					.catch((err) => {
						this.loader.hideLoader();
						this.messageService.add({
							severity: 'error',
							summary: 'Error',
							detail: `Can't get topic with id ${this.topicId}`
						});
						this.router.navigate([ '/topic' ]);
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
			let _newTopic = <Topic>JSON.parse(JSON.stringify(this.topic));
			if (this.isEdit) {
				this.edittopic(_newTopic);
			} else {
				this.addNewtopic(_newTopic);
			}
		}
	}

	edittopic(topic: Topic): void {
		this.topicService
			.editTopic(topic)
			.then((res) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Updated Successfully',
					detail: 'topic updated successfully'
				});
			})
			.catch((err) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'We could not update topic, please try again'
				});
			});
	}

	addNewtopic(topic: Topic): void {
		this.topicService
			.addTopic(topic)
			.then((res) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Updated Successfully',
					detail: 'topic added successfully'
				});
				this.router.navigate([ '/topic' ]);
			})
			.catch((err) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'We could not save topic, please try again'
				});
			});
	}

}
