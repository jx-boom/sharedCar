<template>
  <div class="message">
    <scroll-view scroll-y style="height:calc(100% - 50px)">
<div class="msg" v-for="msg in msgList" :key="msg.id">
  <div class="tit">{{msg.title}}</div>
  <div class="data">{{msg.createDate}}</div>
  <div style="width: 100%;height: 1px;"></div>
  <div class="txt">
    <div class="logoMin"></div>
    益迈智能生活
  </div>
  <div class="content">&nbsp;{{msg.content}}</div>
</div>
    </scroll-view>
    <div class="nav">
      <span class="btn" @click="go('index')"><div class="hx"></div><span class="text">护行</span></span>
      <span class="btn" @click="go('indexhome')" ><div class="xj"></div><span class="text">行迹</span></span>
      <span class="btn" @click="go('message')"><div class="xx"></div><span class="text">消息</span></span>
      <span class="btn" @click="go('mine')"><div class="wd"></div><span class="text">我的</span></span>
    </div>
  </div>
</template>
<script>
  import nav from '../../components/nav/nav.vue';
  import http from '../../http'
  import pageName from '../../../static/pageName'
  export default {
    name: 'message',
    data(){
      return {
        name: 'message',
        msgList:[
        ]
      }
    },
    methods:{
      go(route){
        if(!wx.getStorageSync('number')){
          wx.navigateTo({ url:`../login/main` })
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
    onShow(){
      wx.setNavigationBarTitle({
        title: '消息详情'
      });
    },
    mounted(){
     if(this.$mp.query.id){
    http.getMessageDetial(this.$mp.query.id,(res) => {
      this.msgList= res.data
      var tType= [
        'a',
        'b',
        'c'
      ];
      for(var msg of this.msgList){
        msg.type=tType[msg.msgtype]
      }

    })
  }



    },
    components:{
      nav
    }
  }
</script>
<style scoped>
  .txt{
    font-size: 13px;
    color: #313a43;
    padding-left: 7px;
    padding-bottom: 14px;
    box-sizing: border-box;
  }
  .tit{
    margin-bottom: 10px;
    font-weight: 500;
    padding-left: 10px;
    line-height: 21px;
    width: 80%;
    word-break: break-word;
    transform: translateY(10px);
  }
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
  .data{
    font-size: 11px;
    color: #a9a9a9;
    padding-top: 15px;
    padding-bottom: 14px;
    text-align: left;
    padding-left: 10px;
  }
  .time{
    font-size: 13px;
    color: #a9a9a9;
  }
  .tit{
    margin-bottom: 5px;
    font-weight: 600 ;
    padding-left: 10px;
  }
  .content{
    font-size: 13px;
    color: #313a43;
    padding-left: 18px;
    padding-right: 25px;
    padding-top: 16px;
    box-sizing: border-box;
    padding-bottom: 25px;
    width: 100%;
    display: block;
    word-break: break-word;
    border-top: 0.5px dashed #e5e5e5;
  }
  .type{
    position: absolute;
    left: 0;
    width: 3px;
    height: 88px;

    border-radius: 2px;
    margin-right: 15px;
    top: 0;
  }
  .a{
    background-color: #f12c20;
  }
  .b{
    background-color: yellow;
  }
  .c{
    background-color: green;
  }
.msg{
  position: relative;
  width: 90%;
  background-color: #ffffff;
  box-shadow: 0px 0px 6px 0px
  rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  margin-left: 5%;
  margin-top: 30px;
  margin-bottom: 10px;
}
/*.to{*/
  /*position: absolute;*/
  /*right: 10px;*/
  /*bottom: 10px;*/
  /*width: 8px;*/
  /*height: 15px;*/
  /*background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZCAYAAAA4/K6pAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAUhJREFUOI2d1MkvBEEUx/GP3diXECIh7iIRsc3Vv84gEduBi5OTiMRubMGhq2k13Xp4l+78qn/fevXe62pZqK4LMY1hHOFDk9EenjOYD+9t2G8W0o5ZzGW0KbRiD+9lgFZUcvRJLIb1UsAxTnLWJrBUBkkXT3Go8dzjWJbU5VcAnGFX47nHsOK74IUAOMcO3iJ9NEA6ygBwiRqeI30EqzGkqEA32EQ90oewhs4yADxgA3eRPhggXWUAeAqZXEX6AKroLh0UvOJAY4v7sNAMoCLpQEuk13GY29tM9EhSjcf9EVt4/A3QKylWbH4I5joF0xXMVXTnmGuS4ioC9IWdY/N92PkpK8aAfpkeZ+IumOPp/AEYEE1ZiNtgfsnJ9muQ/mVOM0hHM/7TboL5tcicAvIuz2tsl5lJjnAbfXzVrDkFpDvu4OIvZvgECB5JCtjsxCYAAAAASUVORK5CYII=);*/
  /*background-size: 100% 100%;*/
/*}*/
.time{
  position: absolute;
  right: 0;
  top: 95px;
}
  .message{

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
  .wd{
    background-image: url("../../components/nav/img/wd.png") ;
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
  .logoMin{
    background-image: url(data:image/png;base64,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);
    width: 25px;
    height: 25px;
    display: inline-block;
    background-size: 100% 100%;
    transform: translateY(5px);
  }
</style>
