import Vue from 'vue'
import App from './carInfo'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '添加车辆'
  }
}
