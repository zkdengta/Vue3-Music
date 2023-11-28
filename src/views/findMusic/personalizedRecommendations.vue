<template>
	<div class="personalized-recommendations">
		<div class="banner-wrapper">
			<el-carousel :interval="4000" type="card" height="200px" indicator-position="outside">
				<el-carousel-item v-for="(item, index) in banner" :key="index">
					<img :src="item.imageUrl" alt="" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<SubTitle title="推荐歌单" />
		<RecommendPlaylist :playlist="recommendPlaylist" />
		<SubTitle title="热门播客" />
		<podcastListVue :list="hotDjs" />
		<SubTitle title="听见好书" />
		<RecommendBooks :playlist="recommendBooks" />
		<SubTitle title="独家放送" />
		<ExclusiveBroadcast :list="privateContent" />
		<SubTitle title="最新音乐" />
		<RecommendNewSongs :list="recommendNewSongs" />
		<SubTitle title="主题播客" />
		<TopicDjs :list="topicDjs" />
		<SubTitle title="推荐MV" />
		<RecommendMV :list="recommendMV" />
	</div>
</template>

<script setup lang="ts">
import {
	getBannerApi,
	getDaylyRecommendPlaylistApi,
	getExclusiveBroadcastApi,
	getHotDjRecommendApi,
	getHotDjsApi,
	getRecommendBooksApi,
	getRecommendMVApi,
	getRecommendNewSongsApi
} from "@/api";
import { ref } from "vue";
import SubTitle from "@/components/SubTitle/subTitle.vue";
import RecommendPlaylist, { type Playlist } from "@/views/findMusic/personalizedRecommendations/recommendPlaylist.vue";
import podcastListVue, { type DjList } from "@/components/PodcastList/podcastList.vue";
import RecommendBooks from "@/views/findMusic/personalizedRecommendations/recommendBooks.vue";
import ExclusiveBroadcast, { type List } from "@/views/findMusic/personalizedRecommendations/exclusiveBroadcast.vue";
import RecommendNewSongs, { type RecommendNewSongsType } from "./personalizedRecommendations/recommendNewSongs.vue";
import TopicDjs, { type TopicDjsType } from "./personalizedRecommendations/topicDjs.vue";
import RecommendMV, { type RecommendMVType } from "./personalizedRecommendations/recommendMV.vue";

// banner
const banner = ref<any[]>([]);
const getBanner = async () => {
	const { banners } = await getBannerApi(0);
	banner.value = banners;
	console.log("banners:" + banner.value);
};
getBanner();

// 推荐歌单
const recommendPlaylist = ref<Playlist>([]);
const getRecommendPlaylist = async () => {
	const { recommend } = await getDaylyRecommendPlaylistApi();
	recommendPlaylist.value = [];
	recommend.slice(0, 9).forEach((item: any) => {
		recommendPlaylist.value.push({
			id: item.id,
			name: item.name,
			nickname: item.creator.nickname,
			playcount: item.playcount,
			picUrl: item.picUrl,
			path: "/index/playlist-detail"
		});
	});
};
getRecommendPlaylist();

// 热门播客
const hotDjs = ref<DjList>([]);
const getHotDjRecommend = async () => {
	const { result } = await getHotDjRecommendApi();
	hotDjs.value = [];
	result.forEach((item: any) => {
		hotDjs.value.push({
			id: item.id,
			coverImg: item.picUrl,
			tag: item.program.radio.category,
			title: item.name,
			creator: item.program.dj.nickname,
			playcount: item.program.adjustedPlayCount,
			duration: item.program.duration
		});
	});
};
getHotDjRecommend();

// 听见好书
const recommendBooks = ref<any[]>([]);
const getRecommendBooks = async () => {
	const { djRadios } = await getRecommendBooksApi();
	djRadios.slice(0, 4).forEach((item: any) => {
		recommendBooks.value.push({
			id: item.id,
			name: item.name,
			nickname: "",
			playcount: item.playCount,
			picUrl: item.picUrl,
			path: "/index/dj-detail"
		});
	});
};
getRecommendBooks();

// 独家放送
const privateContent = ref<List>([]);
const getExclusiveBroadcast = async () => {
	const { result } = await getExclusiveBroadcastApi();
	privateContent.value = [];
	result.forEach((item: any) => {
		privateContent.value.push({
			id: item.id,
			coverImg: item.picUrl,
			name: item.name
		});
	});
};
getExclusiveBroadcast();

// 最新音乐
const recommendNewSongs = ref<RecommendNewSongsType>([]);
const getRecommendNewSongs = async () => {
	const { result } = await getRecommendNewSongsApi();
	recommendNewSongs.value = [];
	result.forEach((item: any) => {
		recommendNewSongs.value.push({
			id: item.id,
			coverImg: item.picUrl,
			name: item.name,
			mvId: item.song.mvid,
			hires: !!item.song.hrMusic,
			sq: !!item.song.sqMusic,
			ar: item.song.artists
		});
	});
};
getRecommendNewSongs();

// 主题播客
const topicDjs = ref<TopicDjsType>([]);
const getHotDjs = async () => {
	const { djRadios } = await getHotDjsApi();
	topicDjs.value = [];
	djRadios.forEach((item: any) => {
		topicDjs.value.push({
			id: item.id,
			coverImg: item.picUrl,
			category: item.category
		});
	});
};
getHotDjs();

// 推荐MV
const recommendMV = ref<RecommendMVType>([]);
const getRecommendMV = async () => {
	const { result } = await getRecommendMVApi();
	result.forEach((item: any) => {
		recommendMV.value.push({
			id: item.id,
			coverImg: item.picUrl,
			playcount: item.playCount,
			name: item.name
		});
	});
};
getRecommendMV();
</script>
<style scoped lang="scss">
.personalized-recommendations {
	.banner-wrapper {
		width: 100%;
		img {
			width: 100%;
			height: 100%;
			border-radius: 0.45em;
		}
		:deep(.el-carousel__button) {
			width: 6px;
			height: 6px;
			border-radius: 50%;
		}
	}
}
</style>
