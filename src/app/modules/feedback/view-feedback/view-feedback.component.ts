import { FeedbackService } from './../../../services/feedback.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
	selector: 'app-view-feedback',
	templateUrl: './view-feedback.component.html',
	styleUrls: [ './view-feedback.component.scss' ]
})
export class ViewFeedbackComponent implements OnInit {
	public feedback: Feedback | undefined = {};
	constructor(private ActivatedRoute: ActivatedRoute, private FeedbackService: FeedbackService) {}

	ngOnInit(): void {
		this.ActivatedRoute.params.subscribe((P) => {
			this.FeedbackService.feedbacks.then((res) => {
				this.feedback = res.find((R) => R.id == Number(P.id));
			});
		});
	}
}
