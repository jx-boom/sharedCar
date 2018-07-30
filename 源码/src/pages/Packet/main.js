import Vue from 'vue'
import App from './Packet'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '卡包充值'
  }
}
