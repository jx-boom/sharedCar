import Vue from 'vue'
import App from './indexMap'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '轨迹详情'
  }
}
