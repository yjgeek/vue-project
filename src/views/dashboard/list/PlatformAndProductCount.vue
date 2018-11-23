<template>
    <el-row :gutter="12">
        <el-col :lg="24" :xl="12" class="mb12">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>2018双十一各平台24小时交易额</span>
                </div>
                <div :id="hourId"></div>
                <small style="color: #e1e1e1; float: right; user-select: none">马老师果然牛逼 (*/ω＼*)</small>
            </el-card>
        </el-col>
        <el-col :lg="24" :xl="12" class="mb12">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>全网平台热销商品TOP10</span>
                </div>
                <div :id="productId"></div>
                <small style="color: #e1e1e1; float: right; user-select: none">女人和孩子的钱果然是最好赚的 (｀・ω・´)</small>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import G2 from '@antv/g2'
export default {
  name: 'dashboard-platform-and-product-count',
  data () {
    return {
      hourId: `top-${parseInt(Math.random() * 100)}`,
      productId: `top-${parseInt(Math.random() * 100)}`,
      chartHour: null,
      productHour: null
    }
  },
  methods: {
    async draw24Hour () {
      let data = await this.$api['dashboardPlatform24HourCount']()
      this.chartHour = new G2.Chart({
        container: this.hourId,
        forceFit: true,
        height: 300
      })
      this.chartHour.source(data, {
        time: {
          minLimit: 1,
          maxLimit: 24,
          tickInterval: 1
        }
      })
      this.chartHour.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      this.chartHour.axis('price', {
        label: {
          formatter (val) {
            return val + '亿'
          }
        }
      })
      this.chartHour.axis('time', {
        label: {
          formatter (val) {
            return val + '时'
          }
        }
      })
      this.chartHour.line().position('time*price').color('name')
      this.chartHour.point().position('time*price').color('name').size(4).shape('circle')
      this.chartHour.render()
    },
    async drawProductTop10 () {
      const data = await this.$api['dashboardPlatformProductTop10']()
      this.productHour = new G2.Chart({
        container: this.productId,
        forceFit: true,
        height: 300
      })
      this.productHour.source(data)
      this.productHour
        .interval()
        .position('name*price')
        .color('name')

      this.productHour.axis('price', {
        label: {
          formatter (val) {
            return val + '亿'
          }
        }
      })
      this.productHour.render()
    }
  },
  created () {},
  mounted () {
    this.draw24Hour()
    this.drawProductTop10()
  }
}
</script>

<style>
</style>
