<template>
	<div class="app-controller">
		<div class="cover">
			<img
				:src="
					currentMusicInfo.info.al?.picUrl ||
					'https://img1.baidu.com/it/u=950943067,1138707327&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
				"
				alt=""
			/>
			<div class="music-info">
				<div style="font-size: 14px">
					<span class="w-168px overflow-hidden whitespace-nowrap text-ellipsis mr-5px">{{
						currentMusicInfo.info.name || ""
					}}</span>
					<svg-icon
						v-if="currentMusicInfo.info.name"
						style="position: relative; top: 4px; font-size: 20px; cursor: pointer"
						name="like_outline"
					></svg-icon>
				</div>
				<div class="whitespace-nowrap overflow-hidden text-ellipsis" style="font-size: 13px">
					{{ formatAr(currentMusicInfo.info.ar) }}
				</div>
			</div>
		</div>
		<div class="main">
			<div class="controll-wrapper">
				<div class="controll-item">
					<svg-icon
						@click="globalStore.currentPlayOrder = 'single'"
						v-if="globalStore.currentPlayOrder === 'order'"
						class="svg"
						style="font-size: 16px"
						name="play_order"
					></svg-icon>
					<svg-icon
						@click="globalStore.currentPlayOrder = 'random'"
						v-if="globalStore.currentPlayOrder === 'single'"
						class="svg"
						style="font-size: 16px"
						name="play_single"
					></svg-icon>
					<svg-icon
						@click="globalStore.currentPlayOrder = 'list'"
						v-if="globalStore.currentPlayOrder === 'random'"
						class="svg"
						style="font-size: 16px"
						name="play_random"
					></svg-icon>
					<svg-icon
						@click="globalStore.currentPlayOrder = 'order'"
						v-if="globalStore.currentPlayOrder === 'list'"
						class="svg"
						style="font-size: 16px"
						name="play_list"
					></svg-icon>
				</div>
				<div @click="globalStore.prevPlay" class="controll-item">
					<svg-icon class="svg" style="font-size: 16px" name="prefix"></svg-icon>
				</div>
				<div class="controll-item play">
					<svg-icon @click="pause" v-if="globalStore.isPlay" class="svg" style="font-size: 22px" name="pause"></svg-icon>
					<svg-icon @click="play" v-else class="svg" style="font-size: 22px" name="play"></svg-icon>
				</div>
				<div @click="globalStore.nextPlay" class="controll-item">
					<svg-icon class="svg" style="font-size: 16px" name="suffix"></svg-icon>
				</div>
				<div class="controll-item">
					<svg-icon class="svg" style="font-size: 16px" name="lyric"> </svg-icon>
				</div>
			</div>
			<div class="time">
				<span class="current-time">{{ stampToMin(currentTime) }}</span>
				<div class="controll-time" ref="controllTimeRef" @click="adjustTime($event)">
					<div ref="timerRef" class="timer"></div>
				</div>
				<span class="end-time">{{ stampToMin(currentMusicInfo.info.dt) }}</span>
			</div>
		</div>
		<div class="setting">
			<div class="setting-item tone-quality">
				<el-popover placement="top" :show-arrow="false" :width="200" trigger="click">
					<ul>
						<li
							@click="shiftMusicQuality(item.value)"
							class="my-10px cursor-pointer text-#fefefe flex items-center"
							v-for="(item, index) in musicQuality"
							:key="index"
						>
							<svg-icon
								:style="{ opacity: globalStore.currentMusicLevel === item.value ? '1' : '0' }"
								class="mr-3px"
								name="correct"
							></svg-icon>
							<span :style="{ color: globalStore.currentMusicLevel === item.value ? 'red' : '#fefefe' }">
								{{ item.label }}
							</span>
						</li>
					</ul>
					<template #reference>
						<div class="overflow-hidden text-ellipsis whitespace-nowrap">
							{{ musicLevel?.label }}
						</div>
					</template>
				</el-popover>
			</div>
			<div class="setting-item">
				<svg-icon class="svg" style="font-size: 24px" name="tone"> </svg-icon>
			</div>
			<div class="setting-item">
				<el-popover placement="top" :show-arrow="false" width="10px" trigger="click">
					<div class="flex justify-center items-center">
						<el-slider @change="changeVolume" v-model="currentVolume" :show-tooltip="false" vertical height="108px" />
					</div>
					<template #reference>
						<svg-icon class="svg" style="font-size: 24px" name="volume"> </svg-icon>
					</template>
				</el-popover>
			</div>
			<div class="setting-item">
				<svg-icon class="svg" style="font-size: 24px" name="listen_together"> </svg-icon>
			</div>
			<div class="setting-item">
				<el-popover placement="top" width="350" trigger="click" :show-arrow="false">
					<section class="h-410px overflow-auto">
						<span class="text-#ffffff"> 还没开发 </span>
					</section>
					<template #reference>
						<svg-icon class="svg" style="font-size: 20px" name="playlist"></svg-icon>
					</template>
				</el-popover>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/global";
import { computed, reactive, ref } from "vue";
import { stampToMin } from "@/utils/timeFormat";
import { currentMusicLevel } from "@/config/global";
import { getMusicDetailApi } from "@/api";

const globalStore = useGlobalStore();
const currentMusicInfo = reactive({
	info: {} as any
});
const timerRef = ref();
const timer = ref();
const currentTime = ref();

