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

        wx.setNavigationBarTitle({
          title: '行迹详情'
        });

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
            console.log(poly);
            this.polyline.push(poly);
            this.markers.push({
              id:  this.markers.length,
              "longitude": poly.points[0]['longitude'],
              "latitude":  poly.points[0]['latitude'],
              "iconPath": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADJ0lEQVRoQ+1YTVITURD+OjCDcWNcWBWyMSy0JivhBIYTiCcQTiCeIHAC4QTiCcQTiCcwrDKlC8fNhCo3wwbDTJi2XiI6hPl5782bUFhkm/e6v6/76+7XQ7jlP7rl+HFH4KYzeJeB/yoDTXbaiPCcmDZA3CDQKjMHIHgEeDFwNLJGHwPyAlPEjUhIAK9F6AG0KQEsAPHe2eJo3wSR0gSaobNZA72TAD57JIgwXv9pf+tr3P17pRSB5bCzR8DrMgBi8NaJ7R7o2tAmsBx2tgl4q+s4eS8mXj+x3CMdW1oEmpHTrTF90nGYcSeILV47IddTtalFoBU6fYCeZTvjYzAOsRBP9M3xQheMDSI8zrnz3rddmSZwxYQygaKiZeDN0B7spQEtqpnY4hXVLCgTWD7vHBLhRWokaxcv/cWvh3kyaJ07OyDqpZ3JI59lU5lAK3QCgB5cN8jSEsiRYN+3B2sqdaBE4FH4ZNXC4pc0BxHGa7I9PU+Gvj1QwqR0OK/7qDg2ZUcE8mYITJ4e9D0tk2fWr4cqTwxjBFQc31gGRMRaYYd1O9Dlvex2yse+7a5WVsTCcFYbZWZvuOSuFDlvcLtxP6oL+TRmzzKwP7QH20U2kv8rSUhczB9kfODb7lYWgD/gxRMkNcpzGWRTEPe89FkAMPiICbuzjzNBnBg9ImqnDzH+PLTdrkr0lbtQsYb/uReSEpvY1AmJiF+TTBKs7rNaWUITGeW0QdUIivPM+DFcGqRmpsieFoFpN3IOAHpV5EDmf93oa0vIZBbKRL8UgUkWcl6WMpEXZ8pEvzSBoo5URIKh13lKzYFZUGV24zK78CUO7SJOEileMVM7v/T+kJdJIwTUl3w+PbNGbZVXZxYJIwSE8aJ9NwlAZ3WsnIBsQZsoXKNFfKUWxk83EC98yNOszoOt8hpIOsj9asG86y+5O0XtVeV/YzVw6TRbSurLigwR4wQmE/qalPg0wkVX9quFDHCjcyDNYfKxZ7LrzPqqJAPCiZBSPaz3QezpLCqyWaiMgAAgPoRFVuSZGFiVzwHZiJk+V2kGTINNs3dHYB5RnusknjehWy+h3+zCZEAipqVuAAAAAElFTkSuQmCC',
              name: 'a'
            });
            this.markers.push({
              id:  this.markers.length,
              "longitude": poly.points[poly.points.length-1]['longitude'],
              "latitude":poly.points[poly.points.length-1]['latitude'],
              "iconPath": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADKUlEQVRoQ+1YXXISQRDuXtzNW8S3VBkQXszuk3ACyQnEE5icwHiCJCeQnEA8gXiC4AkkT6AvrBCrfNxQZZXuuLS1K1T4md3ZmR2gsMhjmOn+vu6vu6cXYcv/cMvxw47ApjO4y8B/lYHuAZQMy3xOhHUAygNCBQA9IHIRwAWEtjViH8seeLqIa5FQBNw0zwnxRAyMPARsWCP/SgeRzAS6BfMEEd+JgS+eIM8I4Pjpd9aRv3t/IxOB3qHZAANfZwFARKfOkDVVbSgT6BXNMwB8q+p49h6Nx8fO7Z+2ii0lAt3DBzU0jGsVh/w75JHPqs4PcGVtKhHoFcwOID6LdUZ0Q4gtg4JI30RGjQysI8CTuDtE9N4ZshRNYN6CNAFx0dIbe8AaPKCimiHfL8tmQZpAr2C1AOEFDyBS8PJoGLSSZNAtWhcIcB4jpVjycTblCRRNDwAfLjVFCQnES5A69oBVZepAisDXx2ZlnMPPPAdGQNW0PT1JhvbAl8IkdTip+8g41mUnDORmCBxACS2rz8vk3sh/JPPE0EZAxvHGMhBGrFe0SLUDTe/FtlOiG3vIKisr4ohAfBt17YFfFjnv5yH/e9/sA2B+6eyYruxbdiayMfu7lITCi0kdBImaR0N2GgdgAv4aALlRXssgm4BwebMgAk7UJqLLxcfZhHg4wEo8gkT0yRmymkz0pbuQUMPz3t1wE4v+9W8zW5bMzHnVZ7W0hCIZJbRB2QhGSQP45gx8bmZE9pQITGqhiYivRA7S/K4afWUJ6cxCluhnIhCRSHxZpol9WPMbWilDeMKOJOCg2nkyzYFFTFl24yy78BSHchHPEhGumJxMqK6Qi6a0EJBf8ulub8RKMq/OODVqIRAaF+278wDi9+Z0pX9/ShuBtAWto3C1FvGssS+FXJ0w9yEpiioPtiR72jIwdZL01YIALp2BfyErk7USiJWSwrKShqj2DIROl6VEd0YAtbRfLdIA1zoHeA67BXPmsaev66xkDvAIhFL6tW91wp1AZVFJm4WVSGjqPPwQZv5kro6BtfJBljZius+tNAO6wfLs7QisI8prHWTrJrT1EvoLyaVmQLTeflsAAAAASUVORK5CYII=',
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
