<template>
    <div class="trend">
      <el-row :gutter="12">
        <el-col :lg="12" :md="24" class="mb12">
          <el-card>
            <div slot="header">
              <strong>趋势图</strong>
              <el-radio-group v-model="userType" class="fr" size="mini" @change="updateTrend">
                <el-radio-button v-for="item in ['PV数', 'UV数', 'IP数']" :label="item" :key="item" >{{item}}</el-radio-button>
              </el-radio-group>
            </div>
            <antvChart ref="trendChart" :config="{height: 400}" :render="renderTrend"/>
            <div style="height: 100px"></div>
          </el-card>
        </el-col>
        <el-col :lg="12" :md="24" class="mb12">
          <el-card style="overflow-x: auto">
            <div slot="header">
              <strong>关键词TOP20</strong>
            </div>
            <div style="text-align: center">
              <antvChart ref="keywordCloudChart" :render="keywordCloud" :config="{padding: 10, forceFit: false, width: 600, height: 500}"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import antvChart from '../Chart'
import DataSet from '@antv/data-set'
import G2 from '@antv/g2'
import {assign} from 'lodash'
export default {
  name: 'dashboard-website-trend',
  data () {
    return {
      userType: 'PV数',
      trendBgView: null
    }
  },
  components: {
    antvChart
  },
  methods: {
    // 趋势图
    async renderTrend (chart) {
      let data = await this.$api['dashboardTrend']()
      let ds = new DataSet()
      let dv = ds.createView().source(data)
      chart.source(dv, {
        time: {
          minLimit: 1,
          maxLimit: 24,
          tickInterval: 1
        },
        date: {
          type: 'timeCat'
        }
      })
      chart.tooltip({
        showTitle: false,
        crosshairs: {
          type: 'line'
        }
      })
      chart.axis('val', {
        label: {
          formatter (val) {
            return val
          }
        }
      })
      chart.axis('time', {
        label: {
          formatter (val) {
            return val
          }
        }
      })
      chart.line().position('time*val').color('date', ['#cccccc', '#1890ff']).opacity('date', [0.5, 1])
      chart.point().position('time*val').color('date', ['#cccccc', '#1890ff']).opacity('date', [0.5, 1]).size(4).shape('circle')
      let bgView = chart.view()
      dv.transform({
        type: 'filter',
        callback (row) {
          return row.dateMask
        }
      })
      bgView.source(dv)
      bgView.area().position('time*val').color('dateMask', '#1890ff').opacity(0.1)
      bgView.tooltip(false)
      this.trendBgView = bgView
      chart.legend('dateMask', false)
      chart.render()
    },

    // 关键字云
    async keywordCloud (chart) {
      // 给point注册一个词云的shape
      const _self = this
      G2.Shape.registerShape('point', 'cloud', {
        drawShape: function drawShape (cfg, container) {
          var attrs = _self.getTextAttrs(cfg)
          return container.addShape('text', {
            attrs: assign(attrs, {
              x: cfg.x,
              y: cfg.y
            })
          })
        }
      })
      let data = await this.$api['dashboardKeyword']()
      var dv = new DataSet.View().source(data)
      var range = dv.range('value')
      var min = range[0]
      var max = range[1]
      dv.transform({
        type: 'tag-cloud',
        fields: ['x', 'value'],
        font: 'Verdana',
        padding: 0,
        timeInterval: 5000, // max execute time
        rotate: function rotate () {
          var random = ~~(Math.random() * 4) % 4
          if (random === 2) {
            random = 0
          }
          return random * 90 // 0, 90, 270
        },
        fontSize: function fontSize (d) {
          if (d.value) {
            // console.log((d.value - min) / (max - min) * (80 - 24))
            return (d.value - min) / (max - min) * (80 - 24) + 24
          }
          return 0
        }
      })
      chart.source(dv, {
        x: {
          nice: false
        },
        y: {
          nice: false
        }
      })
      chart.legend(false)
      chart.axis(false)
      chart.tooltip('value', {
        showTitle: false
      })
      chart.coord().reflect()
      chart.point().position('x*y').color('category').shape('cloud')
      chart.render()
    },
    async updateTrend () {
      let data = await this.$api['dashboardTrend']()
      this.$refs['trendChart'].updateChart(chart => {
        chart.changeData(data)
        this.trendBgView.changeData(data.filter(item => item.dateMask))
      })
    },
    async updateKeywordCloud () {
      this.$refs['keywordCloudChart'].updateChart(chart => {
        this.keywordCloud(chart)
      })
    },
    updateData () {
      this.updateTrend()
      this.updateKeywordCloud()
    },
    totalChange () {
      this.updateTrend()
      this.updateKeywordCloud()
    },
    getTextAttrs (cfg) {
      return assign({}, {
        fillOpacity: cfg.opacity,
        fontSize: cfg.origin._origin.size,
        rotate: cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fontFamily: cfg.origin._origin.font,
        fill: cfg.color,
        textBaseline: 'Alphabetic'
      }, cfg.style)
    }
  }
}
</script>

<style lang="scss" scoped>
.trend{
  .item{
    padding: 10px 20px;
  }
}
</style>
