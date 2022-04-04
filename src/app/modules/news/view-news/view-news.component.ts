import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { News } from 'src/app/models/News.model';
import { NewsMedia } from 'src/app/models/NewsMedia.model';
import { LoaderService } from 'src/app/services/loader.service';
import { NewsMediaService } from 'src/app/services/news-media.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
	selector: 'app-view-news',
	templateUrl: './view-news.component.html',
	styleUrls: [ './view-news.component.scss' ]
})
export class ViewNewsComponent implements OnInit {
	public news: News = {};
	public newsID: number = 0;
	public newsMedia:NewsMedia[] | undefined = [];
	constructor(
		private newsService: NewsService,
		private activatedRoute: ActivatedRoute,
		private loader: LoaderService,
		private messageService: MessageService,
		private router: Router,
		private newsMediaService:NewsMediaService
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((P) => {
			if (P.id) {
				this.newsID = Number(P.id);
				this.loader.showLoader();
				this.newsService
					.getNewsById(Number(P.id))
					.then((res) => {
						if (res) {
							this.news = res;
							this.loader.hideLoader();
							this.getMediaByNewsId()
						}
					})
					.catch((err) => {
						this.loader.hideLoader();
					});
			}
		});
	}

	assignMedia($event: any) {
		let _newsMedia: NewsMedia = { newsId: this.newsID, mediaId: $event.id };
		if(this.newsMedia?.find(NM => NM.mediaId == _newsMedia.mediaId)){
			this.messageService.add({
				severity: 'info',
				summary: 'Media Exist',
				detail: `Media is already assigned to news`
			});
		}else{
			this.loader.showLoader();
			this.newsMediaService.addNewsMedia(_newsMedia).then((res) => {
				// this.getMediaByNewsId();
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'success',
					summary: 'Tag Assigned',
					detail: `media assigned to ${this.news.title} succussfully`
				});
			}).catch(err => {
				this.loader.hideLoader();
				this.messageService.add({
					severity: 'error',
					summary: `Can't assign Tag`,
					detail: `media  assigned to ${this.news.title} failed, please try again`
				});
			});
		}
	}

	getMediaByNewsId(){
		this.newsMediaService.getNewsMediaById(this.newsID).then(res => {
			this.newsMedia = res;
		})
	}
}
