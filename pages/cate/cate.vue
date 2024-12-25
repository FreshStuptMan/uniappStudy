<template>
	<view>
		<my-search></my-search>
		<view class="scroll-view-container">
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: windowHeight + 'px'}">
				<view @click="activeCateChange(index)" :class="['left-scroll-item', index === active ? 'active' : '']" v-for="(cate, index) in cateList"
				 :key="cate.cat_id">{{cate.cat_name}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" :style="{height: windowHeight + 'px'}" :scroll-top="scrollTop">
				<view v-for="(cate2, index) in cateList[active].children">
					<view class="right-scroll-view-title">
						{{cate2.cat_name}}
					</view>
					<view class="right-scroll-view">
						<view @click="gotoGoodsList(cate3)" class="right-scroll-view-item" v-for="(cate3, index) in cate2.children">
							<image style="height: 60px;width: 60px;" :src="cate3.cat_icon"></image>
							<text>{{cate3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		// 将 badgeMix 混入到当前的页面中进行使用
		mixins: [badgeMix],
		data() {
			return {
				webUrlInfo: 'https://api-hmugo-web.itheima.net',
				cateList: [],
				active: 0,
				windowHeight: 0,
				scrollTop: 0
			};
		},
		methods: {
			getCateList() {
				uni.request({
					url: `${this.webUrlInfo}/api/public/v1/categories`,
					method: 'GET',
					success: (res) => {
						this.cateList = res.data.message
					}
				})
			},
			activeCateChange(index) {
				this.active = index
				this.scrollTop = this.scrollTop ? 0 : 1
			},
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpackages/goods_list/goods_list?cid=' + item.cat_id
				})
			}
		},
		onLoad(option) {
			// 获取设备信息 => 获取可用窗口高度
			this.windowHeight = uni.getSystemInfoSync().windowHeight - 30
			this.getCateList()
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
	}

	.left-scroll-view {
		width: 120px;
	}

	.left-scroll-item {
		background-color: #efefef;
		line-height: 40px;
		text-align: center;
		font-size: 13px;

		&.active {
			background-color: #FFFFFF;
			position: relative;

			&::before {
				position: absolute;
				content: ' ';
				display: block;
				width: 3px;
				height: 40px;
				background-color: #C00000;
			}
		}
	}

	.right-scroll-view-title {
		font-size: 19px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.right-scroll-view {
		display: flex;
		flex-wrap: wrap;
	}

	.right-scroll-view-item {
		width: 33.33%;
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 12px;
	}
</style>
