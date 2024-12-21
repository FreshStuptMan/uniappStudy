<template>
	<view>
		<view class="goods-item">
			<view class="left-image">
				<image class="goods-image" :src="item.goods_small_logo || defaultPic"></image>
			</view>
			<view class="right-info">
				<view class="goods-name">{{item.goods_name}}</view>
				<view class="goods-price">￥{{item.goods_price | tofixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				defaul: {}
			}
		},
		filters: {
		  // 把数字处理为带两位小数点的数字
		  tofixed(num) {
		    return Number(num).toFixed(2)
		  }
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		}
	}
</script>

<style lang="scss">
.goods-item {
	display: flex;
	flex-direction: row;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
}
.goods-image {
	width: 100px;
	height: 100px;
}
.right-info {
	padding-left: 5px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.goods-name {
	font-size: 14px;
}
.goods-price {
	font-weight: bolder;
	color: #C00000;
}
</style>
