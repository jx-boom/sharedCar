<template>
  <div class="container">
    <indexMap></indexMap>
    <navBar @go="go" :from="name"></navBar>
  </div>
</template>
<script>
import nav from '../../components/nav/nav.vue';
import indexMap from '../indexMap/indexMap';
import http from '../../http'
export default {
  data () {
    return {
      name: 'index',
      showcadr: false,
      checkTime: [],
      userInfo: {}
    }
  },
  components: {
    indexMap,
    "navBar": nav
  },
  methods: {
    go(name){
      const url = '../xx/main';
      wx.navigateTo({ url })
    },
    hiddenCdar(){
      this.showcadr= false;
    },
    select(val, val2) {
      this.checkTime=val
      this.showcadr= false;
    },
    showcdar(){
      console.log('showcdar showcdar');
      this.showcadr= !this.showcadr;
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
  created () {


    let data ={
      openId: '666',
      // phone: this.number,
      phone: 12845214638,
      code: 0
    };
    http.login(data,(res) => {
      http.getCarList( (res) => {
        if(res.code==0){

          console.log(res);

        }})




    });

    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style>
  .calendar{
    position: absolute !important;
    width: 80%;
    left: 8%;
    top: 8%;
    z-index: 20;
    background-color: #fff;
  }
.container{
  position: fixed;
  width: 100%;
  height: 100%;
  font-family: PingFangSC-Regular;
}
</style>
