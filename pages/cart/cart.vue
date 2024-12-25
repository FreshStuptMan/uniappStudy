<template>
	<view v-if="cart.length > 0" style="padding-bottom: 60px;">
		<my-address></my-address>
		<view class="cart-head">
			<view>
				<uni-icons type="shop" size="18"></uni-icons>
			</view>
			<view class="cart-title">购物车</view>
		</view>
		<uni-swipe-action>
			<view v-for="(item, index) in cart" :key="index">
				<uni-swipe-action-item :options="options" @click="deleteItems(item)">
					<my-goods @change-number="changeGoodsNumber" @change-status="changeGoodsStatus" :item="item" :show-radio="true"
					 :show-number-box="true"></my-goods>
				</uni-swipe-action-item>
			</view>
		</uni-swipe-action>
		<view>
			<my-settle></my-settle>
		</view>
	</view>
	<!-- 空白购物车区域 -->
	<view v-else>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('my_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}],
			};
		},
		methods: {
			...mapMutations('my_cart', ['updateGoodsStatus', 'updateGoodsNumber', 'deleteGoods']),
			changeGoodsStatus(goodsInfo) {
				this.updateGoodsStatus(goodsInfo)
			},
			changeGoodsNumber(goodsInfo) {
				this.updateGoodsNumber(goodsInfo)
			},
			deleteItems(goodsInfo) {
				this.deleteGoods(goodsInfo)
			}
		}
	}
</script>

<style lang="scss">
	.cart-head {
		display: flex;
		flex-direction: row;

		.cart-title {
			font-weight: 300;
			margin-left: 5px;
		}
	}
	.tip-text {
	    font-size: 12px;
	    color: gray;
	    margin-top: 15px;
	  }
</style>
