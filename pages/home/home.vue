<template>
	<view>
		<view style="position: sticky;top: 0px;z-index: 3;">
			<my-search></my-search>
		</view>
		<view>
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="(item, i) in swiperList" :key="i">
				    <navigator class="swiper-item" :url="'/subpackages/goods_detail/goods_detail?goods_id=' + item.goods_id">
				      <image :src="item.image_src"></image>
				    </navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="cate-nav">
			<view class="nav-item" v-for="(cate, index) in cateList" :key="index" @click="cateNavHandle(cate)">
				<image :src="cate.image_src"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
		  <!-- 楼层 item 项 -->
		  <view class="floor-item" v-for="(item, i) in floorList" :key="i">
		    <!-- 楼层标题 -->
		    <image :src="item.floor_title.image_src" class="floor-title"></image>
			<!-- 楼层图片区域 -->
			<view class="floor-img-box">
			  <!-- 左侧大图片的盒子 -->
			  <navigator :url="item.product_list[0].url" class="left-img-box">
			    <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
			  </navigator>
			  <!-- 右侧 4 个小图片的盒子 -->
			  <view class="right-img-box">
			    <navigator :url="item2.url" class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
			      <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
			    </navigator>
			  </view>
			</view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrlInfo: 'https://api-hmugo-web.itheima.net',
				// 轮播图数据
				swiperList: [],
				// 分类导航数据
				cateList: [],
				// 分类大类
				floorList: []
			};
		},
		methods: {
			getSwiperData() {
				uni.request({
					url: `${this.webUrlInfo}/api/public/v1/home/swiperdata`,
					method: 'GET',
					success: (res) => {
						this.swiperList = res.data.message
					}
				})
			},
			getCateList() {
				uni.request({
					url: `${this.webUrlInfo}/api/public/v1/home/catitems`,
					method: 'GET',
					success: (res) => {
						this.cateList = res.data.message
					}
				})
			},
			getFloorList() {
				uni.request({
					url: `${this.webUrlInfo}/api/public/v1/home/floordata`,
					method: 'GET',
					success: (res) => {
						 res.data.message.forEach(floor => {
						    floor.product_list.forEach(prod => {
						      prod.url = '/subpackages/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
						    })
						 })
						
						this.floorList = res.data.message
					}
				})
			},
			cateNavHandle(cate) {
				if (cate.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}
		},
		created() {
			this.getSwiperData()
			this.getCateList()
			this.getFloorList()
		}
	}
</script>

<style lang="scss">
.swiper-item {
	width: 100%;
	height: 100%;
}
.swiper-item image {
	width: 100%;
	height: 100%;
}

.cate-nav {
	margin-top: 10px;
	display: flex;
	justify-content: space-around;
}
.nav-item image{
	width: 75px;
	height: 75px;
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}
</style>
