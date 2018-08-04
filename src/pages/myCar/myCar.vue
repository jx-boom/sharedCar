<template>
  <div class="myCar">
    <div class="swiperBg" v-show="carList.length!=0">
      <div class="car bgcar b1" :class="car.index"
           :key="car.id"
           :style="{transform:car.translate,opacity: car.opacity}"
           v-for="(car ,index) in carList"
           @touchstart="touchstart($event,car)"
           @touchmove="touchmove($event,car)"
           @touchend="touchend($event,car)"
      >
          <div class="quantily" v-show="car.first"></div>
          <div class="eqStatus" v-show="car.first&&car.eqStatus==0">{{car.electricity}}%</div>
          <div class="name" v-show="car.first">{{car.name}}</div>
          <div v-if="car.imeiId" class="checkRadioLine" v-show="car.first&&car.eqDefault==0">
           <!--<span class="checkBox"  v-show="car.first">-->
        <!--<i :class="{'show':car.eqDefault==0}"></i>-->
 <!--</span>-->
            默认监护车辆
          </div>
          <div  v-if="car.imeiId" class="editLine" v-show="car.first">
            <span class="fl" @click="editCar(car)" v-show="car.first">编辑</span>
            <span class="fr" @click="deleteCar">删除</span>
          </div>
      </div>

    </div>
    <ul class="outBox">
      <li class="inner" v-for="$index in indexList" :key="$index" :class="{fouce:$index==imeiId}"></li>
    </ul>
<div class="uncarBox" v-show="carList.length==0">
  <div class="uncar"></div>
  <div>
    <span class="unLine1">  <span class="left"></span> 你尚未添加车辆</span>
    <span class="unLine2" @click="addCar">现在添加  <span class="right"></span></span>
  </div>
</div>

    <!--<swiper-->
      <!--class="swiper"-->
      <!--:current= current-->
      <!--indicator-dots= true-->
      <!--circular= true-->
      <!--previous-margin="0px"-->
      <!--next-margin="0px"-->
      <!--display-multiple-items= 0-->
      <!--indicator-color=  "#fff"-->
      <!--indicator-active-color= "#54ea90"-->
      <!--@change="bindchange"-->
      <!--@touchstart="touchstart"-->
      <!--ref="swiper"-->
          <!--&gt;-->
      <!--<block v-for="car in carList" :key="car.id">-->
        <!--<swiper-item class="swiperItem">-->
       <!--<div class="car" :class="car.index" >-->
      <!--<div class="quantily"></div>-->
      <!--<div class="eqStatus">{{car.eqStatus}}</div>-->
      <!--<div class="name">{{car.name}}</div>-->
      <!--<div v-if="car.imeiId" class="checkRadioLine">-->
           <!--<span class="checkBox">-->
        <!--<i :class="{'show':car.eqDefault!=1}"></i>-->
 <!--</span>-->
        <!--默认监护车辆-->
      <!--</div>-->
     <!--<div  v-if="car.imeiId" class="editLine">-->
       <!--<span class="fl" @click="editCar(car)">编辑</span>-->
       <!--&lt;!&ndash;<span class="fr" @click="deleteCar">删除</span>&ndash;&gt;-->
     <!--</div>-->

    <!--</div>-->
        <!--</swiper-item>-->
      <!--</block>-->
    <!--</swiper>-->
    <div class="addBtn" @click="go('carInfo')" v-if="carNumber<4" v-show="carList.length!=0">添加车辆</div>
    <div class="addBtn satis" v-if="carNumber>=4">车辆已满</div>

  </div>
