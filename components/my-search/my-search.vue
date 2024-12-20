<template>
	<view style="background-color: #C00000;padding-bottom: 5px;padding-left: 10px;padding-right: 10px;height: 40px;">
		<view @click="gotoSearch()" class="search-box">
			搜索
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			gotoSearch () {
				uni.navigateTo({
				   url: '/subpackages/search/search'
				 })
			}
		}
	}
</script>

<style lang="scss">
.search-box {
	width: 100%;
	line-height: 35px;
	border-radius: 6px;
	background-color: #FFFFFF;
	text-align: center;
}
</style>
