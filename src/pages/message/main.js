import Vue from 'vue'
import App from './message'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '消息'
  }
}
