export default {
	// 为当前模块开启命名空间
	namespaced: true,
	
	// 模块的 state 数据
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	
	// 模块的 mutations 方法
	mutations: {
		updateAddress(state, addressInfo) {
			state.address = addressInfo
			this.commit('my_user/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	},
	getters: {
		AddressInfo(state) {
			if (state.address === {}) {
				return ''
			}
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}