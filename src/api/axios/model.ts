// 请求响应参数（不包含data）
export interface Result {
	code: number;
	message: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
	result: T;
	data: T;
	banners: T;
	recommend: T;
}

// 分页响应参数
export interface ResPage<T> {
	result: T[];
	code: number;
	category: number;
}
