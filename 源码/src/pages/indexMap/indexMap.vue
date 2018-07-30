<template>
  <div class="indexMap">


    <map class="map"
         @bindtap="bindtap"
         @bindregionchange="bindregionchange"
         :latitude="latitude"
         :markers="markers"
         :circles="circles"
         :longitude="longitude"></map>
  </div>
</template>
<script>
  import http from '../../http'
 var that= null;
  export default {
    "name": 'indexMap',
    data(){
      return {
        "longitude": 116.38,
        "latitude": 39.90,
        markers: [],
        circles:[]
      }
    },
    methods:{
      bindtap(e){
        console.log(e);
      },
      bindregionchange(e){
        console.log(e);

      }
    },
    onShow () {
      that= this;
      wx.getStorage({
        key: 'TOKEN',
        success: function(res) {
          console.log("登录成功跳转 获得车辆列表");
          http.getCarList( (res) => {
            if(res.code==0){
              let circles= [];
              let markers= [];
              for( var car of res.data){
                markers.push({
                  id: car.id,
                  "longitude": car.rolLongitude,
                  "latitude":car.rolLatitude,
                  iconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3M0I1ODZEOTkyRUIxMUU4QTNCOTg0NjgxN0YwOUY0MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3M0I1ODZEQTkyRUIxMUU4QTNCOTg0NjgxN0YwOUY0MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjczQjU4NkQ3OTJFQjExRThBM0I5ODQ2ODE3RjA5RjQzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjczQjU4NkQ4OTJFQjExRThBM0I5ODQ2ODE3RjA5RjQzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VMyphQAACyBJREFUeNqcWAtY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',
                  name: car.rollatorName
                })

                circles.push(
                  {
                    "longitude": car.rolLongitude,
                    "latitude": car.rolLatitude,
                    "radius": car.radius*1000,
                    'color': '#13ec2b82',
                    'fillColor':'#13ec2b21',
                  })

              }
              that.circles=circles;
              that.markers= markers;

              that.longitude= res.data[0]['rolLongitude']
              this.latitude= res.data[0]['rolLatitude']
            }})
        },
        fail: (res) => {
          console.log("登录失败");
          console.log(res);
          wx.getLocation({
            type: 'wgs84',
            success:  (res) => {
              wx.setStorageSync('unplace', false);
              that.longitude=  res.longitude;
              that.latitude= res.latitude;
              that.markers=[
                {
                  id: 0,
                  longitude: res.longitude,
                  latitude: res.latitude,
                  iconPath: 'data:image/png;base64,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',
                  name: '我的位置'
                }
              ];
              that.circles=[{
                "longitude":  res.longitude,
                "latitude": res.latitude,
                "radius": 100,
                'color': '#13ec2b82',
                'fillColor':'#13ec2b21',
              }]

            },
            fail: function (res) {
              wx.setStorageSync('unplace', true);
            }
          });
        }
      })
    },
    mounted(){
      that= this;
      wx.getStorage({
        key: 'TOKEN',
        success: function(res) {
          console.log("登录成功跳转 获得车辆列表");
          http.getCarList( (res) => {
            if(res.code==0){
              let circles= [];
              let markers= [];
              for( var car of res.data){
                markers.push({
                  id: car.id,
                  "longitude": car.rolLongitude,
                  "latitude":car.rolLatitude,
                   iconPath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3M0I1ODZEOTkyRUIxMUU4QTNCOTg0NjgxN0YwOUY0MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3M0I1ODZEQTkyRUIxMUU4QTNCOTg0NjgxN0YwOUY0MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjczQjU4NkQ3OTJFQjExRThBM0I5ODQ2ODE3RjA5RjQzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjczQjU4NkQ4OTJFQjExRThBM0I5ODQ2ODE3RjA5RjQzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VMyphQAACyBJREFUeNqcWAtY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',
                  name: car.rollatorName
                })

                circles.push(
                  {
                    "longitude": car.rolLongitude,
                    "latitude": car.rolLatitude,
                    "radius": car.radius*1000,
                    'color': '#13ec2b82',
                    'fillColor':'#13ec2b21',
                  })

              }
              that.circles=circles;
              that.markers= markers;

              that.longitude= res.data[0]['rolLongitude']
              this.latitude= res.data[0]['rolLatitude']
            }})
        },
        fail: (res) => {
          console.log("登录失败");
          console.log(res);
          wx.getLocation({
            type: 'wgs84',
            success:  (res) => {
              wx.setStorageSync('unplace', false);
              that.longitude=  res.longitude;
              that.latitude= res.latitude;
              that.markers=[
                {
                  id: 0,
                  longitude: res.longitude,
                  latitude: res.latitude,
                  iconPath: 'data:image/png;base64,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',
                  name: '我的位置'
                }
              ];
              that.circles=[{
                "longitude":  res.longitude,
                "latitude": res.latitude,
                "radius": 100,
                'color': '#13ec2b82',
                'fillColor':'#13ec2b21',
              }]

            },
            fail: function (res) {
              wx.setStorageSync('unplace', true);
            }
          });
        }
      })
    }
  }
</script>
<style>
  .indexMap{
    height: 100%;
    width: 100%;

  }
  .indexMap .map{
    height: 100%;
    width: 100%;
  }
</style>
