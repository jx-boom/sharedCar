import Vue from 'vue'
import App from './calendar'

console.log(App);
const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '日历'
  }
}
