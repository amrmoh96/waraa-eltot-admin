import { LoaderService } from './../../../services/loader.service';
import { FeedbackService } from './../../../services/feedback.service';
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: [ './feedback.component.scss' ]
})
export class FeedbackComponent implements OnInit {
	public feedbacks: Feedback[] = [];
	constructor(private feedback: FeedbackService, private LoaderService: LoaderService) {}

	ngOnInit(): void {
		this.LoaderService.showLoader();
		this.feedback
			.getAllFeedbacks()
			.then((data) => {
				this.feedbacks = data;
				this.LoaderService.hideLoader();
			})
			.catch((err) => {
				this.LoaderService.hideLoader();
			});
	}

	deleteFeed(id: number) {
		this.LoaderService.showLoader();
		this.feedback.deleteFeedback(id).then((res: any) => {
			this.feedbacks = this.feedbacks.filter((F) => F.id != id);
			this.LoaderService.hideLoader();
		});
	}
}
