<template>
  <div class="bg carInfo">
   <div class="info">
     <div class="carName">{{carName}}</div>
     <div class="setCarName">
       <span class="label">设置车辆名称:</span>
       <input  type="text" v-model="car.rollatorName" />
     </div>
     <div class="setCarName">
       <span class="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编号:</span>
       <input  type="text" v-model="car.imeiId" />

     </div>
     <!--<button open-type="openSetting">打开授权</button>-->
     <div class="setRance"><span class="label">护栏中心:</span>  <i class="center" @click="goSetCenter"></i>
       <!--<input type="digit" class="centerInput"/>-->
       <span class="label secondLab">护栏半径:</span>
       <input
         @blur="change"
         type="digit"
         style="padding-left: 10px;transform:translateY(-2px)"
         v-model="radius"
         class="intNum"/>
       <div class="inputPLace">KM</div>
      </div>
    <div class="radioLine">
    剩余电量 {{car.electricity}}% <div class="box"></div>  勿扰模式: <switch checked @change="changeSwitch" /></div>
     <div>
   <span class="checkBox" @click="setM">
   <i class="check" :class="{'show':car.eqDefault==0}"></i>
 </span>
   设为默认 </div>
      <div
       class="saveBtn"
       @click="go('myCar')"
     > 保存 </div>
   </div>
  </div>
</template>
<script>
  import  http from '../../http';

  export default {
    "name": 'carInfo',
    "data"(){
      return {
        carName:'智能车',
        radius: 0,
        car: {
          "rollatorName": '',
          "eqDefault":'1',
          "eqStatus":'0',
          "id":'',
          "imeiId":'',
          "radius":'',
          "rolLatitude":'',
          "rolLongitude":'',
          "undisturbed":'0'

        },
        isM: true,
        name: null,
        code: null,
        undisturbed: 0,
        radius: '',
        eqDefault: '',
        isLast: true
      }
    },
    onShow(){
      this.carName= '智能车';
      if(this.$mp.query.car!=null){
        let car = JSON.parse(this.$mp.query.car)
        this.car=  car;
        this.carName=  this.car.rollatorName?this.car.rollatorName:'智能车';
      }
      else{
        this.carName= '智能车';
      }
      if(this.$mp.query.latitude!=null){
        this.car.rolLatitude=this.$mp.query.latitude;
        this.car.rolLongitude=this.$mp.query.longitude;
      }
    },
    "methods":{
      change(r){
        this.radius=Number(this.radius).toFixed(2)
      },
      changeSwitch(){
        car.undisturbed= car.undisturbed=0?1:0;
      },
      goSetCenter(){
        let car = JSON.stringify(this.car);
        console.log(car);
        var url = `../setCenter/main?car=`+car;
        wx.navigateTo({ url });
        wx.setNavigationBarTitle({
          title: '设置中心'
        });
      },
      go(route){
        let data = JSON.parse(JSON.stringify(this.car));
        data.name=data.rollatorName;
        data.latitude=data.rolLatitude;
        data.longitude=data.rolLongitude;
        data.radius= this.radius;
        delete data.rolLatitude;
        delete data.rolLongitude;
        delete data.first;
        delete data.lrolAtitude;
        delete data.translate;
        delete data.opacity;
        delete data.id;
        delete data.index;
        delete data.rollatorName;
        data.radius= Number(this.radius).toFixed(2);
        console.log("data");
        http.addCar(data,(res) => {
        if(res.code!=0){
          wx.showToast({
            title: '编辑失败',
            icon: 'none',
            duration: 2000
          });
          return
        }
          var url = `../${route}/main`;
          wx.redirectTo({ url });
          wx.setNavigationBarTitle({
            title: '我的车'
          });

        });

      },
      setM(){
        this.car.eqDefault= this.car.eqDefault==0?1:0;
      },
      setLast(){
        this.isLast= !this.isLast;
      },
      switch1Change(bol){
        console.log(bol);
      },
      switch0Change(bol){
        console.log(bol);
      }
    },
    "mounted"(){
      this.carName= '智能车';
      if(this.$mp.query.car!=null){
            let car = JSON.parse(this.$mp.query.car)
              this.car=  car;
              this.radius= this.car.radius;
        this.carName=  this.car.rollatorName?this.car.rollatorName:'智能车';
      }
      else{
        this.carName= '智能车';
      }
       if(this.$mp.query.latitude!=null){
       this.car.rolLatitude=this.$mp.query.latitude;
       this.car.rolLongitude=this.$mp.query.longitude;
      }
    }
  }
