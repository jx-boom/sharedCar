<template>
  <div class="userNotes">
<div class="tit">用户须知</div>
    <div>{{content}}</div>

    <!--<div class="line">本《益迈智能车租赁协议》（以下简称“本协议”）由以下双方根据《中华人民共和国合同法》等相关法律法规签署并遵照执行。</div>-->
    <!--<div class="smalTit">一、定义</div>-->
    <!--<div class="line">本《益迈智能车租赁协议》（以下简称“本协议”）由以下双方根据《中华人民共和国合同法》等相关法律法规签署并遵照执行。本《益迈智能车租赁协议》（以下简称“本协议”）由以下双方根据《中华人民共和国合同法》等相关法律法规签署并遵照执行。本《益迈智能车租赁协议》（以下简称“本协议”）由以下双方根据《中华人民共和国合同法》等相关法律法规签署并遵照执行。</div>-->
    <!--<div class="smalTit">二、租车条件</div>-->
<!--<div class="line">本《益迈智能车租赁协议》（以下简称“本协议”）由以下双方根据《中华人民共和国合同法》等相关法律法规签署并遵照执行。本《益迈智能车租赁协议》（以下简称“本协议”）由以下双方根据《中华人民共和国合同法》等相关法律法规签署并遵照执行。本《益迈智能车租赁协议》（以下简称“本协议”）由以下双方根据《中华人民共和国合同法》等相关法律法规签署并遵照执行。本《益迈智能车租赁协议》（以下简称“本协议”）由以下双方根据《中华人民共和国合同法》等相关法律法规签署并遵照执行。</div>-->
 <!---->
 <!---->


  </div>
</template>

<script>
  import  http from '../../http';

  export default {
    data(){
      return {
        content: '',
      }
    },
  mounted(){

    http.getAgreement(1,(res) => {
      if(res.code==0){
        this.content=  res.data[0]['content'];
      }

    })

  }
}
</script>
<style scoped>
  .userNotes{
    padding-left: 17px;
    padding-right: 17px;
    box-sizing: border-box;
    overflow: auto;
    margin-right: -10px;
  }
   .tit{
     text-align: center;
     font-weight: 600;
     font-size: 18px;
     margin-top: 17px;
     margin-bottom: 17px;
   }
  .smalTit{
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 17px;
  }
  .line{
    font-size: 15px;
    color: #6b7177;
    line-height: 1.5;
    margin-bottom: 28px;
  }
</style>
