// 请求响应参数（不包含data）
export interface Result {
	code: number;
	message: string;
	more: boolean;
	total: number;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
	result: T;
	data: T;
	datas: T;
	banners: T;
	recommend: T;
	djRadios: T;
	playlists: T;
	categories: T;
	sub: T;
	tags: T;
	list: T;
	playlist: T;
	artists: T;
	weekData: T;
	monthData: T;
	programs: T;
	songs: T;
	subscribers: T;
	hotComments: T;
	comments: T;
}

// 分页响应参数
export interface ResPage<T> {
	result: T[];
	code: number;
	category: number;
}
