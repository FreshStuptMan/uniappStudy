<template>
	<view>
		<view class="search-box">
		  <!-- 使用 uni-ui 提供的搜索组件 -->
		  <uni-search-bar @input="searchInput" clearButton="always" cancelButton="none"></uni-search-bar>
		</view>
		<view class="suggest-list">
			<view @click="gotoGoodsDetail(suggest)" v-for="(suggest, index) in searchList" :key="suggest.goods_id" class="suggest-item">
				<view class="goods-name">{{suggest.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<view v-if="searchList.length === 0" style="padding: 0 5px;">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons @click="clearHistory" type="trash" size="17"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag @click="gotoGoodsList(item)" :text="item" v-for="(item, index) in historys" :key="index" class="history-item"></uni-tag >
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			historys () {
				return [...this.historyList].reverse()
			}
		},
		data() {
			return {
				webUrlInfo: 'https://api-hmugo-web.itheima.net',
				timeId: null,
				keyword: '',
				searchList: [],
				historyList: ['1', '2']
			};
		},
		methods: {
			getSearchList() {
				if (this.keyword === '') {
					this.searchList = []
					return
				}
				
				uni.request({
					url: `${this.webUrlInfo}/api/public/v1/goods/qsearch`,
					data: {
						query: this.keyword
					},
					method: 'GET',
					success: (res) => {
						this.searchList = res.data.message
						this.saveSearchHistory()
					}
				})
			},
			// 防抖处理
			searchInput (e) {
				clearTimeout(this.timeId)
				this.timeId = setTimeout(() => {
					this.keyword = e.value
					this.getSearchList()
				}, 500)
			},
			gotoGoodsDetail(goods) {
				uni.navigateTo({
					url: '/subpackages/good_detail/good_detail?goods_id=' + goods.goods_id
				})
			},
			saveSearchHistory() {
			  // 1. 将 Array 数组转化为 Set 对象
			  const set = new Set(this.historyList)
			  // 2. 调用 Set 对象的 delete 方法，移除对应的元素
			  set.delete(this.keyword)
			  // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
			  set.add(this.keyword)
			  // 4. 将 Set 对象转化为 Array 数组
			  this.historyList = Array.from(set)
			  // 持久化存储
			  uni.setStorageSync('SearchHistory', JSON.stringify(this.historyList))
			},
			clearHistory () {
				this.historyList = []
				uni.setStorageSync('SearchHistory', '[]')
			},
			gotoGoodsList(item) {
			  uni.navigateTo({
			    url: '/subpkg/goods_list/goods_list?query=' + item
			  })
			}
		},
		created () {
			this.historyList = JSON.parse(uni.getStorageSync('SearchHistory') || '[]')
		}
	}
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
	background-color: #C00000;
}
.suggest-list {
	padding: 0 5px;
}
.suggest-item {
	font-size: 12px;
	padding: 13px 0;
	border-bottom: 1px solid #efefef;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.goods-name {
	// 文字不允许换行（单行文本）
	white-space: nowrap;
	// 溢出部分隐藏
	overflow: hidden;
	// 文本溢出后，使用 ... 代替
	text-overflow: ellipsis;
	margin-right: 3px;
}
.history-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40px;
	font-size: 13px;
	border-bottom: 1px solid #efefef;
}
.uni-tag {
    margin-top: 5px;
    margin-right: 5px;
}
.history-list {
    display: flex;
    flex-wrap: wrap;
}
</style>
