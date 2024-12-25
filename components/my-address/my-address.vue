<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view v-if="JSON.stringify(address) === '{}'" class="address-choose-box">
			<button type="primary" size="mini" @click="chooseAddress()" class="btnChooseAddress">请选择收货地址</button>
		</view>
		<view @click="chooseAddress" v-else class="address-info-box">
			<view class="address-personal-info">
				<view class="left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="right">
					<view class="phone">收货电话：{{address.telNumber}}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="address">收货地址：{{AddressInfo}}</view>
		</view>
		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import { mapState,mapMutations,mapGetters } from 'vuex'
	export default {
		computed: {
			...mapState('my_user', ['address']),
			...mapGetters('my_user', ['AddressInfo'])
		},
		data() {
			return {
			};
		},
		methods: {
			...mapMutations('my_user', ['updateAddress']),
			async chooseAddress() {
			  // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
			  //    返回值是一个数组：第1项为错误对象；第2项为成功之后的收货地址对象
			  const [err, succ] = await uni.chooseAddress().catch(err => err)
			
			  // 2. 用户成功的选择了收货地址
			  if (succ && succ.errMsg === 'chooseAddress:ok') {
			    this.updateAddress(succ)
			  }
			
			  // 3. 用户没有授权（已过时）
			  // if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) {
			  //   this.reAuth()
			  // }
			}
			// 调用此方法，重新发起收货地址的授权
			// async reAuth() {
			//   // 3.1 提示用户对地址进行授权
			//   const [err2, confirmResult] = await uni.showModal({
			//     content: '检测到您没打开地址权限，是否去设置打开？',
			//     confirmText: "确认",
			//     cancelText: "取消",
			//   })
			
			//   // 3.2 如果弹框异常，则直接退出
			//   if (err2) return
			
			//   // 3.3 如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
			//   if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
			
			//   // 3.4 如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
			//   if (confirmResult.confirm) return uni.openSetting({
			//     // 3.4.1 授权结束，需要对授权的结果做进一步判断
			//     success: (settingResult) => {
			//       // 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
			//       if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
			//       // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
			//       if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
			//     }
			//   })
			// }
		}
	}
</script>

<style lang="scss">
	.address-personal-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.address-info-box {
		height: 50px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 0 5px;
		font-size: 14px;
	}

	// 底部边框线的样式
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	.right {
		display: flex;
		flex-direction: row;
	}

	// 选择收货地址的盒子
	.address-choose-box {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
