import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { News } from 'src/app/models/News.model';
import { LoaderService } from 'src/app/services/loader.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
	selector: 'app-add-news',
	templateUrl: './add-news.component.html',
	styleUrls: [ './add-news.component.scss' ]
})
export class AddNewsComponent implements OnInit {
	@ViewChild('newsForm', { static: true })
	public newsForm: NgForm | undefined;
	public news: News = {};
	public isEdit: boolean = false;
	public newsId: number = 0;
	public isSubmitted: boolean = false;
	constructor(
		private newsService: NewsService,
		private activatedRoute: ActivatedRoute,
		private loader: LoaderService,
		private messageService: MessageService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((P) => {
			if (P.id) {
				this.isEdit = true;
				this.newsId = Number(P.id);
				this.loader.showLoader();
				this.newsService
					.getNewsById(Number(this.newsId))
					.then((res) => {
						if (res) {
							this.news = res;
							this.loader.hideLoader();
						}
					})
					.catch((err) => {
						this.loader.hideLoader();
						this.messageService.add({
							severity: 'error',
							summary: 'Error',
							detail: `Can't get news with id ${this.newsId}`
						});
						this.router.navigate([ '/news' ]);
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
			let _newNews = <News>JSON.parse(JSON.stringify(this.news));
			_newNews.creationDate = new Date();
			if (this.isEdit) {
				this.editnews(_newNews);
			} else {
				this.addNewnews(_newNews);
			}
		}
	}

	editnews(news: News): void {
		this.newsService
			.editNews(news)
			.then((res) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Updated Successfully',
					detail: 'news updated successfully'
				});
			})
			.catch((err) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'We could not update news, please try again'
				});
			});
	}

	addNewnews(news: News): void {
		this.newsService
			.addNews(news)
			.then((res) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Updated Successfully',
					detail: 'news added successfully'
				});
				this.router.navigate([ '/news' ]);
			})
			.catch((err) => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'We could not save news, please try again'
				});
			});
	}
}
