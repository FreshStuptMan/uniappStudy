<template>
	<view class="goods-detail-container" v-if="goods.goods_name">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods.pics" :key="i">
				<image @click="preview(i)" :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info-box">
			<view class="goods-price">￥{{goods.goods_price}}</view>
			<view class="goods-info">
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-favor">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
				    <text>收藏</text>
				</view>
			</view>
			<view class="goods-deliever">快递：免运费</view>
		</view>
		<view>
			<rich-text :nodes="goods.goods_introduce"></rich-text>
		</view>
		<!-- 商品导航组件 -->
		<view class="goods_nav">
		  <!-- fill 控制右侧按钮的样式 -->
		  <!-- options 左侧按钮的配置项 -->
		  <!-- buttonGroup 右侧按钮的配置项 -->
		  <!-- click 左侧按钮的点击事件处理函数 -->
		  <!-- buttonClick 右侧按钮的点击事件处理函数 -->
		  <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrlInfo: 'https://api-hmugo-web.itheima.net',
				goodsId: null,
				goods: {},
				// 左侧按钮组的配置对象
				options: [{
				  icon: 'shop',
				  text: '店铺'
				}, {
				  icon: 'cart',
				  text: '购物车',
				  info: 2
				}],
				// 右侧按钮组的配置对象
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				  },
				  {
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				  }
				]
			};
		},
		methods: {
			getGoodsDetail () {
				uni.request({
					url: `${this.webUrlInfo}/api/public/v1/goods/detail`,
					data: {
						goods_id: this.goodsId
					},
					success: (res) => {
						// 让图片之间没有空白间隙,并将webg类型图片转为jpg
						res.data.message.goods_introduce = res.data.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
						this.goods = res.data.message
						console.log(this.goods)
					}
				})
			},
			// 实现轮播图的预览效果
			preview(i) {
			  // 调用 uni.previewImage() 方法预览图片
			  uni.previewImage({
			    // 预览时，默认显示图片的索引
			    current: i,
			    // 所有图片 url 地址的数组
			    urls: this.goods.pics.map(x => x.pics_big)
			  })
			},
			onClick (e) {
				if (e.content.text === '购物车') {
				    // 切换到购物车页面
				    uni.switchTab({
				      url: '/pages/cart/cart'
				    })
				  }
			},
			buttonClick () {}
		},
		onLoad(option) {
			this.goodsId = option.goods_id
			this.getGoodsDetail()
		}
	}
</script>

<style lang="scss">
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
.goods-info-box {
	padding: 10px;
	padding-right: 0px;
	
	.goods-price {
		color: #c00000;
		font-size: 18px;
		font-weight: bolder;
		margin: 10px 0;
	}
	
	.goods-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
		.goods-name {
			font-size: 13px;
			padding-right: 10px;
		}
		
		.goods-favor {
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-left: 1px solid #efefef;
			color: gray;
		}
	}
	.goods-deliever {
		margin: 10px 0;
		font-size: 12px;
		color: gray;
	}
}
.goods-detail-container {
  // 给页面外层的容器，添加 50px 的内padding，
  // 防止页面内容被底部的商品导航组件遮盖
  padding-bottom: 50px;
}

.goods_nav {
  // 为商品导航组件添加固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