</script>
<style scoped>
  .secondLab{
    margin-left: 15px;
  }
  .intNum{
    width: 50px;
    float: left;
  }
  .bg{
    background-image: url(https://app.ymai.net.cn/static/APPimage/carinfo.png);
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    position: fixed;
  }
.carInfo{
  font-size: 16px;
}
.input{
  display: inline-block;
}
.setRance{
  text-align: left;
  margin-bottom: 40px;
  overflow: hidden;
}

.center{
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABOCAYAAAA0Cah9AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAE6lJREFUeJztnU2MJMlVx38vIrOqu7qnd/ZjPLvaFaz2w4AvNpZYxAGBOACWLGSEzIdswQUkDkhgIQ5IXPaED0gcfOAGsswFyVjIErSMjDhwYqU1sviQsWYXY3u/ZmenZ6Y/qqsqIx6HFxGZWdU90z3bnSUtfqOaysrMqoh878X7in9Ey2w25+133qZyUyabFTHCjddvfQz4NPDTwJOA5wd0EbQP/Bfw98BXXnrppenLL79cLlaggCIifPvGrWvAF4BfBWQdvf1/QB8FfgP47iuvvPI54Cv5ghwfH/PW229x852bzwH/BDwrIkw2R4zGFd45RARRJSIoAuKQ9O5cOkYQEbxzOO9QwInDe49zjqryjMdjRC5OxjFGAFQVVS3Hy9fKMQoKMZoCRo1UvmJzcxPnHIvFgv39ffsNETSCarTv2Y/Zd1VBIGpE7HT69fxZ7Z2s0fYbGpVFE5gezVg0IT/GH+/u7n6+COOb3/zmBvAq8JG6rnnsscep6xpxxmzvPCIgYoz26bxzkt7b13mYrarM53Pm83lh6DKD7WUPG2M8kfHtObtXNRZW5GsCIGrX1I5jiIgb8fTTTzMajTg4OOTNN/+XjRGIc5DULJMIWSyUx0wHiilsfn6HgEu32In8EYC79465vXeUP356d3f3y1VVVQB/CHxkPB7z4osfpq4r03LvH0qTM5PANDSEgPce7z2qymKxoK5rYozcuXOHu3fv4pwrzBZZ1fYYleWu5L4lRe0YVknK02eipGvOGZtDjBAWRQGquqLytWm85rt7LVLEkR9RrR+qJpCWCe295XzLFqp6i+1t4eDgEOALn/jEJ/6hevXVVz3wewDPPvssk8nmqYzNmptfqkrTNIXh+XzTND1NDyFw/fp1JpNJGQ1Z0OPxmK2tLbxvYwRjpBRWOGcP21WMrmAyM5aF1L0/DS6cE6KCE8pvJoVkVNdc+9BTNCEUwfWlcbJiuqVRsnx324/V/r/22mscH0+fBH6tAn4ceHI0GlHXNQcHB4QQeq9lAZz2gtZWi0jyFRWj0agwW0SKjRYRdnZ22NnZWWFk76Eu0M/cj5xzXLmyPUhbmZ588jrf+c53AH6xAp7PF95++22g7wRN67R0Npub7JhbB10Vv5G1Pr/yeaCYv0z5/Em07BvuR/1bTr+/e5+qmskS1zF55kv0hN/Q8t95KT9Hv22Auh7lUy9WwKN2smYymfSY3GV6l5n5lT/fj6Er3UqmK39nOp1ydHQEYs4y9nucHHKOTnTpt1Yfrv/wJzA0n1NQbBRfvXqV7e0rAOzv73P3zh7FRHXNdHpf6edpgjv9cjnZNE0+UVXpt5lMJly/ft0aO2dEFGJEOybMTJoSVQlNwHthMpngnCvMf/TRR/Hec3Q0ZW/vNlXlyHFJIWkdX+/acvdk6fTy56V7u+dnM+XgYMTW1nb6PGM2nzLZ9DgHSV7tD+Yg6SRfcg5rmm+dL9rnrcrFTmQSYyDGLmMzo0mfkx8JgSZGVO1YYyCqOWxJetw0kdFoTF3XjMdjQggllAULISsPO1up/a6TXnmEU0bgKUy4H2+sGQt1QzDl8d7yoco7NjfcSmDQ+90L8mPdEVaEcXw84913b5XOqbZMVw1mKjRFbElDJcWTThQnFqlUHvw4R0QwmwmzRSQE+072F10/ZH5kZVxcLuVQVBQIrXKIT6Yx3XZCh/S0Cw/TjXiCMBbzY46O7qQwzWJx55TKO7w3Rme9zNp7UiQOnfgeqCpl0Wh+BLz3ZaQBePGWnS6F70OQiCmDjYwIeETchWn9eakIo66FqzsOjQBiSVLuU5sxAUvs11UG9mN+Kxt0Q95s+gAkJWBLTQxGXpSgrWOwzHs9vSnCQEC134EHBAwPJgHvAY0dM7CUGKXkLgZwa6gNO2dRWn48J6kIsgZ5FI/YHQQXaSqy78gjAcw09IQjjqC6lpHhRIgai+2W1OEQ9aLcwtn7kg+WQuoLJimmIOcsPQfuHCHqeuwUQFQ0tv0DR9TVWthlUxsrXmrDltVCm4GHEMpnIfuqNVAKWEIRhuCcJ4ThLdXZU+f3SRrb+hXQM1PSrU2vhVJp3XqEiEOzvR5QGsMII0VUpdFULrdjK6esUxYq/QKnpImlTsF8ELpcYeTqhQiawtlcy8q5xrIPGZ4ssA7RzGZWjqjD+7BLFYbmBBIIMaBRizC6zBdxRROH9uGSQtnY8WHOeWIq0cqAOnL5ZipljxrbsrRlvaFUb89T9b0MEtFSi7PoLhuo5cmly6VL5UJ+JOesINYNZ7sO3Dl/4vzBUCRIPw8S934mLx6aLtdMaa7/ABoTKqMtibTCWVeCkZI8p4QQyjSsrGmkDtKqzTeHEj52HTgMN626TNlteZcL/u3IXUcGOojP8D5DZuzUMvOzz1hHQCWSlCWGjnDWPTIuiREqpnlyQuU2kyVZVhLRgRUym1HrT8enrcGLFWFcVsPZiUd0KZyVUhJxTpKA1lOeElE0QgjdxM8RA4P68OrBt1wEqaVWvQiqUxYTg41alj6wOHLJQ2LPp+ViYZWnN077up4yF6XQJimrufxJJnkgYbSoEKCXhefPIq5XMjkLHeqcbzTf52Y84FHZ5OP1M1yVzft+ZxWVmEBoSon2rL9CEyJ1tTqv0wELEgPENMEWg+FNJD9vnr1c1rGoZba0adpnHkwYfbPklupTzmL7M9aDDnTGF47+hb+b/TtzCoAYh/AL4x/hDyY/w3V3pfedXN0oWKz0n4qyaCJNWDWbR0eB+cx16oVpGJR80GoGiiQAeLo34bAqb0qWnzEHLt45JOGX5/MFt2/fAwYUBtICl3MxrlssFOdIM773lcZ78ZDf2f8b/ifcXrkWUXZn3+KVxff4i61f4Xn/RLqiNEFoGrXSeEczHUKkYjyui+ms65qrV6+yWDQ45xFnbHficd4mn4R2ltJyE0sWW3xvPs5AvoQYWBqaR0cF/DyQMERQzYkeK8IQcqVUi/KVr3YOVOGPDr56oiC69F485HMHX+Uvq99kTI2IS0x1jMY1VVVRVR7vq4KENJiOscM5x9WrVy+UBcuI+Wz6QhzYTImAL+FjRNK6jVK59d4gMhhAIYZ2DUU7r6D88/w1/q1540xtvqF3+NrGDX575+cKKjJrqB3DacFChrRm5cn9aKPB/ue8HCFELZUGY3h7HGO7RkM1lOebzeel3WFGhubwMRIjVJWNhIxWFxGch9lxw3QKi0aIKqi6tqQijn9c3DhXs19f/Ce/v/XJlfMF8ZjK+hkn5r0t6AHY3z/g8PCgMBBoi53aWSciyezl5yTBUEXNl6Shnpc6iGR+pKUJWuCdAzpwhEibWGWmgPmM8WjM9GiDRaioRmZK6qrCOU9V14zqijffuAezs7f5+vwd5vM5MRoENYRAs1jQNA0h2MuWNDTECDs7j3Dt2jVUlePjKYcH9xiN0sotQJzgHXhngGntFHaV7NBJPiWPulz57S68kaJk83kb4l+6MHKj4vvFwYxUz593dna4cuWK2XY5uV4VOF/oexznvPXWW1YXIxQ9cMXhwuaGoRkPp7GYJWcIPqoadrYdqn0c2TKk6WHopNxkkJGhCl6EJirZX+V1GyXc837pO1rmPPI6kWfkMb7Fm2du91n3OJWfU9eOurJFMrYWUQyqSsuUylmeo0nHvaT+dEzLZdNwDrxSmLeVW6AHgG6ahqOjI5qmFUCzaIxBGoix4SfjM3yd/zhzuz+/8WEmm1nIQq9SnxisRSLWZg5z8sLR+2FuL5oGK086AaU1UzFGZrNZ+TydHnPz5jvs373J4eEtZrM9YjhE9BjvFmyOlU9t/xjP+8fP1N5jbsKvjz9eQMwnvTIJqbJcoicQ51buu2wavFYcO5rXzcJB0zoOzyNXKq5sVWxvO7a2HJMNRz1yVM7zZ9u/xBNu675tTKTm81uf5IqMz9QnS+isD/0JL0eMwwmkRRQOUp/r16d6iV8qIcRoCWL76s+APusf5693PsvPjl44sYWPVU/zxZ3P8BP1D52/d0pbLMwY4AFBIsVnXLr0U01nGVlYNNHnSmnDg3bHuO6u8Ofbn+L78Q6vLL7LXpyy48Z8tHqaD/trD93FbjEzV25DaKj9MIjsAfMMoy4kpls8FFwpqp2VnnFXeWZ8OWWLjAH+APsMLWXyXJ4ompjMQgj3+fplUoqoWrNppZmc2A1Bwwgj1Zfy0oCTKre+ypXN4ZcGGL+t3tQ0bZlf+KCOjAQXjGnifzmaEskwz8F6dCK1I9UqvUN2aBBhdCcfuxP/3XJIXqSyTjh62z+rQw0Njh/QZ0hZ31cqtd08QwQn7kLqPg/VOyeIU2LMAYbDpZWvQ9FgwhAB751tBdF5woK5LUi+9QA98xRqnn/Ixc0hadBoykk7+QL08gzIsf16zJRVcbVTEaDjwIfp06DC8B6itrFrdzceSOHtGsxUnk2svKYAo801Snl3ABpUGBa390siXYEYKMFMxVrWaTgrh2T9cM4hOlyEtxZQaQ+i0wWzuWy319Ero14114kpx0BtDzsyIM0hdMFi7UjxYnPfccCsd7l/qrGtEnQ2DBiikDr4yLgfstA5bxstxvU4ccWa7vbHKrcfQAeeJ+djNETEShbuPIgfzCys9C4lne0CfRm0JDIcohCK6cnbHeViYa7ceped+qC96ncvzb2D5UWkNeEuD9gzmKsOvKrY5uUIuQWxtScHFYYkQEB3OZl1rBNKJujgRRdGHmTzSzWm0x8rZmY/IoQyZPv7ipTDdF+MQgwtql7VMFTaLQGrWYnQtB0bdmRY9QfVPgB6GRD9ICmcBAZcZXZ7osAp1Xa50870ob1lUIRtUrZoumZUmM4MLahRieqSgKDspICUWpaVUQTnHZW3ORpxLu2cnTZj9laE9E6Yzebc3rsDDCwMxWL5XAI5berVGMGKUFQhxJyHpX8xX+tHaF0KMU3nojaVG0upsrSrCedfVa4sI/Pes7W1jXMVzhvznPPpOO9wnXe+9jYFkNDpXexXd4PNFZ7oOsyUGIMz5ra7O0JTNNFCydk84CvD3Ga2A2h0NLE1bartjqKqLQNUDZYjziUkoKMaVWnrPodzeUdrSaA5Az7nkbAMgH7kETr9Oz+1m2q2ewBHtdLQ8XELkTyXME4S7n3ww6kjGMKioeBWo/Sn87qh7nhcM1+MmM1tY9E89MUJrvZsiEtb9nXAzJ392TNju6MsQ/pzG+d75uw3OoxMymRFxc5xfj61iMy22wtlJzqNSREJBguKStOcAnw+rZ8xthAbg66YzTUznAxxMgFtCJG0GYjR/ICKIzTCyPedZHe7o52dHba3t/G+KqjxvLIp/+z7ScC6u1ZnALShVlom1nXFxsYGYPvuHh4eGXRf290+TQixCMOcR1h6+tTfVOKis/1h5QRXCV2sQxFG0yiHh01hIJ0fi9lZISg51DOTYpNCZiedWDRkEH/rljiXyuOCT/ve1XVV4Jze+2IWgIICP5XShE/eGGZ1u9c+ND+jzVuIfuzA83O2bRotKItFw2Rrm6eeegqAg4MD7tx5j/HIkdHjQMHqWgAoeCdpRK72V/JB1uD2JLQDo7tHYYX47ZIVS2asSzt5pj/XkLXUeYM/tusdjOHO+SSos1HG3GZaNA2L+YIYQ8pHoq2VS4wM6e9XaBn60YSTtnslF/pEEY2oxISvLbzpmVZbNWVLEipv28LG0C/rb244treqFRTistKeGAT2zkvvfO+djjAmkwlPPnW9rCK6yF0Lcmhp7zYHXlVViaQMtm+buhwdHLK3dxsllhDSSUSkn5eXqKv4lARyIK178AZetn1J+tR7Mi0hv+3+EwygrRpLKBqiY9FY8NH52oVTb8dnf8r2mRlpZ8jw2GplNguhay4UjcGiB03QnLSYJKoSQ8A5x4c+dI3xeEz+Ew9ZGPZ5weZEGFVp9HmPk7ZvxRtJ65hVV7U1Bw8rz3PCiWw9zMflHaBbMFueKr7M6kBFslqz2Yzbt/dapmosU6SaIwXycTSnndY5d/9ai4imKcxgGtppzGYxI/OZY7EIjMeUze9byI6nqjy1h7qSgltarR3Kiml4v3zqZCqEGMvyM7N+l19KrsAWPEynR9y7dzst2UrlCYnkDZDNztoik2yCs2PKFi2bCctGq3SubUzEdiFoDqQz8X9CSUScjURKojwciSWHMQSoa/KK1svqQmj903sV8G2w9RGTTbXIR9pk6UyuQ3tv7ekc8XUoqjmC7gRTfxmyST9y+Zq4TNlvkMsnpX8O7ay9u0iaHi/y4X+7H33xideAb8SoHB7ObNOVpPbZ5j7wlcLf09Y/LD+wmZ1uMU5KFi75L53p0KKwfmXl69bLgEvpT4zK3XvH+ePfumSL/xTg1ntHHM8vRwMyZTMYQ1NKItA1UynBG35gFC+u6c9OWH/OVrx8GLr57n7ePOZfga87gBeee+LLwF+pKm+8eZf9g3MsKX1Iir0dbLpmKi28JA7rKxIZijAFKd3+XWBnFk3gzbfucnA4B7gDfHZ3d1e75ZDfBUYx6mfeubnP7b0jJps1dX2+JO7BpBzPlUW4h2LhYt6yIa/xO5pOEeYsFs2wO0GLmY7ZHPb0DvNZ6s/RFHRu69Yfsj+KBS/Hs4bpdJ7N+DvAL+/u7t4AkL33XuvF4jdev/VbwMvAD7+vB/sB3Y8C8CXgT3Z3d8uWDytV2xeee+KLN16/9SXgp4CXgGeAYf9e2geTGuAmcAP42gvPPXFr+Yb/AzIrIn6svZaCAAAAAElFTkSuQmCC');
  width: 49px;
  height: 38px;
  background-color: #fbffd8;
  border-radius: 2px;
  border: solid 1px #c9c9c9;
  display: inline-block;
  float: left;
}
.setCarName{
  margin-top: 40px;
  margin-bottom: 60px;
}
.label{
  float: left;
  color: #7d8185;
  padding-left: 5px;
  padding-right: 5px;
  text-align: right;
}
.carName{
  text-align: right;
  font-size: 16px;
  margin-top: 5px;
  margin-right: 2px;
  font-size: 18px;
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  float: right;
}
span{
  display: inline-block;
}
.grey{
  color: #7d8185;
}
.checkBox{
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAABBlJREFUaIHN2UmMVFUUxvEfJZFRBAERNQahxeBCEEhQUQlGScCwEnYaN05thKjBDa5dOAWECEpijGGpbjS2G8AgaqeiIrhwwKYTDREQFAfU1kBwcU5RTXdVd1UPVf0llXdvvXfP+det++5wzqhisWiQmow78nMjrsHlmJD3/8LP+BFfYR/24rfBOB01QPAxWIP7cDcuqrP9WezCTryNf+sFqBd8HFrxFK7K7/5DOz4UPXoIR3E670/ETMwV/8hy3IKL8/5PeAnb8c9wgK/EVszJ+pd4VfTYr7UaSU3BWjyKm/K7w1iHD2oxUKjhmbHYhjYBfRD3YBF2qB8aTmXbRViVNuekj23pc1DgM8TL1IouMUQWp4NzAwDuqXOihxfjyfTRik/Sd1X1BT4bH6fRDjEuN+HM4Hl76Qw2p48OLEzf11ZrUA38auxGCz7DrTgwlKRVdAA3o5i+9yRLL1UCH493MSsN3IkTw0FZRb/grvQ9K1nG93yoEvhm8aZ3YLXytNZInU7fHcnycs8HeoKvwkPiJVmrsT3dUyeSoQsPCrbz6g4+FluyvFFjxnR/OoBnsrxVt2myO3ir8jy9tWFo/WuLWJFnC0aUwcdgQ5Y3Gp4pb6A6I5jgadnrJfA1uFIs4zUtuQ1Wm2CbiXspg9+f11cMzYo41Don2EjWUcVicTJOir9kBn5vDlu/uhTHMRrTClgm9tNFIxeaYCsK1mUF3JY39jQNqXaVGG8vYF5WDjYJph6VGOcVcF1WDjUJph6VGFsKuCIrx5sEU49KjNMKmJSVP5sEU49KjBNrObqNSBXwR5YvaSZIjSoxni7gWFb6POONEJUYTxbwfVbmNgmmHpUYOwr4NivzmwRTj0qM3xRE+IE4W450Lc/rvoIIQJ7FErGRGamaJCIAZ/FRQURNdykHMkeq1grG3ThVmsd35vWxpiDVptKxbSflg8Q7IsK6ECuaANWfVog441ERZD0P3oUXsvyc2KyPFI3G81l+UbBecMrfjk4sEOHekaJ1YhrsFJFcXAjepQz8rPgBzdZ8wQLrZW/TO5LVhtdF5uEtTG8EXRVNF+N5HN7A+91vVtodrhcRpBa8p5yEaqQmpO+WZHm85wOVwP8WAccfxKK0G1OHj7GXpqbPJcmwOpkuULX9+BGxBehMA+0aM+YX4NP02ZkMRyo92NdBohNLsV+cS9vxhOGZKken7XaxA9yfvjurNejvBHQsDewQMbtN+Fxk4IZKK9PmpvTxWvo81lejWo5uXXhEZNoOiymqTfTKw7hsALBTsu0XaWt+2l4lUohd1ZuGBpqg3SACkPRO0H6ncoL2epUTtEfFijhsCdruKu0kHxAv0EBS4nvwpgalxCtpiog/LsUNIgA/Q/Q00fPHxYv2tchh7hVJ2gHrf1XB7kts43YWAAAAAElFTkSuQmCC');
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  background-size: 100% 100%;
  display: inline-block;
}
  .check{
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAS1JREFUOI211LsuREEABuAPi2yERoFKI1GpFSIuG4VWgUaiRhRKNQ8gPAGJ0ChcQhCXjkZDuZVERPAEElGcObHZXcdu9uyfTDJnMpPvzLUhe9GqjhnAIdYa6ghNYh/teG6sE7KI44C8IJc21IStUBoDMop8JkWkA3uiJVOIQFpQL45Em1+CEE2v1gziPglJA5rGNbqSkBhqwZLql3FVdHyz/yExtI5NXKG7AqAF22FcnEQkhmZCfRgPGEpAOnGJuWqQGBrHW/juwQ2Wy/Ttx134oTjvlSAxlMcEPkNbBhvYRVtoGwtIX8HYD+QqQaDwrRvEuejixXnCCVbQXISM47ESpBiCEZz6PUnlUjVC6T26xRS+0kTKQXCGWXynhfwFwQHm00KSINjBAl5rReAHThhIZPtmbZAAAAAASUVORK5CYII=');
    width: 12px;
    height: 8px;
    display: inline-block;
    background-size: 100% 100%;
    opacity: 0;
  }
  .info{
    padding-left: 30px;
    padding-right: 30px;
    position: absolute;
    bottom: 60px;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    height: 74%;
  }
  .saveBtn{
    width: 210px;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-weight: 600;
    font-size: 20px;

    border-radius: 10px;
    display: inline-block;
    background-color: #34d073;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-105px) translateY(22px);
  }
  .show{
    opacity: 1;
  }
  .box{
    display: inline-block;
    width: 40px;
  }
  .radioLine{
    margin-bottom: 30px;
  }


  .inputPLace{
    float: right;
    transform: translateY(2px);

  }
  .centerInput{
    width: 50px;
    display: inline-block;
  }
</style>