</template>
<script>
  import  http from '../../http'
  export default {
    'name': 'mycar',
    data(){
      return {
         current:1,
         imeiId: 0,
        indexList:[],
         startX:1,
         carNumber:0,
        distance:0,
         bga:'a',
         bgb:'d',
         bgc:'c',
        transList:[
          'translateX(8%) translateY(5%)','translateX(18%) translateY(15%)','translateX(28%) translateY(25%)','translateX(60px) translateY(35%)'
        ],
        transStrList:[
          'translateX(8%) translateY(',
          'translateX(18%) translateY(',
          'translateX(28%) translateY('
        ],
        transObjist:[
          {x:8,y:5},
          {x:18,y:15},
          {x:28,y:25}
        ],
        opacityList:[
          0.4,0.5,0.6,1
        ],
        carList:[]

      }
    },
    methods:{
      addCar(){
        if(!wx.getStorageSync('number')){
          wx.redirectTo({ url:`../login/main` })
          return
        }
        wx.redirectTo({ url:`../carInfo/main` })
      },
      touchend(e,car){
        if(Math.abs(this.distance)<130){
          this.carList[this.carList.length-1]['translate']= `translateX(60px) translateY(35%)`
        }
        else{
          let first= this.carList.pop();
          first.first= false;
          this.carList.unshift(first);
          this.carList[this.carList.length-1].first= true;
          this.carList[this.carList.length-1]['translate']= `translateX(60px) translateY(35%)`;
          this.carList[this.carList.length-1]['opacity']= `1`;
          this.imeiId= this.carList[this.carList.length-1]['imeiId'];
          for(let i=0,l=this.carList.length-1;i<l;i++){
            this.carList[i]['translate']=this.transList[i];
            this.carList[i]['opacity']=this.opacityList[i];
          }
        }
        this.distance=0;
      },
      touchmove(e,car){
        console.log(e);
        if(car.first){
        let distance= e.clientX-this.startX;
         let pase= Math.abs((distance / 13).toFixed(1));

          this.distance=distance;
          this.carList[this.carList.length-1]['translate']= `translateX(${60+distance}px) translateY(35%)`;
          for(let i=0,l= this.carList.length-1;i<l;i++){
            let x =(i+1)*0.3;
            this.carList[i]['translate']= this.transStrList[i]+(this.transObjist[i]["y"]*1 + pase*x)+'%)'

          }



        }
      },
      touchstart(e,c){
       this.startX= e.clientX;
        console.log(c);

      },
      moveBg(index){
        let bgList= ['a','d','c','d'];
        bgList.splice(index,1);
        setTimeout(() => {
          this.bga= bgList[0];
          this.bgb= bgList[1];
          this.bgc= bgList[2];
        },1000)
      },
      bindchange(event){
        // this.moveBg(event.target.current)
      },
      editCar(car){
        console.log("editCar");
        var url = `../carInfo/main?car=`+JSON.stringify(car);
        wx.navigateTo({ url });
        wx.setNavigationBarTitle({
          title: '编辑'
        });
      },
      setLast(car){
        car.eqDefaul=0;

      },
      deleteCar(car){

        http.delRollator(car.id,(res) => {
          if(res.code==0){
            http.getCarList( (res) => {
              this.carList=[
                { translate: 'translateX(8%) translateY(5%)',
                  opacity: 0.4,
                  'index':'b1 a','name':'暂无车辆','id':'1',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':false},

                { translate: 'translateX(18%) translateY(15%)',
                  opacity: 0.5,
                  'index':'b2 d','name':'暂无车辆','id':'1',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':false},

                { translate: 'translateX(28%) translateY(25%)',
                  opacity: 0.6,
                  'index':'b3 c','name':'暂无车辆','id':'3',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':false},

                { translate: 'translateX(60px) translateY(35%)',
                  opacity: 1,
                  'index':'b4 d','name':'暂无车辆','id':'4',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':0,'first': false}

              ]
              if(res.code==0){
                let car = res.data;
                if(res.data.length==0){
                  this.carList=[];
                  this.indexList=[];
                }


                for(let x=0,xl= res.data.length;x<xl;x++){
                  if(res.data[x]['eqDefault']==0){
                    var lastCar= JSON.parse(JSON.stringify(res.data[res.data.length-1]));

                    res.data[res.data.length-1]= res.data[x];
                    res.data[x]= lastCar;
                    break
                  }

                }

                for(let i=0,l=car.length;i<l;i++){
                  this.carList[i]['name']=car[i]['rollatorName'];
                  this.carList[i]['radius']=car[i]['radius'];
                  this.carList[i]['imeiId']=car[i]['imeiId'];
                  this.carList[i]['electricity']=car[i]['electricity'];
                  this.carList[i]['undisturbed']=car[i]['undisturbed'];
                  this.carList[i]['rolLongitude']=car[i]['rolLongitude'];
                  this.carList[i]['rolLatitude']=car[i]['rolLatitude'];
                  this.carList[i]['eqDefault']=car[i]['eqDefault'];
                  this.carList[i]['eqStatus']=car[i]['eqStatus'];
                  this.carList[i]['rollatorName']=car[i]['rollatorName'];
                  this.carList[i]['id']=car[i]['id'];
                }

                if(car.length<4){
                  this.carList[car.length-1]['translate']= this.carList[this.carList.length-1]['translate'];
                  this.carList[car.length-1]['opacity']= this.carList[this.carList.length-1]['opacity'];
                  this.carList[car.length-1]['first']= true;
                  this.carList.splice(car.length,10)
                }
                this.imeiId= this.carList[this.carList.length-1]['imeiId'];
                let indexList=[];
                for(var cars of this.carList){
                  indexList.push(cars.imeiId)
                }
                this.indexList=indexList
                this.carNumber= car.length;

                this.carList= JSON.parse(JSON.stringify(this.carList))
                console.log(this.carList);
                console.log("this.carList");
              }
              else{
                this.carList=[];
              }
            })
          }
        else if (res.code==1){
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }


        })
      },
      go(route){
        console.log("go");
        let car ={
          "rolLongitude": 116.38,
          "rolLatitude": 39.90,
          "rollatorName": '',
          "eqDefault":'1',
          "eqStatus":'0',
          "id":'',
          "imeiId":'',
          "radius":'',
          "undisturbed":'0'
        };
        var url = `../${route}/main?car=`+JSON.stringify(car);;
        wx.navigateTo({ url });
        let routerName= {
          'carInfo':'添加车辆',
         'indexhome': '护行'
        };
        wx.setNavigationBarTitle({
          title: '添加车辆'
        });
      }
    },
    onShow(){

        wx.setNavigationBarTitle({
          title: '我的车'
        });



      http.getCarList( (res) => {
        this.carList=[
          { translate: 'translateX(8%) translateY(5%)',
            opacity: 0.4,
            'index':'b1 a','name':'暂无车辆','id':'1',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':false},

          { translate: 'translateX(18%) translateY(15%)',
            opacity: 0.5,
            'index':'b2 d','name':'暂无车辆','id':'1',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':false},

          { translate: 'translateX(28%) translateY(25%)',
            opacity: 0.6,
            'index':'b3 c','name':'暂无车辆','id':'3',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':false},

          { translate: 'translateX(60px) translateY(35%)',
            opacity: 1,
            'index':'b4 d','name':'暂无车辆','id':'4',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':0,'first': false}

        ]
        if(res.code==0){
          let car = res.data;
          if(res.data.length==0){
            this.carList=[];
            this.indexList=[];
          }


          for(let x=0,xl= res.data.length;x<xl;x++){
            if(res.data[x]['eqDefault']==0){
              var lastCar= JSON.parse(JSON.stringify(res.data[res.data.length-1]));

              res.data[res.data.length-1]= res.data[x];
              res.data[x]= lastCar;
              break
            }

          }

          for(let i=0,l=car.length;i<l;i++){
            this.carList[i]['name']=car[i]['rollatorName'];
            this.carList[i]['radius']=car[i]['radius'];
            this.carList[i]['imeiId']=car[i]['imeiId'];
            this.carList[i]['electricity']=car[i]['electricity'];
            this.carList[i]['undisturbed']=car[i]['undisturbed'];
            this.carList[i]['rolLongitude']=car[i]['rolLongitude'];
            this.carList[i]['rolLatitude']=car[i]['rolLatitude'];
            this.carList[i]['eqDefault']=car[i]['eqDefault'];
            this.carList[i]['eqStatus']=car[i]['eqStatus'];
            this.carList[i]['rollatorName']=car[i]['rollatorName'];
            this.carList[i]['id']=car[i]['id'];
          }

          if(car.length<4){
            this.carList[car.length-1]['translate']= this.carList[this.carList.length-1]['translate'];
            this.carList[car.length-1]['opacity']= this.carList[this.carList.length-1]['opacity'];
            this.carList[car.length-1]['first']= true;
            this.carList.splice(car.length,10)
          }
          this.imeiId= this.carList[this.carList.length-1]['imeiId'];
          let indexList=[];
          for(var cars of this.carList){
            indexList.push(cars.imeiId)
          }
          this.indexList=indexList
          this.carNumber= car.length;

          this.carList= JSON.parse(JSON.stringify(this.carList))
          console.log(this.carList);
          console.log("this.carList");
        }
        else{
          this.carList=[];
        }
      })
    },
    mounted(){

      wx.setNavigationBarTitle({
        title: '我的车'
      });



      http.getCarList( (res) => {
        this.carList=[
          { translate: 'translateX(8%) translateY(5%)',
            opacity: 0.4,
            'index':'b1 a','name':'暂无车辆','id':'1',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':false},

          { translate: 'translateX(18%) translateY(15%)',
            opacity: 0.5,
            'index':'b2 d','name':'暂无车辆','id':'1',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':false},

          { translate: 'translateX(28%) translateY(25%)',
            opacity: 0.6,
            'index':'b3 c','name':'暂无车辆','id':'3',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':false},

          { translate: 'translateX(60px) translateY(35%)',
            opacity: 1,
            'index':'b4 d','name':'暂无车辆','id':'4',"lrolAtitude":'','rolLongitude':'',"radius":'','eqDefault':0,"electricity":0,"undisturbed":'','rollatorName':'','imeiId':0,'first': false}

        ]
        if(res.code==0){
          let car = res.data;
          if(res.data.length==0){
            this.carList=[];
            this.indexList=[];
          }


          for(let x=0,xl= res.data.length;x<xl;x++){
            if(res.data[x]['eqDefault']==0){
              var lastCar= JSON.parse(JSON.stringify(res.data[res.data.length-1]));

              res.data[res.data.length-1]= res.data[x];
              res.data[x]= lastCar;
              break
            }

          }

          for(let i=0,l=car.length;i<l;i++){
            this.carList[i]['name']=car[i]['rollatorName'];
            this.carList[i]['radius']=car[i]['radius'];
            this.carList[i]['imeiId']=car[i]['imeiId'];
            this.carList[i]['electricity']=car[i]['electricity'];
            this.carList[i]['undisturbed']=car[i]['undisturbed'];
            this.carList[i]['rolLongitude']=car[i]['rolLongitude'];
            this.carList[i]['rolLatitude']=car[i]['rolLatitude'];
            this.carList[i]['eqDefault']=car[i]['eqDefault'];
            this.carList[i]['eqStatus']=car[i]['eqStatus'];
            this.carList[i]['rollatorName']=car[i]['rollatorName'];
            this.carList[i]['id']=car[i]['id'];
          }

          if(car.length<4){
            this.carList[car.length-1]['translate']= this.carList[this.carList.length-1]['translate'];
            this.carList[car.length-1]['opacity']= this.carList[this.carList.length-1]['opacity'];
            this.carList[car.length-1]['first']= true;
            this.carList.splice(car.length,10)
          }
          this.imeiId= this.carList[this.carList.length-1]['imeiId'];
          let indexList=[];
          for(var cars of this.carList){
            indexList.push(cars.imeiId)
          }
          this.indexList=indexList
          this.carNumber= car.length;

          this.carList= JSON.parse(JSON.stringify(this.carList))
          console.log(this.carList);
          console.log("this.carList");
        }
        else{
          this.carList=[];
        }
      })
    }
  }
</script>

<style scoped>
  .uncarBox{
    height: 100%;
    background-image: linear-gradient(-45deg,
    #26303a 0%,
    #222931 100%);
    width: 100%;
    padding-top: 35%;
    font-size: 24px;
    color: #fffefe;
    text-align: center;
  }
  .outBox{
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translateX(-50%);
  }
  .inner{
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 3px;
    border: 1px solid #fff;
    margin-left: 20px;
  }
  .fouce{
    background-color: #fff;
  }
.swiperBg{
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  z-index: -1;
}

  .myCar{
    background-color: #222931;
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .a{
    background-image: url(https://app.ymai.net.cn/static/APPimage/car_01.png);
  }
  .b {
    background-image: url(https://app.ymai.net.cn/static/APPimage/car_02.png);
  }
  .c{
    background-image: url(https://app.ymai.net.cn/static/APPimage/car_03.png)}
  .d{
    background-image: url(https://app.ymai.net.cn/static/APPimage/car_04.png);}
  .car{
    width: 260px;
    height: 300px;
    border-radius: 3px;
    display: inline-block;
    background-size: 100% 100%;
    background-position: center center;
    text-align: center;
    color: #fff;
    position: relative;
    margin-bottom: 10px;
    transform:translateY(-10px);
  }
.bgcar{
  position: absolute;
  left: 20%;
  top: 10%;
  z-index: -1;
}
/*.b1{*/
  /*transform: translateX(8%) translateY(5%);*/
  /*opacity: 0.4;*/
/*}*/
/*.b2{*/
  /*transform: translateX(18%) translateY(15%);*/
  /*opacity: 0.5;*/
/*}*/
/*.b3{*/
  /*transform: translateX(28%) translateY(25%);*/
  /*opacity: 0.6;*/
/*}*/
/*.b4{*/
  /*transform: translateX(38%) translateY(35%);*/
  /*opacity:1;*/
/*}*/

.name{
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 25px;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
.swiper{
    height: 300px;
    margin-top: 35%;
  }
.addBtn{
    height: 44px;
    margin-left: 34px;
    margin-right: 34px;
    background-color: #34d073;
    border-radius: 8px;
    line-height: 44px;
    color: #ffffff;
    text-align: center;
    margin-top: 50px;
    position: absolute;
    bottom: 50px;
   width: 250px;
   left: 53.5%;
  transform: translateX(-170px);
  }
.satis{
    background-color: #313a43;
    opacity: 0.5;
    color: #686e74;
  }
  .swiperItem{
    text-align: center;
  }


  .checkBox{
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAABBlJREFUaIHN2UmMVFUUxvEfJZFRBAERNQahxeBCEEhQUQlGScCwEnYaN05thKjBDa5dOAWECEpijGGpbjS2G8AgaqeiIrhwwKYTDREQFAfU1kBwcU5RTXdVd1UPVf0llXdvvXfP+det++5wzqhisWiQmow78nMjrsHlmJD3/8LP+BFfYR/24rfBOB01QPAxWIP7cDcuqrP9WezCTryNf+sFqBd8HFrxFK7K7/5DOz4UPXoIR3E670/ETMwV/8hy3IKL8/5PeAnb8c9wgK/EVszJ+pd4VfTYr7UaSU3BWjyKm/K7w1iHD2oxUKjhmbHYhjYBfRD3YBF2qB8aTmXbRViVNuekj23pc1DgM8TL1IouMUQWp4NzAwDuqXOihxfjyfTRik/Sd1X1BT4bH6fRDjEuN+HM4Hl76Qw2p48OLEzf11ZrUA38auxGCz7DrTgwlKRVdAA3o5i+9yRLL1UCH493MSsN3IkTw0FZRb/grvQ9K1nG93yoEvhm8aZ3YLXytNZInU7fHcnycs8HeoKvwkPiJVmrsT3dUyeSoQsPCrbz6g4+FluyvFFjxnR/OoBnsrxVt2myO3ir8jy9tWFo/WuLWJFnC0aUwcdgQ5Y3Gp4pb6A6I5jgadnrJfA1uFIs4zUtuQ1Wm2CbiXspg9+f11cMzYo41Don2EjWUcVicTJOir9kBn5vDlu/uhTHMRrTClgm9tNFIxeaYCsK1mUF3JY39jQNqXaVGG8vYF5WDjYJph6VGOcVcF1WDjUJph6VGFsKuCIrx5sEU49KjNMKmJSVP5sEU49KjBNrObqNSBXwR5YvaSZIjSoxni7gWFb6POONEJUYTxbwfVbmNgmmHpUYOwr4NivzmwRTj0qM3xRE+IE4W450Lc/rvoIIQJ7FErGRGamaJCIAZ/FRQURNdykHMkeq1grG3ThVmsd35vWxpiDVptKxbSflg8Q7IsK6ECuaANWfVog441ERZD0P3oUXsvyc2KyPFI3G81l+UbBecMrfjk4sEOHekaJ1YhrsFJFcXAjepQz8rPgBzdZ8wQLrZW/TO5LVhtdF5uEtTG8EXRVNF+N5HN7A+91vVtodrhcRpBa8p5yEaqQmpO+WZHm85wOVwP8WAccfxKK0G1OHj7GXpqbPJcmwOpkuULX9+BGxBehMA+0aM+YX4NP02ZkMRyo92NdBohNLsV+cS9vxhOGZKken7XaxA9yfvjurNejvBHQsDewQMbtN+Fxk4IZKK9PmpvTxWvo81lejWo5uXXhEZNoOiymqTfTKw7hsALBTsu0XaWt+2l4lUohd1ZuGBpqg3SACkPRO0H6ncoL2epUTtEfFijhsCdruKu0kHxAv0EBS4nvwpgalxCtpiog/LsUNIgA/Q/Q00fPHxYv2tchh7hVJ2gHrf1XB7kts43YWAAAAAElFTkSuQmCC');
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    background-size: 100% 100%;
    display: inline-block;
    transform: translateY(3px);
  }
  .show{
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAVZJREFUOI21079LHEEUAODvoggSFCGFWogWQppcnUpIFIsjkCIQiZ21Sv6AFA4LEWzF/0AhaGOIBpI0iSkEU6e9ShARtbEVcil2Fo/zfmY3D7aYN/PmY3ffK9VqNXkiSZKWeyGEMg7w/kEupU2EECo4xhTW/gsUQljBZwzhDHP9BQN92MRKTJ3hWZIk1cKgEMIwdlFpRKAQKIQwiUOUmyFQytt1eIpPGG2FQN5mWMCPTkgGDWBV75/xHfYw2AnJoHVs4TvGugAGsB3rsmiLkP6jU0zE9TleSwetWTzCR8z0gpC+0Swu4nocR3jb5OxjnDQgl90gGVTFPK5jrl86dB/wMOaeR2S6rvYKc90gGQS/8QI3dXuL8fINfMNIAzIb67qK+k77hZf44q6TnsSnPnpGuD9HP/EKty3O/xPSDIKveIM/RSGtINjHUlFIOwh2sCydrVwI/AVBomsbJasTuAAAAABJRU5ErkJggg==);
    width: 12px;
    height: 8px;
    display: inline-block;
    background-size: 100% 100%;
    margin-bottom: 2px;
  }
  .checkRadioLine{
    position: absolute;
    bottom: 35%;
    left: 20%;
    width: 60%;
    font-size: 18px;
  }
  .editLine{
    position: absolute;
    bottom: 15%;
    left: 20%;
    width: 60%;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
    padding: 5px;
  }
  .eqStatus{
    width: 25px;
    height: 12px;
    font-size: 12px;
    left: 48px;
    top: 18px;
    position: absolute;

  }

  .quantily{
    width: 25px;
    height: 12px;
    border-radius: 2px;
    display: inline-block;
    position: absolute;
    left: 20px;
    top: 20px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAaCAYAAAAT6cSuAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAWlJREFUWIXd2LFq21AUxvGfhLOVkLprFg8l9A3SDuniN+jcLX2CLoV28RI6dejasXNbaLbUi8FD3qCBTCZbB5O4pkMWdbh3kLEIIZZkdP9wQOIcpO/jnHsvUlYUBTzFRwyxqxssMMY7XMJoNFopyHGAKSYYIOtIDKLmafSwRo6TGJ/xBN9wg6KhqIt51Pwp6l+jJ4ziG8H9OfZqFNAGX/ChKtET1tg8FnXNGEH7o6pEXroetqOlPcrmurJL3pusCGdBpt7Ffuc7G3hmsbz9t/bcvKoyFVIzd4WfeEZ6Y3mLHeGcfp6aubKHHymbW6a25lZI2dyv1MZyZUNJrXN/cIoX+N3bspi62S/fJDOWyKq+xJOlbG6xNRUNUTY33pqKhsiFjvXxHtfblfMg+lhWJXKhY69xgUN8x9/WpG3OMc6qEj2hYxNhx/mKV+3p2ojHQlPe4mVVQS507CgWzDT3S6/umEXNR9HDGv8Bab+rsslB/RYAAAAASUVORK5CYII=);
    background-size: 100% 100%;
  }
  .uncar{
    background-image: url(https://app.ymai.net.cn/static/APPimage/tcar.png);
    background-size: 100% 100%;
    width: 166px;
    height: 167px;
    background-size: 100% 100%;
    margin:0 auto;
  }
  /*.left{*/
    /*background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAiCAYAAACOTf3NAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAmdJREFUaIHtmb9qVEEUh785CbFRIRCwFjYGsd5CswlWCrEykEYEBX0ALcR/DyDmGYwIYuWqKdKI5SYS4gtYpBCCmEYtrFyIWszs5t7ZmyxzZ2DjcD5YyJy953cO92OTu8QsLF7rGGNaxhiKLymepaJmBCP92roxZk7E1XvXurMUcmSgVzoi+/NFiv0ymCMGKfcj0pt/SG/VbOnv1hGRlp1/+KyK3t7OpXtQtff+PSzdu95+fQ/F3gEfcoAj50GAFvHEZIx6flY7SIIQ5QghwHqCnI2I3lHPz2qHcWAuQVAMo54P//EOz1eelc76KzczVGhmqNDMUKGZoUIzQ4VmhgrNDBWaGSo0M1RoZqjQzFChmaFCM2N81AtkiMH+5+QKMAs0gEn33k9gG/gIrAEd4G/K4So0HQLcBB5iJVZxyr1mgXtYuU+AF8CfVEso8ZwGNoEVDpZZRcP1bLqMaFRoPBeBLaAZkdF0GfOxy6jQOC4B74Epr94F2sB17CfvGHASOOtqbXdNkSngA3A5ZiEVWp8ZrJgJr74KnAOWgFfAF6y8X8BnV1ty17zzeidc5kzdpVRoPcaAl8CJQm0PuA9cxT7sDGMbWHQ9e4X6cZc9VmcxFVqPGwz+zXwELNfIWgYee7Um9ok5GBUajsF+NSnylnoyezwF3ni1B25WECo0nHnKX026wJ0EuXcpPyg1qPHUq0LDWfDObWAnQe4O8HrIrKGo0HAueOfVhNl+1vnQABUazrR33kqY/ck7nwkNUKHhTHrn3YTZ34bMGooKDed74edd4HfC7C5lqT9CA1RoOLexIr8Ct45a/j9yGFq2ho00oAAAAABJRU5ErkJggg==);*/
    /*height: 20px;*/
    /*width: 70px;*/
    /*display: inline-block;*/
    /*background-size: 100% 100% ;*/
    /*position: absolute;*/
    /*left: 10px;*/
    /*top: 7px;*/
  /*}*/
  /*.right{*/
    /*background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAZCAYAAADg8AqjAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAArdJREFUaIHt2s1rE0EYx/Fvt0VEBBG0GgItIlj1IG1KE4KI4tvBQ0DQiwfrIRYP4h/iH+DNkxdBUMhBBPHtJKk0iociBWsrVPGFol70YPJ4mEm7mWxeZnGzl2eh7GZ259Nf9pksu8kMzTy9AQIilEGKCHMIdURA2Pwj/NrZJ5H7yogUIcqL2G50dBCzXUYoImI9f2dz2/EaXbzoLFHHlGlgz5/Uuzr09b/a329LDcyxpck84WXErq8Bt4AhYCtwGagTf1EvJS8Aroc6A1wC7gJbYoZRL0UvAMZCnZvLBeBezFDqpegNZ2cLj4HfwGkHmgCmgfvAX49A8Txpa4nndXY6e9JHvn48Gfz5m9ibbekc2PVN4Crt1+lzQAXY5hFIvRS9ILR9G7gI/HGOOQM8BLZ7hlIvBS9wXj/AjIJfTvtx4BGwwzOUegP23IICPANOAl+d9qOY6/tOz1DqJehVXs+3eFEFBVgAjgGrTvsM8ATY5RlKvQS9Sm1+w+tUUIAlzChYdNqnbKhRz1DqJehVatVR6F5QgDXMyKg67UeA50DGM5R6CXqVhWqmV0EB1oErtD9LHQLueAZSL2Gvn4KOY26TR5z2VWAuRiD1EvR6FXQf8MKuw8sH4ASw7BlGvQS90nRhuVtB92Ou8+NO+3sbZsUzjHoJeqVcYQU63xQdwIyEMad9CfNQ+9EzjHoJeqVcfsOLKuhBzEjIOu3vMCNrzTOMegl6pal8i+cW9DDRt9OLNsxnzzDqDdgLF7T5bLTHOeat7fzFM4x6KXjNgk5ivr3Y7ex/A5wCvnmGUS8lLwByRH+/WLOdv3uGUS9FL8DMk3OnPLyyndc9w6Beul6A+RifBX7atpeYH1F/xAiDeul6w9nZAsAnzHNOBjhP+w+qvou/130uUP9e7zlF7Z78p/crgz9/7pyif4w/VP7OTtaAAAAAAElFTkSuQmCC);*/
    /*height: 20px;*/
    /*width: 70px;*/
    /*display: inline-block;*/
    /*background-size: 100% 100% ;*/
    /*position: absolute;*/
    /*right: 10px;*/
    /*top: 7px;*/
  /*}*/
  .unLine1{
    display:inline-block;
    margin-top: 75px;
    width: 100%;
    text-align: center;
    position: relative;
  }
  .unLine2{
    display:inline-block;
    color: #35d074;
    width: 100%;
    text-align: center;
    position: relative;
  }
</style>
