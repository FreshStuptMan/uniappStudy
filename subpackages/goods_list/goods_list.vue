<template>
	<view>
		<view class="goods-list">
			<view @click="gotoGoodsDetail(item)" v-for="item in goodsList" :item="item" :key="item.goods_id">
				<my-goods :item="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrlInfo: 'https://api-hmugo-web.itheima.net',
				goodsList: [],
				query: '',
				cid: '',
				pageSize: 10,
				pageNum: 1,
				total: 0,
				isLoading: false
			};
		},
		methods: {
			getGoodsList(callback) {
				this.isLoading = true
				uni.request({
					url: `${this.webUrlInfo}/api/public/v1/goods/search`,
					method: 'GET',
					data: {
						query: this.query,
						cid: this.cid,
						// 页码值
						pagenum: this.pageNum,
						// 每页显示多少条数据
						pagesize: this.pageSize
					},
					success: (res) => {
						this.goodsList = [...this.goodsList,...res.data.message.goods]
						this.total = res.data.message.total
						console.log(this.goodsList)
					},
					complete: () => {
						this.isLoading = false
						callback && callback()
					}
				})
			},
			gotoGoodsDetail (item) {
				uni.navigateTo({
					url: '/subpackages/good_detail/good_detail?goods_id=' + item.goods_id
				})
			}
		},
		onLoad(option) {
			if (option.query) {
				this.query = option.query
			}
			if (option.cid) {
				this.cid = option.cid
			}
			this.getGoodsList()
		},
		onReachBottom () {
			if ((this.pageSize * this.pageNum) >= this.total) {
				return
			}
			if (this.isLoading) {
				return
			}
			this.pageNum++
			this.getGoodsList()
		},
		onPullDownRefresh () {
			this.pageNum = 1
			this.isLoading = false
			this.goodsList = []
			this.total = 0
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
</style>
