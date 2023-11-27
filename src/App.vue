<script setup lang="ts">
import appHeader from "@/components/appHeader.vue";
import { RouterView } from "vue-router";
</script>

<template>
	<div id="app">
		<div class="header">
			<appHeader />
		</div>
		<RouterView />
	</div>
</template>

<style scoped>
@media (width >= 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}
	.logo {
		margin: 0 2rem 0 0;
	}
	header .wrapper {
		display: flex;
		flex-wrap: wrap;
		place-items: flex-start;
	}
}
</style>
