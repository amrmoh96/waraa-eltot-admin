import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { News } from 'src/app/models/News.model';
import { LoaderService } from 'src/app/services/loader.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: [ './news.component.scss' ]
})
export class NewsComponent implements OnInit {
	public news: News[] = [];
	constructor(
		public newsService: NewsService,
		private loader: LoaderService,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		this.loader.showLoader();
		this.newsService
			.getNews()
			.then((res) => {
				this.news = res;
				this.loader.hideLoader();
			})
			.catch((err) => {
				this.loader.hideLoader();
			});
	}

	deleteNews(id: number) {
		this.loader.showLoader();
		this.newsService
			.deleteNews(id)
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
