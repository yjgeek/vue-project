<template>
    <div>
      <dashboard-base-info class="mb12"/>
      <el-radio-group v-model="time" class="mb12" size="medium">
        <el-radio-button v-for="item in ['今天', '昨天', '最近7天', '最近30天']" :label="item" :key="item">{{item}}</el-radio-button>
      </el-radio-group>
      <dashboard-website-trend />
      <dashboard-website-source />
      <dashboard-website-page-and-user />
    </div>
</template>

<script>
import dashboardBaseInfo from './BaseInfo'
import dashboardWebsiteTrend from './Trend'
import dashboardWebsiteSource from './Source'
import dashboardWebsitePageAndUser from './PageAndUser'
export default {
  name: 'dashboard-website',
  data () {
    return {
      time: '今天'
    }
  },
  components: {
    dashboardBaseInfo,
    dashboardWebsiteTrend,
    dashboardWebsiteSource,
    dashboardWebsitePageAndUser
  }
}
</script>

<style>

</style>
