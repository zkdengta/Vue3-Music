<template>
	<div class="app-menus">
		<ul>
			<li
				@click="router.push(item.url)"
				:class="{ active: route.path.includes(item.url) }"
				v-for="(item, index) in mainMenus"
				:key="index"
			>
				{{ item.title }}
			</li>
		</ul>
		<div class="sub-menus">
			<p class="sub-title">我的音乐</p>
			<ul>
				<li v-for="(item, index) in subMenus" :key="index">
					<ProfileItem class="sub-menu" :item="item">
						<template #prefix>
							<svg-icon :name="item.prefixIcon"></svg-icon>
						</template>
						<template #suffix>
							<svg-icon v-if="item.suffixIcon" :name="item.suffixIcon"></svg-icon>
							<p class="suffixText" v-else>{{ item.suffixText }}</p>
						</template>
					</ProfileItem>
				</li>
			</ul>
		</div>
		<UserMenus v-for="item in userSongSheetArr" :key="item.title" :options="item" />
	</div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProfileItem from "@/components/LoginCard/profileItem.vue";
import UserMenus from "@/components/AppMenus/userMenus.vue";
import type { OptionData } from "@/components/AppMenus/userMenus.vue";

const userSongSheet = inject("userSongSheet", {}) as any;
const userSongSheetArr = ref<any[]>([]);

setTimeout(() => {
	for (let k in userSongSheet) {
		const obj = {
			title: "",
			data: [] as OptionData[]
		};
		if (k === "createByUser") {
			obj.title = "创建的歌单";
		} else {
			obj.title = "收藏的歌单";
		}

		const arr = [] as any[];
		userSongSheet[k].forEach((res: any) => {
			arr.push({
				id: res.id,
				label: res.name,
				prefixIcon: res.privacy ? "lock" : "song_sheet",
				suffixText: "",
				suffixIcon: "",
				pid: res.id
			});
		});

		obj.data = arr;

		userSongSheetArr.value.push(obj);
	}
}, 500);

const route = useRoute();
const router = useRouter();
const mainMenus = ref([
	{
		title: "发现音乐",
		url: "/index/find-music"
	},
	{
		title: "播客",
		url: "/index/podcast"
	},
	{
		title: "视频",
		url: "/index/video"
	},
	{
		title: "关注",
		url: "/index/follow"
	},
	{
		title: "私人漫游",
		url: "/index/private-fm"
	}
]);
const subMenus = ref([
	{
		prefixIcon: "like_outline",
		suffixIcon: "beckoning",
		label: "我喜欢的音乐",
		url: "",
		showBorder: false,
		hasMessage: true,
		suffixText: ""
	},
	{
		prefixIcon: "download",
		suffixIcon: "",
		label: "本地与下载",
		url: "",
		showBorder: false,
		hasMessage: true,
		suffixText: ""
	},
	{
		prefixIcon: "recent",
		suffixIcon: "",
		label: "最近播放",
		url: "",
		showBorder: false,
		hasMessage: true,
		suffixText: ""
	}
]);
</script>

<style scoped lang="scss">
@import "@/styles/root.css";
.app-menus {
	position: relative;
	z-index: 100;
	height: calc(100vh - 152px);
	overflow: auto;
}
li {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 34px;
	margin: 2px 0;
	font-size: 14px;
	text-indent: 5px;
	border-radius: 0.25em;
	&:hover {
		cursor: pointer;
		background-color: var(--v-m-hover-bgc);
	}
}
.sub-menus {
	.sub-title {
		margin-bottom: 0;
		font-size: 12px;
		color: var(--v-m-text-dark-color);
		text-indent: 5px;
	}
	.sub-menu {
		height: 34px;
		padding: 0 5px;
		border-radius: 0.25em;
	}
}
.active {
	font-size: 17px;
	font-weight: 600;
	background-color: var(--v-m-hover-bgc);
}
</style>
