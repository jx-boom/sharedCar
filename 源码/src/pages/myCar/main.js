import Vue from 'vue'
import App from './myCar'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '我的车'
  }
}
