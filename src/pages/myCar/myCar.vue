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

                var lastCar= JSON.parse(JSON.stringify(res.data))
                for(let x=0,xl= res.data.length;x<xl;x++){
                  if(res.data[x]['eqDefault']==0){
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

          var lastCar= JSON.parse(JSON.stringify(res.data))
          for(let x=0,xl= res.data.length;x<xl;x++){
            if(res.data[x]['eqDefault']==0){
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
        }
        else{
          this.carList=[];
        }
      })
    },
    mounted(){
      http.getCarList( (res) => {
        this. carList=[
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
          var lastCar= JSON.parse(JSON.stringify(res.data))
          for(let x=0,xl= res.data.length;x<xl;x++){
            if(res.data[x]['eqDefault']==0){
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

          if(car.length==0){
            this.carList=[];
          }

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
  left: 50%;
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
    background-image: url(data:image/png;base64,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);
    background-size: 100% 100%;
    width: 166px;
    height: 167px;
    background-size: 100% 100%;
    margin:0 auto;
  }
  .left{
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAiCAYAAACOTf3NAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAmdJREFUaIHtmb9qVEEUh785CbFRIRCwFjYGsd5CswlWCrEykEYEBX0ALcR/DyDmGYwIYuWqKdKI5SYS4gtYpBCCmEYtrFyIWszs5t7ZmyxzZ2DjcD5YyJy953cO92OTu8QsLF7rGGNaxhiKLymepaJmBCP92roxZk7E1XvXurMUcmSgVzoi+/NFiv0ymCMGKfcj0pt/SG/VbOnv1hGRlp1/+KyK3t7OpXtQtff+PSzdu95+fQ/F3gEfcoAj50GAFvHEZIx6flY7SIIQ5QghwHqCnI2I3lHPz2qHcWAuQVAMo54P//EOz1eelc76KzczVGhmqNDMUKGZoUIzQ4VmhgrNDBWaGSo0M1RoZqjQzFChmaFCM2N81AtkiMH+5+QKMAs0gEn33k9gG/gIrAEd4G/K4So0HQLcBB5iJVZxyr1mgXtYuU+AF8CfVEso8ZwGNoEVDpZZRcP1bLqMaFRoPBeBLaAZkdF0GfOxy6jQOC4B74Epr94F2sB17CfvGHASOOtqbXdNkSngA3A5ZiEVWp8ZrJgJr74KnAOWgFfAF6y8X8BnV1ty17zzeidc5kzdpVRoPcaAl8CJQm0PuA9cxT7sDGMbWHQ9e4X6cZc9VmcxFVqPGwz+zXwELNfIWgYee7Um9ok5GBUajsF+NSnylnoyezwF3ni1B25WECo0nHnKX026wJ0EuXcpPyg1qPHUq0LDWfDObWAnQe4O8HrIrKGo0HAueOfVhNl+1vnQABUazrR33kqY/ck7nwkNUKHhTHrn3YTZ34bMGooKDed74edd4HfC7C5lqT9CA1RoOLexIr8Ct45a/j9yGFq2ho00oAAAAABJRU5ErkJggg==);
    height: 20px;
    width: 70px;
    display: inline-block;
    background-size: 100% 100% ;
    position: absolute;
    left: 10px;
    top: 7px;
  }
  .right{
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAZCAYAAADg8AqjAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAArdJREFUaIHt2s1rE0EYx/Fvt0VEBBG0GgItIlj1IG1KE4KI4tvBQ0DQiwfrIRYP4h/iH+DNkxdBUMhBBPHtJKk0iociBWsrVPGFol70YPJ4mEm7mWxeZnGzl2eh7GZ259Nf9pksu8kMzTy9AQIilEGKCHMIdURA2Pwj/NrZJ5H7yogUIcqL2G50dBCzXUYoImI9f2dz2/EaXbzoLFHHlGlgz5/Uuzr09b/a329LDcyxpck84WXErq8Bt4AhYCtwGagTf1EvJS8Aroc6A1wC7gJbYoZRL0UvAMZCnZvLBeBezFDqpegNZ2cLj4HfwGkHmgCmgfvAX49A8Txpa4nndXY6e9JHvn48Gfz5m9ibbekc2PVN4Crt1+lzQAXY5hFIvRS9ILR9G7gI/HGOOQM8BLZ7hlIvBS9wXj/AjIJfTvtx4BGwwzOUegP23IICPANOAl+d9qOY6/tOz1DqJehVXs+3eFEFBVgAjgGrTvsM8ATY5RlKvQS9Sm1+w+tUUIAlzChYdNqnbKhRz1DqJehVatVR6F5QgDXMyKg67UeA50DGM5R6CXqVhWqmV0EB1oErtD9LHQLueAZSL2Gvn4KOY26TR5z2VWAuRiD1EvR6FXQf8MKuw8sH4ASw7BlGvQS90nRhuVtB92Ou8+NO+3sbZsUzjHoJeqVcYQU63xQdwIyEMad9CfNQ+9EzjHoJeqVcfsOLKuhBzEjIOu3vMCNrzTOMegl6pal8i+cW9DDRt9OLNsxnzzDqDdgLF7T5bLTHOeat7fzFM4x6KXjNgk5ivr3Y7ex/A5wCvnmGUS8lLwByRH+/WLOdv3uGUS9FL8DMk3OnPLyyndc9w6Beul6A+RifBX7atpeYH1F/xAiDeul6w9nZAsAnzHNOBjhP+w+qvou/130uUP9e7zlF7Z78p/crgz9/7pyif4w/VP7OTtaAAAAAAElFTkSuQmCC);
    height: 20px;
    width: 70px;
    display: inline-block;
    background-size: 100% 100% ;
    position: absolute;
    right: 10px;
    top: 7px;
  }
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
