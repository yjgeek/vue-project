<template>
    <div>
      <dashboard-base-info class="mb12"/>
      <el-radio-group v-model="time" class="mb12" size="medium" @change="handleChange">
        <el-radio-button v-for="item in ['今天', '昨天', '最近7天', '最近30天']" :label="item" :key="item">{{item}}</el-radio-button>
      </el-radio-group>
      <dashboard-website-trend ref="trend" />
      <dashboard-website-source ref="source" />
      <dashboard-website-page-and-user ref="pageuser" />
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
  },
  methods: {
    handleChange () {
      this.$refs.trend.updateData()
      this.$refs.source.updateData()
      this.$refs.pageuser.updateData()
    }
  }
}
</script>

<style>

</style>
