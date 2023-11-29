<template>
	<div v-if="recommends.length > 4">
		<div>
			<SubTitle @click="gotoDjList" :title="props.name" />
		</div>

		<section class="flex justify-between">
			<div class="item w-20%" v-for="(item, index) in recommends.slice(0, 5)" :key="index">
				<img @click="gotoDetail(item.id)" class="w-100% rounded cursor-pointer" :src="item.picUrl" alt="" />
				<div class="name cursor-pointer leading-20px">
					<a class="category">{{ item.secondCategory }}</a> {{ item.name }}
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SubTitle from "@/components/SubTitle/subTitle.vue";
import { getDjCategoryRecommendApi } from "@/api";
import router from "@/router";
interface Props {
	name: string;
	cid: number;
}
const props = withDefaults(defineProps<Props>(), {
	name: "",
	cid: 0
});

const recommends = ref<any[]>([]);
getDjCategoryRecommendApi(props.cid).then(res => {
	recommends.value = res.djRadios;
});

const gotoDjList = () => {
	router.push({
		path: "/index/dj-list",
		query: {
			id: props.cid
		}
	});
};

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
.item:not(:first-child, :last-child) {
	margin: 0 15px;
}
.item:first-child {
	margin-right: 15px;
}
.item:last-child {
	margin-left: 15px;
}
.name {
	display: -webkit-box;
	width: 100%;
	padding: 1px 0;
	margin-top: 10px;
	overflow: hidden;
	font-size: 14px;
	text-overflow: ellipsis;
	word-wrap: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	&:hover {
		color: var(--v-m-text-active-color);
	}
}
.category {
	font-size: 12px;
	color: rgb(128 128 128);
	border: 1px solid rgb(128 128 128);
}
</style>
