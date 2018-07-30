import Vue from 'vue'
import App from './userNotes'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '用户须知'
  }
}
