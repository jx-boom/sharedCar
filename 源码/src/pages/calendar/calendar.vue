<template>
<div class="calendarBg" @click="hidden" id="calendarBg">
    <zalendar :months="months"  @next="next" @prev="prev" :events="events"  clean @select="select"
              :checkDay="checkDay"
              ref="calendar" @selectMonth="selectMonth" @selectYear="selectYear">
    </zalendar>

  </div>
</template>
<script>
  import Calendar from '../../components/mpvue-calendar/mpvue-calendar'
export default {
  data() {
    return {
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      disabledarr: ['2018-6-27', '2018-6-25'],
      value: [2018, 6, 7],
      begin: [2016, 1, 1],
      end: [2020, 1, 1],
      events: {'2018-6-7': '今日备注', '2018-6-8': '一条很长的明日备注'},
    }
  },
  props:{
    checkDay: String
  },
  components: {"zalendar":Calendar},
  methods: {
    hidden(event){
      if(event.target.id=='calendarBg'){

        this.$emit('hiddenCdar')}


    },
    selectMonth(month, year) {
      console.log(year, month)
    },
    prev(month) {
      console.log(month)
    },
    next(month) {
      console.log(month)
    },
    selectYear(year) {
      console.log(year)
    },
    setToday(val, val1, val2) {
      this.$refs.calendar.setToday();
    },
    select(val, val2) {
      setTimeout(() => {
        this.$emit('select',val);

      },250)
    }
  }
} </script>
<style scoped>
  .calendarBg{
    position: absolute;
    background-color: rgba(21, 21, 21, 0.45);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 5;
  }
</style>
