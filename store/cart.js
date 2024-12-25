export default {
	// 为当前模块开启命名空间
	namespaced: true,

	// 模块的 state 数据
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	// 模块的 mutations 方法
	mutations: {
		addToCart(state, goods) {
			// 根据提交的商品的Id，查询购物车中是否存在这件商品
			// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

			if (!findResult) {
				// 如果购物车中没有这件商品，则直接 push
				state.cart.push(goods)
			} else {
				// 如果购物车中有这件商品，则只更新数量即可
				findResult.goods_count++
			}

			// 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			this.commit('my_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateGoodsStatus(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('my_cart/saveToStorage')
			}
		},
		updateGoodsNumber(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('my_cart/saveToStorage')
			}
		},
		updateAllStatus(state, newStatus) {
			state.cart.forEach(goods => {
				goods.goods_state = newStatus
			})
			this.commit('my_cart/saveToStorage')
		},
		deleteGoods(state, goods) {
			state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
			this.commit('my_cart/saveToStorage')
		}
	},

	// 模块的 getters 属性
	getters: {
		// 统计购物车中商品的总数量
		total(state) {
			let c = 0
			// 循环统计商品的数量，累加到变量 c 中
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		checkTotal(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		checkedGoodsAmount(state) {
		  // 先使用 filter 方法，从购物车中过滤器已勾选的商品
		  // 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
		  // reduce() 的返回值就是已勾选的商品的总价
		  // 最后调用 toFixed(2) 方法，保留两位小数
		  return state.cart.filter(x => x.goods_state)
		                   .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
		                   .toFixed(2)
		}
	}
}
