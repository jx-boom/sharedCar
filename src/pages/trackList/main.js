import Vue from 'vue'
import App from './trackList'

console.log(App);

const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: '行迹'
  }
}
