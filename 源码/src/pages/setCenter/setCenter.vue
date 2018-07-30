<template>
  <div class="setCenter" @touchend="touchend">

    <map
        show-location
        id="myMap"
        ref="map"
         class="map"
         @tap="bindtap"
         @regionchange="bindregionchange"
         @begin="regionChangeBegin"
         @end="regionChangeEnd"
         v-bind:latitude="latitude"
         v-bind:markers="markers"
         v-bind:circles="circles"
         v-bind:longitude="longitude"
         v-bind:show-location="show"
    >

      <cover-view class="controls">
        <cover-image class="img" src='data:image/png;base64,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' />
      </cover-view>
<cover-view class="lB" @click="moveTocenter">

  <cover-image  class="img"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEwklEQVRoQ+1a7ZXUOBBU2wEAERxEgJECuCWCgwiACGAjYIiAJQJmI7jdCJgLwMIXAbsRwAYgNa/8Wn7C6MPj2bkDHv47ttylrq5ulYfUEa+u6zosPwzDcKzX0LEW7rrupG3bD1jfOffoWCCOBkBrvSGi1wLg8TAMu2Ns1m8AuV39aTPQdd1dInrYNM0rpdQTAGTmDTPvmPnfYRi+3CaVboVCUJumaV4iYCK6WwqQmQFg670/v43CPgiAMeYZdpeI7q/ZVWa+IqLTvu8v1jyPZ1YBwI63bftWKXWSePElMwfdv5LfA8ATIvoz8czOOXe6JiN7A9BaPyei93EQzPyP0OKixnHUSNM0qA2sM4ERap1aa7f7ZGMvAFrrt0SE4hwvZr723j9fq/HYDKUUKPhHtObGWvtmKYjFALTWZ0SEQg3Xed/3COCgCxlp2/ZMKfUsAvHGWrtZsvAiAHPaMPOLfVNdC0Zr/YqIUFchu4veUQUQzzRCm0UL1wJO/R6DQE147zFDBSFILlkFYIzBQBbUpkqbruvut237lzwz9QQ0Mu/9ZU1pjDEo4kCnXd/3j0ubUQQQUwdd1Fo7jsepC4E3TfOaiGp1UZRMUakhFLZzrjgI1gB8Ck2qtJB04g+1LhwDL9XRrOaGvu8f5TYuCyDmPnTeWptqWioR/A0zn3nv0RPGhibZwfNzyczWk9YaWXiI50vniSyAGRefptq9pBtZGrkOoN77J6VmNpfjXGZn9H1nrZ36T5yNLACt9ecQmHPuXiqoeGSu1Uj80hmIZKGKGHySjbmy1j5I0SgJQJrLZ3ngsu/7cSyeX8YYTJZ3JM0PapI3A4FBbuzAOYrENOr7PhlrDsB0nmXmZFc0xgDU3xJUVV7n4JdQJM5UjmojAClEaPd4ERHkMhxGkgBi+iilkjVS0u84yzmRmFEU/WFqaqGnkIzGHwsvSwa3ZHdKAPCbMYblnqRUzjbpu+VAvR8CQE4AFgGIKDQVqlBopFSuBm6BQhg5gsok+8zsHec4wYU0hD7zaxTxnFw/iowaY1Cb4/y1l4xKgcUaX21ksEBF6qq2Sdzlcwo0a2TX1tqkcXDQKAGgcbMREE9zDU1GDxxLw8R645zrUvcv6ROj5Oekbiav2blc7oPvOXZkKXz4PrBKrpVSX9BxiSgc5GPfKNs/YvqsGuZkd+N2n53LpRFuw/RY03+l1A1ciZwftM85pHYemCwUSFhuoBIphl2Ccy2mxikbCTDnzrlNhWYfl5xDihQKL9Za74J/w8xba+2L2g5jTmLmDv2EmUEZUOxKtLtY5Frr96FGSueQaeypBTMfNY7hSESbNX1TAM1yBR7HXD3USy1848YdA4TWGufp2AtaNCAuAiAgvjG2ltJpQYZRO7G0YnyBxQizq3otBpABcZC7nHK39wl+URHPtyBl7kqRbp1z8H2KRSpjCgZFqFVs0xSlNZeKvTIQFhHdB6VSVvnAzKPfT0QjGFEifLmBM/GdtyRmAEzioguXArEKQFhI5BJAJne5StrohkPd7VUUSgUoGcF8g09MRTAIWil14b3f1mzGJZtxUAZyLxBTDIBGjxOHIu/9bu13hBKQowAQxfr9oft/o9AvkYGf/s8eyMJ/8Xebr/TpnN6nMNIJAAAAAElFTkSuQmCC"  ></cover-image>

