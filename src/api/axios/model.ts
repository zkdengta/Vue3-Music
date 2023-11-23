// 请求响应参数（不包含data）
export interface Result {
	code: number;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
	result: T;
}

// 分页响应参数
export interface ResPage<T> {
	result: T[];
	code: number;
	category: number;
}