const formatAr = (arr: any[]): string => {
	if (!arr) return "";
	let res: string = "";
	arr.forEach((item, index) => {
		const l = index === arr.length - 1 ? "" : "/";
		res += item.name + l;
	});
	return res;
};

// 控制时间
const controllTimeRef = ref();
const adjustTime = ($event: any) => {
	// 鼠标距离浏览器左侧距离
	const clientX = $event.clientX;
	// 时间wrapper元素距离浏览器左侧距离
	const left = (controllTimeRef.value as HTMLElement).getBoundingClientRect().left;
	// 鼠标距离wrapper左侧距离
	const controllTimeWidth = (controllTimeRef.value as HTMLElement).offsetWidth;
	const currentWidth = clientX - left;
	const percent = Number(currentWidth.toFixed(0)) / Number(controllTimeWidth.toFixed(0));
	const seconds = Math.floor(currentMusicInfo.info.dt / 1000);
	const currentTime = seconds * Number(percent.toFixed(2));
	globalStore.appAudio.currentTime = currentTime;
};

// 调整音质
const musicQuality = ref<{ label: string; value: currentMusicLevel }[]>([
	{
		label: "标准音质",
		value: "standard"
	},
	{
		label: "较高音质",
		value: "higher"
	},
	{
		label: "极高音质",
		value: "exhigh"
	},
	{
		label: "无损音质",
		value: "lossless"
	},
	{
		label: "Hi-Res音质",
		value: "hires"
	},
	{
		label: "沉浸环绕声音质",
		value: "sky"
	},
	{
		label: "高清环绕声音质",
		value: "jyeffect"
	},
	{
		label: "超清母带音质",
		value: "jymaster"
	}
]);
const musicLevel = computed(() => {
	const level = musicQuality.value.find(item => {
		return item.value === globalStore.currentMusicLevel;
	});
	return level;
});
const shiftMusicQuality = (levle: currentMusicLevel) => {
	globalStore.currentMusicLevel = levle;
	if (globalStore.currentMusicUrl) {
		globalStore.setAudioUrlAndId(globalStore.currentMusicUrl, globalStore.currentMusicId as string);
		globalStore.audioPlay();
	}
};

// 调整音量
const currentVolume = ref();
currentVolume.value = globalStore.appAudio.volume * 100;

const changeVolume = () => {
	globalStore.appAudio.volume = currentVolume.value / 100;
};

// 触发pinia订阅事件
globalStore.$subscribe((mutation, state) => {
	console.log("mutation:", mutation);
	console.log("state:", state);
	clearInterval(timer.value);
	getMusicDetailApi(globalStore.currentMusicId as string).then(res => {
		currentMusicInfo.info = res.songs[0];
		timer.value = setInterval(() => {
			currentTime.value = Number(globalStore.appAudio.currentTime.toFixed(0)) * 1000;
			const w = ((currentTime.value / currentMusicInfo.info.dt) * 100).toFixed(2) + "%";
			timerRef.value.style.width = w;
		}, 1000);
	});
});

const play = () => {
	if (globalStore.currentMusicUrl) {
		if (!globalStore.appAudio.paused) {
			globalStore.setAudioUrlAndId(globalStore.currentMusicUrl, globalStore.currentMusicId as string);
		}
		globalStore.audioPlay();
	}
};

const pause = () => {
	if (globalStore.currentMusicUrl) {
		globalStore.audioPause();
	}
};
</script>
<style scoped lang="scss">
.app-controller {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 68px;
	background-color: rgb(33 33 36);
	border-top: 1px solid rgb(61 61 64);
	.cover {
		display: flex;
		align-items: center;
		width: 267px;
		margin-left: 16px;
		img {
			position: relative;
			width: 44px;
			height: 44px;
			margin-right: 14px;
			cursor: pointer;
			border-radius: 0.15em;
			&:hover {
				filter: blur(2px);
			}
		}
		.music-info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			div {
				margin-bottom: 8px;
			}
		}
	}
	.main {
		flex: 1;
		.controll-wrapper {
			display: flex;
			justify-content: center;
			margin-bottom: 6px;
			.play {
				background-color: rgb(43 43 46);
				&:hover {
					background-color: var(--v-m-hover-bgc);
				}
			}
			.controll-item {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 34px;
				height: 34px;
				margin: 0 10px;
				cursor: pointer;
				border-radius: 50%;
				&:hover {
					background-color: var(--v-m-hover-bgc);
				}
			}
		}
		.time {
			display: flex;
			align-items: center;
			font-size: 10px;
			color: rgb(101 101 104);
			.controll-time {
				flex: 1;
				height: 3px;
				margin: 0 6px;
				cursor: pointer;
				background-color: #ffffff;
				.timer {
					width: 0;
					height: 100%;
					background-color: #ffffff;
					background-color: rgb(236 65 65);
				}
			}
		}
	}
	.setting {
		display: flex;
		align-items: center;
		justify-content: right;
		width: 267px;
		margin-right: 16px;
		.tone-quality {
			padding: 2px;
			font-size: 12px;
			border: 1px solid #ffffff;
			border-radius: 0.2em;
		}
		.setting-item {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 10px;
			cursor: pointer;
		}
	}
}
</style>
