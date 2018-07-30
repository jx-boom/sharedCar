<template>
  <div class="container">
    <!--<TrackList @showcdar="showcdar"></TrackList>-->

    <cdar v-if="showcadr" @select="select" @hiddenCdar="hiddenCdar" :checkDay="checkDay"></cdar>
    <!--<indexMap></indexMap>-->
    <tracklist @showcdar="showcdar" ref="tracklist"></tracklist>
    <navBar :from="name"></navBar>
      <!--:months="months" :value="value" @next="next" @prev="prev" :events="events" lunar clean @select="select"-->
      <!--ref="calendar" @selectMonth="selectMonth" @selectYear="selectYear"/>-->

  </div>
</template>
<script>
import nav from '../../components/nav/nav.vue';
import indexMap from '../indexMap/indexMap';
import tracklist from '../trackList/trackList';
import  calendar from '../calendar/calendar'

export default {
  data () {
    return {
      name: 'indexhome',
      checkDay: '',
      showcadr: false,
      checkTime: [],
      userInfo: {}
    }
  },
  components: {
    indexMap,
    tracklist,
     "cdar": calendar,
    "navBar": nav

  },
  methods: {
    go(name){
      const url = '../xx/main';
      wx.navigateTo({ url })
    },
    hiddenCdar(){
      this.showcadr= false;
    },
    select(val, val2) {
      this.checkTime=val;
      this.$refs.tracklist.checkDay=Date.parse(val.join('-'));
      this.$refs.tracklist.search();
      this.showcadr= false;
    },
    showcdar(checkDay){
      console.log('showcdar showcdar');
      this.checkDay= checkDay;
      this.showcadr= !this.showcadr;
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
  onShow(){
    wx.setNavigationBarTitle({
      title: '行迹'
    });
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style>
  .calendar{
    position: absolute !important;
    width: 80%;
    left: 8%;
    top: 8%;
    z-index: 20;
    background-color: #fff;
  }
.container{
  position: fixed;
  width: 100%;
  height: 100%;
  font-family: PingFangSC-Regular;
}
</style>
