<template>
  <div class="container">
    <indexMap></indexMap>
    <navBar @go="go" :from="name" class="navBar"></navBar>
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
  "onShow"(){
    console.log("index show");
    wx.setNavigationBarTitle({
      title: '护行'
    });
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
    //
    //
    // let data ={
    //   openId: '666',
    //   // phone: this.number,
    //   phone: 12845214638,
    //   code: 0
    // };
    // http.login(data,(res) => {
    //   http.getCarList( (res) => {
    //     if(res.code==0){
    //
    //       console.log(res);
    //
    //     }})
    //
    //
    //
    //
    // });

    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style>
 .indexMap{
   width: 100%;
   height: 90%;
   margin-bottom: 60px;
 }

  .navBar{
    width: 100%;
    height: 49px;
    background-color: #313a43;
    box-shadow: 0px 0px 12px 0px
    rgba(0, 0, 0, 0.2);
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
  }
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
