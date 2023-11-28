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
	</div>
</template>

<script setup lang="ts">
import { getBannerApi, getDaylyRecommendPlaylistApi } from "@/api";
import { ref } from "vue";
import SubTitle from "@/components/SubTitle/subTitle.vue";
import RecommendPlaylist, { type Playlist } from "@/views/findMusic/personalizedRecommendations/recommendPlaylist.vue";

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
