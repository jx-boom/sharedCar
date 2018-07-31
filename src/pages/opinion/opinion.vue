<template>
<div class="opinion">

  <textarea class="testarea" v-model="opinion" placeholder="请写下您对我们的意见或建议，我们会努力为您提供更好的服务。"/>

  <div class="subBtn" @click="opinionSave">提交</div>

  <div v-for="opinion in opinionList" :key="opinion.id" class="opinionList">
    <div class="time">{{opinion.createDate}}</div>
    <div class="content">{{opinion.content}}
    <div class="response" v-if="opinion.reply.id">
     <div class="resHead"></div> {{opinion.content}}
    </div>

    </div>

  </div>
</div>
</template>
<script>
  import http from '../../http'
  export default {
    "name": 'opinion',
    data(){
      return {
        opinion:'',
        opinionList:
        [
        ]
      }

    },
    methods:{
      transTime(stmp){
    var time = new Date(stmp*1);
    var now = new Date();
    var m = time.getMonth()+1;
    var d = time.getDate();

    if(now.getMonth()+1==m){
      if(time.getDate()==now.getDate()){
        return '今天'
      }
      if(time.getDate()==(now.getDate()-1)){
        return '昨天'
      }
    }
    return m+'.'+d;
  },
      opinionSave(){
       let data ={
         'conmessage': this.opinion
       }
        http.opinionSave(data,(res) => {
          http.getOpinionList((res) => {
            this.opinionList = res.data;
            for(var op of this.opinionList){
              op.createDate= this.transTime(op.CreateDate)
            }
          })
        })
      }
    },
    mounted(){

      http.getOpinionList((res) => {
        if(res.code==0){
       this.opinionList= res.data;
         for(var op of this.opinionList){
           op.createDate= this.transTime(op.CreateDate)
         }
        }

      })
    },
  onShow(){
      wx.setNavigationBarTitle({
        title: '意见建议'
      });
    }
  }
</script>
<style scoped>
  .resHead{
    background-image: url('data:image/png;base64,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');
    width:  25px;
    height: 25px;
    background-size: 100% 100%;
    float: left;
    margin-right: 16px;
  }
  .response{
    margin-top: 30px;
  }
  .content{
    font-size: 15px;
    border-radius: 2px;
    border: solid 0.5px #e0e6ec;
    padding-top: 18px;
    padding-bottom: 18px;
    padding-left: 16px;
  }
  .time{
    color: #596979;
    font-size: 11px;
    margin-top: 30px;
    margin-bottom: 23px;
    text-align: center;
  }
  .testarea{
    border-radius: 0px 2px 2px 2px;
    border: solid 0.5px #e0e6ec;
    font-size: 12px;
    padding: 20px;
    line-height: 1.5;
    box-sizing: border-box;
  }
  .opinion{
    padding-left: 17px;
    padding-right: 17px;
    box-sizing: border-box;
  }
  .subBtn{
    height: 44px;
    line-height: 44px;
    background-color: #34d073;
    text-align: center;
    margin-top: 26px;
    color: #ffffff;
    border-radius: 5px;
  }
</style>
