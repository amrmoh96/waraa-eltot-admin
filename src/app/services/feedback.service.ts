import { Feedback } from './../models/feedback.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FeedbackService {
	private api: string = environment.api;
	public feedbacks: Promise<Feedback[]> = new Promise(() => {});
	constructor(private http: HttpClient) {}

	getAllFeedbacks(): Promise<Feedback[]> {
		this.feedbacks = this.http
			.get<Feedback[]>(`${this.api}/Feedback/getall`)
			.toPromise()
			.then((res) => <Feedback[]>res)
			.then((data) => {
				return data;
			});
		return this.feedbacks;
	}

	getFeedbackById(id: number): Promise<Feedback> {
		return this.http
			.get<Feedback>(`${this.api}/Feedback/get?id=${id}`)
			.toPromise()
			.then((res) => <Feedback>res)
			.then((data) => {
				return data;
			});
	}

	deleteFeedback(id: number): any {
		return this.http
			.get<any>(`${this.api}/Feedback/delete?id=${id}`)
			.toPromise()
			.then((res) => <any>res)
			.then((data) => {
				return data;
			});
	}
}
