<template>
	<view>
		<view class="goods-item">
			<view class="left-image">
				<radio v-if="showRadio" @click="changeStatus" :checked="item.goods_state" color="#C00000"></radio>
				<image class="goods-image" :src="item.goods_small_logo || defaultPic"></image>
			</view>
			<view class="right-info">
				<view class="goods-name">{{item.goods_name}}</view>
				<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
					<view class="goods-price">￥{{item.goods_price | tofixed}}</view>
					<uni-number-box :step="1" :value="item.goods_count" @change="changeNumber" v-if="showNumberBox" :min="1"></uni-number-box>
				</view>
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
			},
			showRadio: {
				type: Boolean,
				defaul: false
			},
			showNumberBox: {
				type: Boolean,
				defaul: false
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
		},
		methods: {
			changeStatus () {
				this.$emit('change-status', {
					goods_id: this.item.goods_id,
					goods_state: !this.item.goods_state
				})
			},
			changeNumber(value) {
				this.$emit('change-number', {
					goods_id: this.item.goods_id,
					goods_count: value - 0
				})
			}
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
.left-image {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
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
