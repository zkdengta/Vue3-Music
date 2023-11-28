<template>
	<div class="topic-djs">
		<div @click="gotoDetail(item.id)" class="item" v-for="item in list" :key="item.id">
			<div class="cover">
				<img :src="item.coverImg" alt="" />
				<div>{{ item.category }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import router from "@/router";
export interface Item {
	coverImg: string;
	id: number;
	category: string;
}
export type TopicDjsType = Array<Item>;

interface Props {
	list: TopicDjsType;
}
withDefaults(defineProps<Props>(), {
	list: () => []
});
const gotoDetail = (id: number) => {
	router.push({
		path: "/index/dj-detail",
		query: {
			id
		}
	});
};
</script>

<style scoped lang="scss">
.topic-djs {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.item {
		width: 15%;
		cursor: pointer;
		.cover {
			position: relative;
			img {
				width: 100%;
				border-radius: 10px;
			}
			div {
				position: absolute;
				bottom: 10px;
				left: 6px;
				font-size: 14px;
				font-weight: 600;
			}
		}
	}
}
</style>
