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

// 获取banner
export function getBannerApi(type: 0 | 1 | 2 | 3) {
	return http.get<any>("/banner", { type }, { loading: true });
}

// 推荐歌单
export function getDaylyRecommendPlaylistApi() {
	return http.get<any>("/recommend/resource");
}

// 热门播客 电台个性推荐
export function getHotDjRecommendApi() {
	return http.get<any>("/personalized/djprogram");
}

// 听见好书 电台有声书
export function getRecommendBooksApi() {
	return http.get<any>("/dj/recommend/type?type=10001");
}

// 独家放送
export function getExclusiveBroadcastApi() {
	return http.get<any>("/personalized/privatecontent");
}

// 推荐新音乐
export function getRecommendNewSongsApi() {
	return http.get<any>("/personalized/newsong?limit=12");
}

// 主题播客
export function getHotDjsApi() {
	return http.get<any>("/dj/hot", { limit: 6 });
}

// 推荐MV
export function getRecommendMVApi() {
	return http.get<any>("/personalized/mv");
}
