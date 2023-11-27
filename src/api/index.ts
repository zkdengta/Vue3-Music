import http from "@/api/axios/request";

// 默认搜索关键字
export function getDefaultSearchKeywordsApi() {
	return http.get<any>("/search/default", {}, { loading: false });
}

// 热搜列表
export function getHotSearchListApi() {
	return http.get<any>("/search/hot/detail", {}, { loading: false });
}

// 生成二维码key
export function createQRcodeKeyApi() {
	return http.post<any>("/login/qr/key");
}
// 由key生成登录二维码
export function createQRcodeApi(key: string) {
	return http.post<any>("/login/qr/create", { key });
}
// 检测扫码状态
export function checkQRcodeStatusApi(key: string) {
	return http.post<any>("/login/qr/check", { key });
}
