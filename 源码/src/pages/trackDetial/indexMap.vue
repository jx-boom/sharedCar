<template>
  <div class="indexMap">


    <map class="map"

         :markers="markers"
         :polyline="polyline"
         :latitude="latitude"
         :longitude="longitude"></map>
  </div>
</template>
<script>
  import http from '../../http';

 var that= null;
  export default {
    "name": 'trackDetial',
    data(){
      return {
        "longitude": 116.38,
        "latitude": 39.90,
        polyline: [
        ],
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
    onShow() {
      console.log('onShow');
      this.markers=[];
      this.polyline=[];
      let data ={
        imeiId: this.$mp.query.imeiId,
        date: this.$mp.query.date
      };
      http.getTrackDetial(data.imeiId,data.date,(res) => {
        if(res.code==0){
          let list =res.data;

          for(let i=0,l=list.length;i<l;i++){
            let $list = list[i];
            let poly  =   {
              points: [

              ],
              color: "#ff6600",
              width: 2,
              dottedLine: false,
              arrowLine: true,
              borderColor:"#000",
              borderWidth:5
            };

            for(let x=0,xl=$list.length;x<xl;x++){
              poly.points.push(
                {
                  "longitude": $list[x]['longitude'],
                  "latitude":$list[x]['latitude']}
              )
            }
            this.polyline.push(poly);
            this.markers.push({
              id:  this.markers.length,
              "longitude": poly.points[0]['longitude'],
              "latitude":  poly.points[0]['latitude'],
               iconPath : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdlJREFUeNrsWDFOw0AQtBGidk1lSrrwApwXQF5A/AP8AuIXmB8k+YF/kPACX0cJFbVrKuakjXRC3N7e+kyVlVax7PV5PLc7u06WnY23XHPT9fdtiZ9H+D28gC/okoGP8Dd4/3X1/jkrIALyAl8Lb9nB2xhgeQQYC6IjRmLMMtYA1C4ZIIDZRrDiZQug6lDQhQDMJgEYa2us9TyJISxQ4eeQuJCWYOqoZWg7Q2V3qi0DO7asy8Di9k1XeOPcuj2mc5wtaO1ohp4CC9cAYenvTyfssT1nrwXufdAAqgIV4y1jusaVeRxDJICc3rSCXOFiCnqGmCEud4xEeSnGMCGlSoc8yjtHLAtoVObWlFg/INBtBH0tmxLjE0duyzhQHR5YMGCKgAAaTdnvuSqBD9Ra/mo3Q6BK99G9jN7yQzBuGEedK2dY4xL9Bls2aprrhgaylFZzohoCVBD9ZSIwR2otunmIaG0SstNodcgFZZtnnwBMG5KTmBFWmuDqrYpqHbR1KyWYUTCOxPcyUtZWWVXpP4Oc7TtE9KhXgIkqCg0gsWACzF2qbh/Kp6Ugb1Q5p5mHTtNAnSpvJgMKzM2tO/j/y78fv3JqcBqqWG98dpniS9T5oKyzs81sPwIMAKiGqxlyuc2gAAAAAElFTkSuQmCC',
              name: 'a'
            });
            this.markers.push({
              id:  this.markers.length,
              "longitude": poly.points[poly.points.length-1]['longitude'],
              "latitude":poly.points[poly.points.length-1]['latitude'],
             iconPath : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdlJREFUeNrsWMFNw0AQtBHi7QqQ+fEMFeBUAKmAuANcAXEFpoMkHbiDhAp8T34gKvCbF3PSRjohbm9vfeaVlVax7PV5PLc7u06WnY23XHPT+/VViZ9H+D28gC/okoGP8Dd4f/v1/TkrIALyAl8Lb9nB2xhgeQQYC6IjRmLMMtYA1C4ZIIDZRrDiZQug6lDQhQDMJgEYa2us9TyJISxQ4eeQuJCWYOqoZWg7Q2V3qi0DO7asy8Di9k1XeOPcuj2mc5wtaO1ohp4CC9cAYenvTyfssT1nrwXufdAAqgIV4y1jusaVeRxDJICc3rSCXOFiCnqGmCEud4xEeSnGMCGlSoc8yjtHLAtoVObWlFg/INBtBH0tmxLjE0duyzhQHR5YMGCKgAAaTdnvuSqBD9Ra/mo3Q6BK99G9jN7yQzBuGEedK2dY4xL9Bls2aprrhgaylFZzohoCVBD9ZSIwR2otunmIaG0SstNodcgFZZtnnwBMG5KTmBFWmuDqrYpqHbR1KyWYUTCOxPcyUtZWWVXpP4Oc7TtE9KhXgIkqCg0gsWACzF2qbh/Kp6Ugb1Q5p5mHTtNAnSpvJgMKzM2tO/j/y78fv3JqcBqqWG98dpniS9T5oKyzs81sPwIMACXvreQSMXmSAAAAAElFTkSuQmCC',
              name: 'b'
            })
            this.longitude= poly.points[0]['longitude'];
            this.latitude= poly.points[0]['latitude'];
          }

        }
      })

    },
    mounted(){
      console.log('onShow');
      this.markers=[];
      this.polyline=[];
      let data ={
        imeiId: this.$mp.query.imeiId,
        date: this.$mp.query.date
      };
      http.getTrackDetial(data.imeiId,data.date,(res) => {
        if(res.code==0){
          let list =res.data;

          for(let i=0,l=list.length;i<l;i++){
            let $list = list[i];
            let poly  =   {
              points: [

              ],
              color: "#ff6600",
              width: 2,
              dottedLine: false,
              arrowLine: true,
              borderColor:"#000",
              borderWidth:5
            };

            for(let x=0,xl=$list.length;x<xl;x++){
              poly.points.push(
                {
                  "longitude": $list[x]['longitude'],
                  "latitude":$list[x]['latitude']}
              )
            }
            this.polyline.push(poly);
            this.markers.push({
              id:  this.markers.length,
              "longitude": poly.points[0]['longitude'],
              "latitude":  poly.points[0]['latitude'],
              iconPath : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdlJREFUeNrsWDFOw0AQtBGidk1lSrrwApwXQF5A/AP8AuIXmB8k+YF/kPACX0cJFbVrKuakjXRC3N7e+kyVlVax7PV5PLc7u06WnY23XHPT9fdtiZ9H+D28gC/okoGP8Dd4/3X1/jkrIALyAl8Lb9nB2xhgeQQYC6IjRmLMMtYA1C4ZIIDZRrDiZQug6lDQhQDMJgEYa2us9TyJISxQ4eeQuJCWYOqoZWg7Q2V3qi0DO7asy8Di9k1XeOPcuj2mc5wtaO1ohp4CC9cAYenvTyfssT1nrwXufdAAqgIV4y1jusaVeRxDJICc3rSCXOFiCnqGmCEud4xEeSnGMCGlSoc8yjtHLAtoVObWlFg/INBtBH0tmxLjE0duyzhQHR5YMGCKgAAaTdnvuSqBD9Ra/mo3Q6BK99G9jN7yQzBuGEedK2dY4xL9Bls2aprrhgaylFZzohoCVBD9ZSIwR2otunmIaG0SstNodcgFZZtnnwBMG5KTmBFWmuDqrYpqHbR1KyWYUTCOxPcyUtZWWVXpP4Oc7TtE9KhXgIkqCg0gsWACzF2qbh/Kp6Ugb1Q5p5mHTtNAnSpvJgMKzM2tO/j/y78fv3JqcBqqWG98dpniS9T5oKyzs81sPwIMAKiGqxlyuc2gAAAAAElFTkSuQmCC',
              name: 'a'
            });
            this.markers.push({
              id:  this.markers.length,
              "longitude": poly.points[poly.points.length-1]['longitude'],
              "latitude":poly.points[poly.points.length-1]['latitude'],
              iconPath : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdlJREFUeNrsWMFNw0AQtBHi7QqQ+fEMFeBUAKmAuANcAXEFpoMkHbiDhAp8T34gKvCbF3PSRjohbm9vfeaVlVax7PV5PLc7u06WnY23XHPT+/VViZ9H+D28gC/okoGP8Dd4f/v1/TkrIALyAl8Lb9nB2xhgeQQYC6IjRmLMMtYA1C4ZIIDZRrDiZQug6lDQhQDMJgEYa2us9TyJISxQ4eeQuJCWYOqoZWg7Q2V3qi0DO7asy8Di9k1XeOPcuj2mc5wtaO1ohp4CC9cAYenvTyfssT1nrwXufdAAqgIV4y1jusaVeRxDJICc3rSCXOFiCnqGmCEud4xEeSnGMCGlSoc8yjtHLAtoVObWlFg/INBtBH0tmxLjE0duyzhQHR5YMGCKgAAaTdnvuSqBD9Ra/mo3Q6BK99G9jN7yQzBuGEedK2dY4xL9Bls2aprrhgaylFZzohoCVBD9ZSIwR2otunmIaG0SstNodcgFZZtnnwBMG5KTmBFWmuDqrYpqHbR1KyWYUTCOxPcyUtZWWVXpP4Oc7TtE9KhXgIkqCg0gsWACzF2qbh/Kp6Ugb1Q5p5mHTtNAnSpvJgMKzM2tO/j/y78fv3JqcBqqWG98dpniS9T5oKyzs81sPwIMACXvreQSMXmSAAAAAElFTkSuQmCC',
              name: 'b'
            })
            this.longitude= poly.points[0]['longitude'];
            this.latitude= poly.points[0]['latitude'];
          }

        }
      })

    }
  }
</script>
<style>
  .indexMap{
    height: 100%;
    width: 100%;
    position: fixed;
  }
  .indexMap .map{
    height: 100%;
    width: 100%;
  }
</style>
