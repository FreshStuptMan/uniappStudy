<template>
	<view class="my-settle-container">
		<label @click="radioClickHandle" class="settle-radio">
			<radio color="#C00000" :checked="checkAll" /><text>全选</text>
		</label>
		
		<view class="settle-total">
			总计：{{checkedGoodsAmount}}￥
		</view>
		<view class="settle-button">
			结算（{{checkTotal}}）
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters('my_cart', ['checkTotal', 'total', 'checkedGoodsAmount']),
			checkAll() {
				return this.total === this.checkTotal
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations('my_cart', ['updateAllStatus']),
			radioClickHandle () {
				this.updateAllStatus(!this.checkAll)
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 5px;
	background-color: grey;
}
.settle-radio {
	display: flex;
	align-items: center;
}
.settle-button {
	text-align: center;
	line-height: 60px;
	min-width: 100px;
	color: white;
	background-color: #C00000;
}
</style>
