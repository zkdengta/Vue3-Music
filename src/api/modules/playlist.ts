import http from "@/api/axios/request";
import { ResPage } from "../axios/model";

// 获取歌单所有歌曲
interface GetPlaylistMusic {
	id: number | string;
	limit?: number;
	offset?: number;
}

// 获取树形用户列表
export const getPlaylistMusicApi = () => {
	return http.get<any>(`/personalized`);
};