</cover-view>

    </map>
    <div class="btn" @click="setCenter">确认</div>
  </div>
</template>
<script>
  //
  // polyline: [{
  //   points: [{
  //     "longitude":117.19937,
  //     "latitude": 39.085100000000025,
  //   }, {
  //     "longitude":117.19937,
  //     "latitude": 39.095500000000040,
  //   }],
  //   color:"#FF0000DD",
  //   width: 2,
  //   dottedLine: true
  // }],
  export default {
    "name": 'setCenter',
    data(){
      return {
        check: false,
        mapCtx: {},
        Xlatitude:0,
        Xlongitude:0,
        show:true,
        "longitude":117.19937,
        "latitude": 39.085100000000025,
        circles:[{
          "longitude":117.19937,
          "latitude": 39.085100000000025,
          "radius": 100,
          'color': '#13ec2b82',
          'fillColor':'#13ec2b21',
        }],
        markers: [],
      }
    },
    methods:{
      moveTocenter(){
        this.mapCtx.moveToLocation()
      },
      setCenter(){
        this.mapCtx.getCenterLocation({
          success: (res) => {
            var url = `../carInfo/main?latitude=`+res.latitude+'&longitude='+res.longitude
            wx.navigateBack();
            wx.setNavigationBarTitle({
              title: '编辑'
            });
          }})

      },
      touchend(){
        console.log("touchend");
        this.mapCtx.getCenterLocation({
            success: (res) => {

              // this.mapCtx.translateMarker({
              //   markerId: 1,
              //   autoRotate: false,
              //   duration: 0,
              //   destination: {
              //     latitude:  res.latitude,
              //     longitude: res.longitude,
              //   },
              //   animationEnd() {
              //     console.log('animation end')
              //   }
              // })

            }})
      },
      regionChangeBegin(e){
        this.check= true;

      },
      regionChangeEnd(e){
        console.log("12end");

      },
      bindtap(e){
        console.log("bindtap");

      },
      bindregionchange(e){
        console.log("bindregionchange");
      }
    },
    mounted(){
      this.mapCtx = wx.createMapContext('myMap');
      this.check= false;
      if(this.$mp.query.car){
          let car = JSON.parse(this.$mp.query.car);
          this.longitude= car.rolLongitude;
          this.latitude= car.rolLatitude;
        //  this.markers[0]={
        //   id: 1,
        //   "longitude": car.rolLongitude,
        //   "latitude": car.rolLatitude,
        //   iconPath: 'data:image/png;base64,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',
        //   name: 'T.I.T 创意园'
        // };
      }
    }
  }
</script>
<style scoped>
  .controls {
    position: relative;
    top: 50%;
    height: 50px;
    margin-top: -25px;
    display: flex;
  }
  .lB{
    position: absolute;
    top: 88%;
    left: 5%;
    display: inline-block;
  }
  .img {
    width: 40px;
    height: 40px;
    margin: 5px auto;
  }
  .setCenter{
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: #222931;
  }
  .setCenter {
    height: 100%;
    width: 100%;
  }
  .map{
    width: 400px;
    height: 90%;
  }
  .btn{
    height: 28px;
    line-height: 28px;
    position: absolute;
    bottom: 0;
    width: 90%;
    text-align: center;
    background-color: #34d073;
    border-radius: 10px;
    font-weight: 800;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 5%;
    font-size: 15px;
    color: #fff;

  }
</style>
