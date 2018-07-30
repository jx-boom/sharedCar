<template>
<div class="miner">

    <div class="userInfo">
      <div class="header"><open-data type="userAvatarUrl"></open-data></div>
      <div class="num">{{num}}</div>
    </div>
  <ul class="ulBox">
    <li @click="go('custom')">客服</li>
    <li @click="go('myCar')">我的车</li>
    <li @click="go('Packet')">卡包充值</li>
    <li @click="go('opinion')">意见建议</li>
    <li @click="go('disclaimer')">免责声明</li>
    <li @click="go('userNotes')">用户须知</li>
    <li class="logout" @click="go('login')">退出</li>
  </ul>
  <div class="nav">
    <span class="btn" @click="go('index')"><div class="hx"></div><span class="text">护行</span></span>
    <span class="btn" @click="go('indexhome')" ><div class="xj"></div><span class="text">行迹</span></span>
    <span class="btn" @click="go('message')"><div class="xx" style="position: relative;"> <i :class="{unread:unread}"></i></div><span class="text">消息</span></span>
    <span class="btn" @click="go('mine')"><div class="wd"></div><span class="text">我的</span></span>
  </div>
</div>
</template>
<script>
  import pageName from '../../../static/pageName';
  import http from '../../http'

  export default {
    name: 'mine',
    data(){
      return {
        name: 'mine',
        unread: false,
        num: 0,
      }
    },
    methods:{
      go(route){
        if(route== 'login'){
          wx.removeStorageSync('number');
          wx.removeStorageSync('TOKEN');
          wx.stopPullDownRefresh()
        }
        if(!wx.getStorageSync('number')){
          wx.redirectTo({ url:`../login/main` })
          wx.setNavigationBarTitle({
            title: '绑定'
          });
          return
        }

        var url = `../${route}/main`;
        wx.navigateTo({ url })
        wx.setNavigationBarTitle({
          title: pageName[route]
        });
      }
    },

    mounted(){
    this.num=  wx.getStorageSync( "number");



      http.getMessageList((res) => {
        this.unread= false;
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
    background-image: url("../../components/nav/img/hx.png");
  }


  .check>.xj{
    background-image: url("../../components/nav/img/xjC.png");
    height: 20px;
  }
  .xx{
    background-image: url("../../components/nav/img/xx.png");
  }

  .wd{
    background-image: url(https://app.ymai.net.cn/static/APPimage/meicon_OK.png) ;
  }
  .xj{
    background-image: url("../../components/nav/img/xj.png");
    height: 20px;
  }
  .text{
    width: 100%;
    display: inline-block;
    font-size: 12px;
    color: #fff;
    transform: translateY(-8px);
  }

  .miner{
    width: 100%;
    height: 100%;
    background-image:url(https://app.ymai.net.cn/static/APPimage/mebackground.png);
    background-size: 100% 100%;
    background-position: center center;
    position: fixed;
  }
  ul{
    background-color: #f8fefa;
    box-shadow: 0px 0px 12px 0px
    rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    position: absolute;
    bottom: 49px;
    width: 100%;

  }

 .ulBox>li{
    font-size: 17px;
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 15px;
    border-bottom: 0.5px solid rgba(49, 58, 67, 0.01);
  }
  .ulBox>li::after{
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZCAYAAAA4/K6pAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAUhJREFUOI2d1MkvBEEUx/GP3diXECIh7iIRsc3Vv84gEduBi5OTiMRubMGhq2k13Xp4l+78qn/fevXe62pZqK4LMY1hHOFDk9EenjOYD+9t2G8W0o5ZzGW0KbRiD+9lgFZUcvRJLIb1UsAxTnLWJrBUBkkXT3Go8dzjWJbU5VcAnGFX47nHsOK74IUAOMcO3iJ9NEA6ygBwiRqeI30EqzGkqEA32EQ90oewhs4yADxgA3eRPhggXWUAeAqZXEX6AKroLh0UvOJAY4v7sNAMoCLpQEuk13GY29tM9EhSjcf9EVt4/A3QKylWbH4I5joF0xXMVXTnmGuS4ioC9IWdY/N92PkpK8aAfpkeZ+IumOPp/AEYEE1ZiNtgfsnJ9muQ/mVOM0hHM/7TboL5tcicAvIuz2tsl5lJjnAbfXzVrDkFpDvu4OIvZvgECB5JCtjsxCYAAAAASUVORK5CYII=');
    width: 8px;
    height: 12px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    opacity: 0.3;
    content: '';
    display: inline-block;
    float: right;
  }
  .userInfo{
    position: absolute;
    width: 212px;
    height: 221px;
    position: absolute;
    left: 50%;
    top:15px;
    text-align: center;
    transform: translateX(-105px);
  }
  .num{
    font-size: 15px;
    color: #313a43;
    font-weight: 600;
  }
  .header{
    width: 73px;
    height: 73px;
    border-radius: 78px;
    overflow: hidden;
    display: inline-block;
    margin-top: 5px;
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
    background-image: url("../../components/nav/img/hx.png");
  }
  .check>.hx{
    background-image: url("../../components/nav/img/hxC.png");
  }

  .check>.xj{
    background-image: url("../../components/nav/img/xjC.png");
    height: 20px;
  }
  .xx{
    background-image: url("../../components/nav/img/xx.png");
  }
  .check>.xx{
    background-image: url("../../components/nav/img/xxC.png");
  }

  .check>.wd{
    background-image: url("../../components/nav/img/wdC.png");
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
  .logout{
    text-align: center;
    padding-top: 10px;
    padding-bottom:10px;
    background-color: red;
    font-size: 15px;
    color: #fff;
  }

</style>
