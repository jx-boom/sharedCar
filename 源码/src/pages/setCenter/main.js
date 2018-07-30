import Vue from 'vue'
import App from './setCenter'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '设置半径'
  }
}
