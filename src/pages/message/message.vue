<template>
  <div class="message">
    <scroll-view scroll-y style="height:calc(100% - 50px)">
<div class="msg" v-show="msgList.length!=0" v-for="msg in msgList" :key="msg.id"  @click="toDetial(msg)">
  <div class="data">{{msg.$day }}</div>
  <div class="day">{{msg.day }}</div>
  <div class="type" :class="msg.type"></div>
  <div class="tit">{{msg.title}}</div>
  <div class="content">{{msg.content}}</div>

  <div class="to"></div>

</div>
    </scroll-view>
   <!--<div class="unMsg" v-show="msgList.length==0">-->
   <div v-show="msgList.length==0" class="unMsg" >
     您暂时没有消息
   </div>

    <div class="nav">
      <span class="btn" @click="go('index')"><div class="hx"></div><span class="text">护行</span></span>
      <span class="btn" @click="go('indexhome')" ><div class="xj"></div><span class="text">行迹</span></span>
      <span class="btn" @click="go('message')"><div class="xx" style="position: relative;"><i :class="{unread:unread}"></i></div><span class="text">消息</span></span>
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
        unread: false,
        msgList:[
        ]
      }
    },
    "filters":{
      transTime(stmp){
        var time = new Date(stmp);
        var now = new Date();
        var m = time.getMonth()+1;
        var d = time.getDate();
        if(now.getMonth()+1==m){
          if(time.getDate()==d){
            return '今天'
          }
        }
        console.log(m+'.'+d);
        return m+'.'+d;
      }
    },
    methods:{
      transTime(stmp){
        var time = new Date(stmp*1);
        var now = new Date();
        var m = time.getMonth()+1;
        var d = time.getDate();
        if(now.getMonth()+1==m){
          if(time.getDate()==d){
            return '今天'
          }
        }
        return m+'.'+d;
      },
      toDetial(msg){
        console.log("msg");
        wx.navigateTo({ url:`../messageDetial/main?id=`+msg.id })
        wx.setNavigationBarTitle({
          title: '消息详情'
        });
      },

      go(route){
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
    onshow() {

      wx.setNavigationBarTitle({
        title: '消息'
      });
      this.msgList=[];
      if(!wx.getStorageSync('number')){
        return
      }

      http.getMessageList((res) => {

        for(let msg of res.data){
          if(msg.isRead == 0){
            this.unread= true;
            break
          }
        }
        this.msgList= res.data;

        var tType= [
          'a',
          'b',
          'c'
        ];
       function transDay(day){
         let t= new Date(day*1),
            m= t.getMonth()+1,
            d= t.getDate();
         return m+'月'+d+'日';
       }
       function transTime(day) {
         let t= new Date(day*1),
            h=  t.getHours()<10?'0'+t.getHours():t.getHours(),
            s= t.getMinutes()<10?'0'+t.getMinutes():t.getMinutes(),
            m= t.getMonth()+1,
            d= t.getDate();
           if(t.getMonth()==new Date().getMonth()){
             if(d==new Date().getDate()){
               return '今天 '+ h+':'+s;
             }
              if((Date.parse(new Date()) - day*1)< 86400000){
               return    '昨天 '+ h+':'+s;
              }
           }
           else{
             return m+'月'+d+'日'

           }
       }
        for(var msg of this.msgList){
          msg.type=tType[msg.msgtype];
          msg.day= transDay(msg.time);
          msg.$day= transTime(msg.time)

        }
        console.log(this.msgList);
        console.log("this.msgList");
      })
    },
    mounted(){
      this.msgList=[];
      if(!wx.getStorageSync('number')){
        return
      }

      http.getMessageList((res) => {
         this.unread= false;
          for(let msg of res.data){
            console.log(msg.type == 0);
            if(msg.isRead==0){
              this.unread= true;
            }
          }
       this.msgList= res.data;
   var tType= [
     'a',
     'b',
     'c'
   ];
        function transDay(day){
          let t= new Date(day*1),
            m= t.getMonth()+1,
            d= t.getDate();
          return m+'月'+d+'日';
        }
        function transTime(day) {
          let t= new Date(day*1),
            h=  t.getHours()<10?'0'+t.getHours():t.getHours(),
            s= t.getMinutes()<10?'0'+t.getMinutes():t.getMinutes(),
            m= t.getMonth()+1,
            d= t.getDate();
            m= m<10?'0'+m:m;
           d= d<10?'0'+d:d;
          let now= new Date(),
            nowh=  t.getHours()<10?'0'+t.getHours():t.getHours(),
            nows= t.getMinutes()<10?'0'+t.getMinutes():t.getMinutes(),
            nowm= t.getMonth()+1,
            nowd= t.getDate();
            nowm= nowm<10?'0'+nowm:nowm;
            nowd= nowd<10?'0'+nowd:nowd;
          if(t.getMonth()==new Date().getMonth()){
            if(d==new Date().getDate()){
              return '今天 '+ h+':'+s;
            }
           let time= Date.parse(new Date('2018-'+nowm+'-'+nowd))-
            Date.parse(new Date('2018-'+m+'-'+d));
            if(time< 86400000){
              return    '昨天 '+ h+':'+s;
            }
            else{
              return m+'月'+d+'日'

            }
          }
          else{
            return m+'月'+d+'日'

          }
        }
        for(var msg of this.msgList){
          msg.type=tType[msg.msgtype];
          msg.day= transDay(msg.time);
          msg.$day= transTime(msg.time)

        }
        console.log(this.msgList);
        console.log("this.msgList");
      })
    },
    components:{
      nav
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
  .day{
    position: absolute;
    right: 10px;
    top: 10px;
    display: inline-block;
    font-size: 11px;
    color: #a9a9a9;
  }
  .data{
    font-size: 11px;
    color: #a9a9a9;
    padding-top: 15px;
    text-align: center;
    transform: translateY(-35px);
  }
  .time{
    font-size: 13px;
    color: #a9a9a9;
  }
  .tit{
    margin-bottom: 10px;
    font-weight: 600 ;
    padding-left: 10px;
    width: 50%;
    height: 21px;
    line-height: 21px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 16px;
    transform: translateY(-15px);
  }

  .content{
    font-size: 13px;
    color: #a9a9a9;
    padding-left: 10px;
    overflow: hidden;
    width: 80%;
    word-break: keep-all;
    white-space: nowrap;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    text-overflow: ellipsis;
    height: 20px;
    line-height: 20px;
    transform: translateY(-8px);
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
  height: 85px;
  background-color: #ffffff;
  box-shadow: 0px 0px 6px 0px
  rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  margin-left: 5%;
  margin-top: 30px;
  margin-bottom: 10px;
}
.unMsg{
  width: 100%;
  height: 100%;
  padding-top: 45%;
  box-sizing: border-box;
  color: black;
  text-align: center;
  font-size: 25px;
}
.to{
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 8px;
  height: 15px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZCAYAAAA4/K6pAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAUhJREFUOI2d1MkvBEEUx/GP3diXECIh7iIRsc3Vv84gEduBi5OTiMRubMGhq2k13Xp4l+78qn/fevXe62pZqK4LMY1hHOFDk9EenjOYD+9t2G8W0o5ZzGW0KbRiD+9lgFZUcvRJLIb1UsAxTnLWJrBUBkkXT3Go8dzjWJbU5VcAnGFX47nHsOK74IUAOMcO3iJ9NEA6ygBwiRqeI30EqzGkqEA32EQ90oewhs4yADxgA3eRPhggXWUAeAqZXEX6AKroLh0UvOJAY4v7sNAMoCLpQEuk13GY29tM9EhSjcf9EVt4/A3QKylWbH4I5joF0xXMVXTnmGuS4ioC9IWdY/N92PkpK8aAfpkeZ+IumOPp/AEYEE1ZiNtgfsnJ9muQ/mVOM0hHM/7TboL5tcicAvIuz2tsl5lJjnAbfXzVrDkFpDvu4OIvZvgECB5JCtjsxCYAAAAASUVORK5CYII=);
  background-size: 100% 100%;
}
.time{
  position: absolute;
  right: 0;
  top: 95px;
}
  .message{
    position: fixed;
    width: 100%;
    height: 100%;
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
    background-image: url(https://app.ymai.net.cn/static/APPimage/msgicon_Ok.png);
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
