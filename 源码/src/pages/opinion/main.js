import Vue from 'vue'
import App from './opinion'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '意见建议'
  }
}
