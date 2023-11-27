<template>
	<div class="app-menus">
		<AppMenus />
	</div>
</template>

<script setup lang="ts">
import AppMenus from "@/components/AppMenus/appMenus.vue";
import { useUserStore } from "@/store/user";
import { reactive, provide } from "vue";
const userStore = useUserStore();
const userSongSheet = reactive({
	createByUser: [] as any[],
	collectByUser: [] as any[]
});
provide("userSongSheet", userSongSheet);
// $subscribe在存储变化时执行
userStore.$subscribe(() => {
	if (userStore.loginState) {
		// 去请求菜单
		getUserSongSheet();
	} else {
		// 重置菜单
		userSongSheet.collectByUser = [];
		userSongSheet.createByUser = [];
	}
});
const getUserSongSheet = () => {};
if (userStore.loginState) {
	getUserSongSheet();
}
</script>

<style scoped lang="scss">
.app-menus {
	padding: 5px;
}
</style>
