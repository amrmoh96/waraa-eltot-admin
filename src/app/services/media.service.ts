import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Character } from '../models/Character.model';
import { Media, MediaFile } from '../models/Media.model';

@Injectable({
	providedIn: 'root'
})
export class MediaService {
	private api: string = environment.api;
	public $_media: Promise<Media[]> = new Promise(() => {});
	constructor(private http: HttpClient) {}

	public getAllMedia(): Promise<Media[]> {
		this.$_media = this.http
			.get<Media[]>(`${this.api}/Media/getall`)
			.toPromise()
			.then((res) => <Media[]>res)
			.then((data) => {
				return data;
			});
		return this.$_media;
	}

	public getMediaById(id: number): Promise<Media | undefined> {
		return this.http
			.get<Media>(`${this.api}/Media/get?id=${id}`)
			.toPromise()
			.then((res) => <Media>res)
			.then((data) => {
				return data;
			});
	}
	public getMediaByCharacterId(id: number): Promise<Media[]> {
		return this.http
			.get<Media[]>(`${this.api}/Media/GetByCharacter?id=${id}`)
			.toPromise()
			.then((res) => <Media[]>res)
			.then((data) => {
				return data;
			});
	}

	public getCharactersByMediaId(id: number): Promise<Character[]> {
		return this.http
			.get<Character[]>(`${this.api}/Media/GetCharacters?ID=${id}`)
			.toPromise()
			.then((res) => <Character[]>res)
			.then((data) => {
				return data;
			});
	}
	public addMedia(Media: Media): Promise<Media> {
		return this.http
			.post<Media>(`${this.api}/Media/Create`, Media)
			.toPromise()
			.then((res) => <Media>res)
			.then((data) => {
				return data;
			});
	}

	public editMedia(Media: Media): Promise<Media> {
		return this.http
			.post<Media>(`${this.api}/Media/Update`, Media)
			.toPromise()
			.then((res) => <Media>res)
			.then((data) => {
				return data;
			});
	}

	public deleteMedia(MediaId: number) {
		return this.http
			.get<Media>(`${this.api}/Media/Delete?id=${MediaId}`)
			.toPromise()
			.then((res) => <Media>res)
			.then((data) => {
				this.$_media = this.$_media.then((res) => res.filter((Ch) => Ch.id != MediaId));
				return data;
			});
	}
	public savePhoto(id: number | undefined, file: File) {
		const mediaFile: FormData = new FormData();
		mediaFile.append('file', file);
		if (id) {
			mediaFile.append('id', id.toString());
		}
		return this.http
			.post<MediaFile>(`${this.api}/Media/SavePhoto`, mediaFile)
			.toPromise()
			.then((res) => <Media>res);
	}
}
