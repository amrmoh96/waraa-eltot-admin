// api/Media
export interface Media {
	id?: number;
	mediaUrl?: string;
	mediaType?: number;
	description?: string;
	title?: string;
	youtubeId?: string;
	files?: any;
}

export interface MediaFile {
	file?: FormData;
	id?: number;
}
