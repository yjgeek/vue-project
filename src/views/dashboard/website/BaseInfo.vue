<template>
    <div class="base-info">
        <div class="table thead">
            <span>日期</span>
            <span>浏览量(PV)</span>
            <span>访客数(UV)</span>
            <span>IP数</span>
            <span>跳出率</span>
            <span>平均访问时长</span>
            <span>转化率</span>
        </div>
        <div class="tbody">
            <div v-for="(item, key) in nowData" :key="key" :class="['table', key==='today' ? 'today' : '']" >
                <span>{{key | toMapKeys }}</span>
                <span>
                  {{item.pv}}
                  <font v-if="key === 'predictionToday'"><c-icon type="arrow-solid" :rotate="item.pv>nowData.today.pv ? 0 : -180" /></font>
                </span>
                <span>
                  {{item.uv}}
                  <font v-if="key === 'predictionToday'"><c-icon type="arrow-solid" :rotate="item.uv>nowData.today.uv ? 0 : -180" /></font>
                </span>
                <span>
                  {{item.ip}}
                  <font v-if="key === 'predictionToday'"><c-icon type="arrow-solid" :rotate="item.ip>nowData.today.ip ? 0 : -180" /></font>
                </span>
                <span>{{item.target.toFixed(2)}}%</span>
                <span>{{item.time}}</span>
                <span>{{item.conversion.toFixed(2)}}%</span>
            </div>
        </div>
        <transition name="show">
            <div class="tbody yesterday" v-if="isShowYesterday">
                <div class="table" v-for="(item, key) in historyData" :key="key">
                    <span>{{key | toMapKeys }}</span>
                    <span>{{item.pv}}</span>
                    <span>{{item.uv}}</span>
                    <span>{{item.ip}}</span>
                    <span>{{item.target.toFixed(2)}}%</span>
                    <span>{{item.time}}</span>
                    <span>{{item.conversion.toFixed(2)}}%</span>
                </div>
            </div>
        </transition>
        <div class="tbody-footer">
            <div class="table">
                <div class="arrow" @click="isShowYesterday = !isShowYesterday"><c-icon type="double-arrow-right" :rotate="isShowYesterday ? -90 : 90" /></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'dashboard-base-info',
  data () {
    return {
      isShowYesterday: false,
      nowData: {},
      historyData: {}
    }
  },
  methods: {
    getData (type) {
      this.$api['dashboardRealTimeTraffic']({type}).then(res => {
        if (type === 1) {
          this.nowData = res
        } else {
          this.historyData = res
        }
      })
    }
  },
  filters: {
    toMapKeys (val) {
      switch (val) {
        case 'today':
          return '今日'
        case 'yesterday':
          return '昨日'
        case 'yesterdayNow':
          return '昨日此时'
        case 'predictionToday':
          return '预计今日'
        case 'everyDay':
          return '每日平均'
        case 'history':
          return '历史峰值'
      }
    }
  },
  watch: {
    isShowYesterday (val) {
      if (val) {
        this.getData(2)
      }
    }
  },
  created () {
    this.getData(1)
  }
}
</script>

<style lang="scss" scoped>
.show-enter-active, .show-leave-active {
  transition: opacity .4s;
}
.show-enter,.show-leave{
  opacity: 0;
}
font{
  color: #f54228;
}
.base-info{
    background: #fff;
    padding: 10px 20px;
    .title{
      font-family: "微软雅黑";
      font-weight: 500;
    }
    .table{
        display: flex;
        width: 100%;
        justify-content: space-around;
        font-size: 14px;
        span{
            display: block;
            width: 100%;
            text-align: right;
        }
    }
    .thead{
       color: #888;
        span{
            padding-right: 10px;
        }
    }
    .tbody{
        margin-top: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
        &.yesterday{
            background: #f9f9f9;
            margin-top: 0;
            padding-top: 10px;
        }
        .today span{
          font-size: 16px;
          color: #000;
          font-weight: 600;
        }
        span{
            border-right: 1px solid #eee;
            padding-right: 10px;
            height: 30px;
            line-height: 30px;
            color: #222;
        }
        .table span:last-child{
            border-right: none;
        }
    }
    .tbody-footer{
        .arrow{
            padding: 3px 15px;
            border: 1px solid #eee;
            background: #FBFCFC;
            border-top: none;
            position: relative;
            top: -1px;
            cursor: pointer;
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
            i{
                color: #d4d2d2;
            }
        }
    }
}
</style>
