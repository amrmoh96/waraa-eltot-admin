import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'characters',
		loadChildren: () => import('./modules/characters/characters.module').then((m) => m.CharactersModule)
	},
	{
		path: 'media',
		loadChildren: () => import('./modules/media/media.module').then((m) => m.MediaModule)
	},
	{
		path: 'news',
		loadChildren: () => import('./modules/news/news.module').then((m) => m.NewsModule)
	},
	{
		path: 'tags',
		loadChildren: () => import('./modules/tags/tags.module').then((m) => m.TagsModule)
	},
	{
		path: 'topic',
		loadChildren: () => import('./modules/topic/topic.module').then((m) => m.TopicModule)
	}
	,
	{
		path: 'feedback',
		loadChildren: () => import('./modules/feedback/feedback.module').then((m) => m.FeedbackModule)
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
