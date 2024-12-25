import Vue from 'vue'
import App from './App'
// 1. 导入 store 的实例对象
import store from './store/store.js'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	// 2. 将 store 挂载到 Vue 实例上
	store
})
app.$mount()

// 封装的展示消息提示的方法
uni.$showRequestFaildMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}
