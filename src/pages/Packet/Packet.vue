<template>
    <div class="packet">

   <div class="zzBox" v-show="showZZ" @click='showZZ=!showZZ'>

     <div class="zz">
         <div>支付开发中</div>
         <!--<div class="ls">账户余额：{{// money}}元</div>-->
         <div class="ls">暂不支持支付</div>
     </div>

   </div>

   <div class="unrech" v-show="money==0">

       <div class="mq">0元</div>
   </div>

   <div class="rech" v-show="money!=0">

       <div class="mq">{{money}}元</div>
   </div>
   <div class="recharge">
<div class="balance">账户余额：{{money}}元</div>

<div class="flexBox">

<div class="rechBtn" :class="{check:fouce=='5'}" @click="rechClick(5)" v-show="t1">{{t1}}</div>


<div class="rechBtn ml"  :class="{check:fouce=='10'}" @click="rechClick(10)"  v-show="t2">{{t2}}</div>

<div class="rechBtn ml"  :class="{check:fouce=='20'}" @click="rechClick(20)" v-show="t3">{{t3}}</div>
</div>

<div class="flexBox">
<div class="rechBtn"  :class="{check:fouce=='50'}" @click="rechClick(50)" v-show="t4">{{t4}}</div>

<div class="rechBtn ml"  :class="{check:fouce=='100'}" @click="rechClick(100)" v-show="t5">{{t5}}</div>

<div class="rechBtn ml"  :class="{check:fouce=='200'}" @click="rechClick(200)" v-show="t6">{{t6}}</div>

</div>
<div class="surerech" @click="toRech">立即充值</div>

 </div>


    </div>
</template>
<script>
  import http from '../../http'
export default {
    "name": 'packet',
    "methods":{
        toRech(){
        this.money+=this.fouce*1;
        this.showZZ= true;

        },
        rechClick(num){
     this.fouce= num;

        }
    },
    "data"(){
    return {
        money: 0,
        fouce: 5,
      t1:null,
      t2:null,
      t3:null,
      t4:null,
      t5:null,
      t6:null,
        showZZ: false
    }
    },
   onShow(){
    wx.setNavigationBarTitle({
      title: '卡包充值'
    });
  },
    "mounted"(){
      http.moneyPay((res) => {
        console.log(res.data);
        this.t1= res.data[0]['name'];
        this.t2= res.data[1]['name'];
        this.t3= res.data[2]['name'];
        this.t4= res.data[3]['name'];
        this.t5= res.data[4]['name'];
        this.t6= res.data[5]['name'];
      })
    }
}
</script>
<style>
.zz{
    position: absolute;
    left: 50%;
    top: 40%;
    color: #ffffff;
    z-index: 4;
    transform:  translateX(-50%);
    font-size: 25px;
    text-align: center;
}
.ls{
    font-size: 20px;
    margin-top: 6px;
}
.zzBox{
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);

}
  .surerech {
    width: 320px;
	height: 44px;
    line-height: 44px;
    display: inline-block;
	background-color: #34d072;
	border-radius: 10px;
    color: #ffffff;
    font-size: 20px;
    margin-top: 20px;
}
.recharge{
transform: translateY(-40px);
text-align: center;
}
.balance{
    margin-left: 26px;
    margin-bottom: 44px;
    color: #ffffff;
}
.flexBox{
    display: flex;
    justify-content: left;
    margin-bottom: 10px;
    padding-left: 7%;
}
.ml{
    margin-left: 10px;
}
.packet{
background-color: #313a43;
height: 100%;
width: 100%;
  position: fixed;
}
.rechBtn{
    width: 102px;
	height: 67px;
    background-color: #e3e3e3;
    color: #313a43;
	border-radius: 5px;
    text-align: center;
    line-height: 67px;
    display: inline-block
}
.check{
    background-color: #34d072;
}
.mq{
    position: absolute;
    left: 45px;
    bottom: 70px;
    font-size: 17px;
    color: #313a43;
    display: block;

}
.unrech{
   position: relative;
   background-image: url(https://app.ymai.net.cn/static/APPimage/moneyPay.png);
	 height: 300px;
   background-size: 100% 130%;
   background-position: center center;
   background-repeat: no-repeat;
}
.rech{
    position: relative;
    background-image: url(https://app.ymai.net.cn/static/APPimage/monePayOk.png);
	  height: 300px;
    background-size: 100% 130%;
    background-position: center center;
    background-repeat: no-repeat;
}
</style>


