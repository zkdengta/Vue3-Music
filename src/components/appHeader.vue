<template>
	<div class="app-header">
		<el-row>
			<el-col :span="4">
				<a class="logo" href="/">
					<img src="@/assets/logo_dark.png" alt="" />
				</a>
			</el-col>
			<el-col :span="7">
				<div class="search">
					<el-button @click="router.go(-1)" text :icon="ArrowLeft"></el-button>
					<el-button text :icon="ArrowRight"></el-button>
					<el-popover placement="top-start" width="350" trigger="contextmenu" v-model:visible="showPopover" :show-arrow="false">
						<section class="h-410px overflow-auto">
							<h4 class="m-0 my-10px">热搜榜</h4>
							<ul>
								<li
									@click.stop.prevent="gotoSearch(item.searchWord)"
									class="flex cursor-pointer hover:bg-#333333 rounded items-center h-50px py-2px"
									v-for="(item, index) in hotSearchList"
									:key="index"
								>
									<span :style="{ color: index < 3 ? '#df3838' : '' }" class="mr-20px text-15px font-bold">{{ index + 1 }}</span>
									<span class="text-12px flex flex-col justify-between">
										<div class="my-5px">
											<span class="text-#d6d6d6 mr-10px">
												{{ item.searchWord }}
											</span>
											<span class="text-#575757">
												{{ item.score }}
											</span>
										</div>
										<div>{{ item.content }}</div>
									</span>
								</li>
							</ul>
						</section>
						<template #reference>
							<el-input
								v-click-outside="onClickOutside"
								@focus="showPopover = true"
								:prefix-icon="Search"
								@keyup.enter="gotoSearch"
								:placeholder="defaultKeywords"
								v-model="keywords"
							></el-input>
						</template>
					</el-popover>
				</div>
			</el-col>
			<el-col :span="13">
				<div class="right-pannel">
					<el-popover :hide-after="60" trigger="click" :show-arrow="false" placement="bottom" :width="276">
						<template #reference>
							<div class="avatar">
								<img
									@click.stop.prevent="gotoProfile"
									:src="
										userStore.userInfo.avatarUrl ||
										'https://img1.baidu.com/it/u=950943067,1138707327&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
									"
									alt=""
								/>
								<p>{{ userStore.userInfo.nickname || "未登录" }}</p>
								<el-icon>
									<CaretBottom />
								</el-icon>
							</div>
						</template>
						<LoginCard />
					</el-popover>
					<div class="setting">
						<img src="@/assets/cloth.png" alt="" />
						<img src="@/assets/setting.png" alt="" />
						<img src="@/assets/message.png" alt="" />
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { getDefaultSearchKeywordsApi, getHotSearchListApi } from "@/api";
import { ArrowLeft, ArrowRight, CaretBottom, Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ClickOutside as vClickOutside } from "element-plus";
import { useUserStore } from "@/store/user";
import LoginCard from "@/components/LoginCard/loginCard.vue";

const router = useRouter();

const showPopover = ref(false);
const defaultKeywords = ref("");

const keywords = ref("");

const userStore = useUserStore();

const getDefaultSearchKeywords = async () => {
	const { data } = await getDefaultSearchKeywordsApi();
	console.log("result:" + data.realkeyword);
	defaultKeywords.value = data.realkeyword;
};
getDefaultSearchKeywords();

const hotSearchList = ref<any[]>([]);
const getHotSearchList = async () => {
	const { data } = await getHotSearchListApi();
	hotSearchList.value = data;
	console.log("data:" + hotSearchList.value);
};
getHotSearchList();

const onClickOutside = () => {
	showPopover.value = false;
};

const gotoSearch = (keyword?: string) => {};

const gotoProfile = () => {};
</script>

<style scoped lang="scss">
.app-header {
	height: 54px;
	font-size: 14px !important;
	background-color: rgb(33 33 36);
	border-bottom: 2px solid rgb(131 16 16);
	.logo {
		z-index: -1; // 用来设置元素的堆叠顺序或者叫做元素层级，z-index的值越大，元素的层级越高。
		height: 54px;
		overflow: hidden; // 控制内容溢出元素框时显示的方式
		img {
			position: relative;
			top: -52px;
			width: 160px;
		}
	}
	.search {
		display: flex;
		align-items: center;
		height: 54px;
		overflow: hidden;
		.el-button {
			margin: 0;
		}
		:deep(.el-input) {
			width: 186px;
			font-size: 14px !important;
			.el-input__wrapper {
				background: rgb(44 44 47) !important;
				border: none !important;
				border-radius: 20px;
				box-shadow: 0 0 0 0;
				.el-input__inner {
					color: #ffffff;
				}
			}
		}
	}
	.right-pannel {
		display: flex;
		justify-content: right;
		overflow: hidden;
		.setting {
			display: flex;
			align-items: center;
			height: 54px;
			img {
				width: 20px;
				height: 20px;
				margin: 0 10px;
				cursor: pointer;
			}
		}
	}
}
.avatar {
	display: flex;
	align-items: center;
	height: 54px;
	margin-right: 24px;
	cursor: pointer;
	&:hover {
		p,
		.el-icon {
			color: rgb(165 167 168);
		}
	}
	img {
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}
	p {
		max-width: 70px;
		margin-right: 12px;
		margin-left: 12px;
		overflow: hidden;
		color: rgb(124 162 164);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.el-icon {
		color: rgb(124 162 164);
	}
}
.el-col {
	height: 54px;
}
</style>
