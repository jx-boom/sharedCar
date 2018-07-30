<template>
  <div class="nav">
    <!--// <button open-type="openSetting">打开授权设置页</button>-->
    <span class="btn" :class="{check:from=='index'}" @click="go('index')"><div class="hx"></div><span class="text">护行</span></span>
    <span class="btn" :class="{check:from=='indexhome'}" @click="go('indexhome')" ><div class="xj"></div><span class="text">行迹</span></span>
    <span class="btn" @click="go('message')"><div class="xx" style="position: relative;">  <i :class="{unread:unread}"></i></div><span class="text">消息</span></span>
    <span class="btn" @click="go('mine')"><div class="wd"></div><span class="text">我的</span></span>
  </div>
</template>
<script>
  import pageName from '../../../static/pageName';
  import http from '../../http'
  export default {
    "name": 'nav',
    "data"(){
      return {
        unread: false
      }
    },
    "props":{
      from: String
    },
    "methods":{
      go(route){

        if(route=='mine'){
       if(!wx.getStorageSync('number')){
         wx.redirectTo({ url:`../login/main` })
         wx.setNavigationBarTitle({
           title: '绑定'
         });
         return
       }

     }


        var url = `../${route}/main`;
        wx.redirectTo({ url })
        wx.setNavigationBarTitle({
          title: pageName[route]
        });
      }
    },
    'onShow'(){
      console.log("nav onShow");
      http.getMessageList((res) => {
        console.log(res);
        this.unread= false;
        for(let msg of res.data){
          console.log("msg");
          console.log(msg.isRead);
          if(msg.isRead == 0){
            this.unread= true;
          }
        }



      })
    },

    mounted(){
      console.log(this);
      console.log("this");
      http.getMessageList((res) => {

        for(let msg of res.data){
          if(msg.isRead == 0){
            this.unread= true;
            break
          }
        }})
    }
  }
</script>
<style scoped>
  .unread{
    position: absolute;
    right: 0;
    top: 0;
    width: 6px;
    height: 6px;
    background-color: red;
    box-shadow: 0 0 5px #802c0b;
    border-radius: 2px;
  }
  .nav{
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
 .nav li{
      display: inline-block;
    }

  .btn{
    height: 49px;
    display: inline-block;
    width: 25%;
    float: left;
    text-align: center;
    padding-top: 5px;
    box-sizing: border-box;
  }

  .hx{
    background-image: url(https://app.ymai.net.cn/static/APPimage/nursingicon_def.png);
  }
  .check>.hx{
    background-image:url(https://app.ymai.net.cn/static/APPimage/nursingicon_OK.png);
  }

  .check>.xj{
    background-image: url("./img/xjC.png");
    height: 20px;
  }
  .xx{
    background-image: url("./img/xx.png");
  }
  .check>.xx{
    background-image: url(https://app.ymai.net.cn/static/APPimage/trackicon_OK.png);
  }
  .wd{
    background-image: url("./img/wd.png") ;
  }
  .check>.wd{
    background-image: url("./img/wdC.png");
  }
  .check>div,.btn>div{
    width: 22px;
    height: 20px;
    display: inline-block;
    background-position: center center;
    background-size: 100% 100%;
  }
  .xj{
    background-image: url(https://app.ymai.net.cn/static/APPimage/trackicon_def.png);
    height: 20px;
  }
  .text{
    width: 100%;
    display: inline-block;
    font-size: 12px;
    color: #fff;
    transform: translateY(-8px);
  }
</style>
