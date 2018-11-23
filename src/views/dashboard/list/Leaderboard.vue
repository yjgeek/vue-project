<template>
    <el-row :gutter="12">
        <el-col :lg="6" :sm="12" :xs="24" class="mb12">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>全国最屌的省份</span>
                </div>
                <leaderboard-item :color="data.provinces.color" :sources="data.provinces.data" :title="false" />
            </el-card>
        </el-col>
        <el-col :lg="6" :sm="12" :xs="24" class="mb12">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>全国最屌的城市</span>
                </div>
                <leaderboard-item :color="data.citys.color" :sources="data.citys.data" :title="false" />
            </el-card>
        </el-col>
        <el-col :lg="6" :sm="12" :xs="24" class="mb12">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>全国进步最快城市</span>
                </div>
                <leaderboard-item :color="data.progressCitys.color" :sources="data.progressCitys.data" :title="false" />
            </el-card>
        </el-col>
        <el-col :lg="6" :sm="12" :xs="24" class="mb12">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>出口最多的国家</span>
                </div>
                <leaderboard-item :color="data.countries.color" :sources="data.countries.data" :title="false" />
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import leaderboardItem from './component/LeaderboardItem'
export default {
  name: 'dashboard-leaderboard',
  data () {
    return {
      data: {
        provinces: {},
        citys: {},
        countries: {},
        progressCitys: {}
      }
    }
  },
  components: {
    leaderboardItem
  },
  created () {
    this.$api['dashboardPlatformRanking']().then(res => {
      this.data = res
    })
  }
}
</script>

<style>

</style>
