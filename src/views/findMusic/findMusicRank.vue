<template>
	<div class="find-music-rank">
		<subTitle :enabled="false" title="官方榜" />
		<div class="top-rank">
			<div v-for="(item, index) in officialRankList" :key="index" class="item">
				<officialRank :content="item" />
			</div>
		</div>
		<subTitle :enabled="false" title="全球榜" />
		<div class="global-rank">
			<div class="item" v-for="(item, index) in globalRankList" :key="index">
				<globalRankItem :content="item" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import subTitle from "@/components/SubTitle/subTitle.vue";
import officialRank from "./findMusicRank/officialRank.vue";
import globalRankItem from "./findMusicRank/globalRankItem.vue";
import { getMusicCategoryRankApi } from "@/api";

const officialRankList = ref([]);
const globalRankList = ref([]);
const getMusicCategoryRank = async () => {
	const { list } = await getMusicCategoryRankApi();
	officialRankList.value = list.slice(0, 4);
	globalRankList.value = list.slice(4, list.length);
	console.log(globalRankList.value);
};
getMusicCategoryRank();
</script>

<style scoped lang="scss">
.top-rank {
	width: 100%;
}
.global-rank {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 20px;
}
</style>
