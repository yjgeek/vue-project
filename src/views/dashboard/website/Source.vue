<template>
  <el-row :gutter="12">
    <el-col :lg="12" :md="24" class="mb12">
      <el-card>
        <strong slot="header">Top10来源网站</strong>
        <website-table-component thead="来源网站" :sources="webSiteData" />
      </el-card>
    </el-col>
    <el-col :lg="12" :md="24" class="mb12">
      <el-card>
        <strong slot="header">Top10入口页面</strong>
        <website-table-component thead="入口页面" :sources="entranceData" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import websiteTableComponent from './component/WebsiteTableComponent'
export default {
  name: 'dashboard-website-source',
  data () {
    return {
      webSiteData: [],
      entranceData: []
    }
  },
  components: {
    websiteTableComponent
  },
  methods: {
    async getSourceWebsite () {
      let data = await this.$api['dashboardSourceWebsite']()
      this.webSiteData = data
    },
    async getSourcePage () {
      let data = await this.$api['dashboardSourcePage']()
      this.entranceData = data
    },
    updateData () {
      this.getSourceWebsite()
      this.getSourcePage()
    }
  },
  created () {
    this.updateData()
  }
}
</script>

<style>

</style>
