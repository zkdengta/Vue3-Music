import http from "@/api/axios/request";
import { currentMusicLevel } from "@/config/global";

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

// 精品歌单
export function getBoutiquePlaylistApi(limit: number, before?: number) {
	return http.get<any>(
		"/top/playlist/highquality",
		{
			limit,
			before
		},
		{
			loading: true
		}
	);
}

// 歌单完整分类
export function getPlaylistCategoryApi() {
	return http.get<any>("/playlist/catlist", {}, { loading: true });
}
// 热门歌单分类
export function getHotPlaylistCategoryApi() {
	return http.get<any>("/playlist/hot");
}

// 获取歌单
interface GetPlaylistType {
	order?: "new" | "hot";
	cat?: string;
	limit?: number;
	offset?: number;
}
export function getPlaylistApi(params: GetPlaylistType) {
	return http.get<any>("/top/playlist", params);
}

// 歌单详情
export function getPlaylistDetailApi(id: number | string) {
	return http.get<any>("/playlist/detail", { id });
}
// 获取音乐分类排行榜
export function getMusicCategoryRankApi() {
	return http.get<any>("/toplist", {}, { loading: true });
}

interface GetSingerListType {
	limit: number;
	offset?: number;
	type: string;
	area: string;
	initial: string;
}
export function getSingerListApi(params: GetSingerListType) {
	return http.get<any>("/artist/list", params, { loading: true });
}

// 新歌速递
export function getNewMusicsApi(type: string) {
	return http.get<any>("/top/song", { type }, { loading: true });
}

// 新碟上架
export type AlbumArea = "ALL" | "ZH" | "EA" | "KR" | "JP";
interface GetNewAlbumType {
	type: "new" | "hot";
	area: AlbumArea;
	offset: number;
	limit: number;
}
export function getNewAlbumApi(params: GetNewAlbumType) {
	return http.get<any>("/top/album", params, { loading: true });
}

// 电台分类推荐
export function getDjCategoryRecommendApi(type: number) {
	return http.get<any>("/dj/recommend/type", { type });
}

// 电台分类
export function getDjCategoryApi() {
	return http.get<any>("/dj/catelist");
}

// 推荐节目
export function getDjRecommendProgramApi() {
	return http.get<any>("/program/recommend");
}

// 获取视频标签
export function getVideoGroupApi() {
	return http.get<any>("/video/group/list");
}

// 标签下的视频
interface GetVideoByGroupType {
	id: number;
	offset?: number;
}
export function getVideoByGroupApi(params: GetVideoByGroupType) {
	return http.get<any>("/video/group", params, { loading: true });
}

// 最新mv
interface GetNewMVByAreaParams {
	limit: number;
	area?: string;
}
export function getNewMVByAreaApi(params: GetNewMVByAreaParams) {
	return http.get<any>("/mv/first", params);
}

// 分类mv
interface GetMvByOrderData {
	offset?: number;
	limit?: number;
	order: string;
	area?: string;
	type?: string;
}
export function getMvByOrderApi(params: GetMvByOrderData) {
	return http.get<any>("/mv/all", params);
}

// 网易出品mv
export function getMvByExclusiveApi() {
	return http.get<any>("/mv/exclusive/rcmd", {
		limit: 6
	});
}

// mv排行
interface GetMvByRankParams {
	limit: number;
	area?: string;
	offset?: number;
}
export function getMvByRankApi(params: GetMvByRankParams, loading: boolean = false) {
	return http.get<any>("/top/mv", params, { loading });
}

// 获取歌单所有歌曲
interface GetPlaylistMusic {
	id: number | string;
	limit?: number;
	offset?: number;
}
export function getPlaylistMusicApi(params: GetPlaylistMusic) {
	return http.get<any>("/playlist/track/all", params);
}

// 获取音乐url
interface GetMusicUrl {
	id: string | number;
	level?: currentMusicLevel;
}
export function getMusicUrlApi(params: GetMusicUrl, loading: boolean = false) {
	return http.get<any>("/song/url/v1", params, { loading });
}
// 收藏者
interface GetPlaylist {
	id: string | number;
	offset: number;
	limit: number;
}
export function getPlaylistCollectorsApi(params: GetPlaylist) {
	return http.get<any>("/playlist/subscribers", params);
}
// 歌单评论
export function getPlaylistCommentsApi(params: GetPlaylist) {
	return http.get<any>("/comment/playlist", params);
}
// 0: 歌曲 1: mv  2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
export type CType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
// 评论点赞
interface likeCommentType {
	id: number | string;
	cid: number;
	// 1点赞 0取消点赞
	t: 1 | 0;
	type: CType;
}
export function likeCommentApi(data: likeCommentType) {
	return http.post<any>("/comment/like", data);
}

// 获取歌曲详情
export function getMusicDetailApi(ids: string | number) {
	return http.get<any>("/song/detail", { ids });
}
