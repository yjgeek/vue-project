<template>
  <div :id="id"></div>
</template>

<script>
import G2 from '@antv/g2'
export default {
  name: 'antv-chart',
  props: {
    height: {
      type: Number,
      default () {
        return 300
      }
    },
    forceFit: {
      type: Boolean,
      default () {
        return true
      }
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    },
    render: {
      type: Function,
      default () {
        return () => {}
      }
    }
  },
  data () {
    return {
      id: `chart-${parseInt(Math.random() * 1000)}`,
      chart: null
    }
  },
  methods: {
    initChart () {
      const {height, forceFit, id, config} = this
      this.chart = new G2.Chart({
        container: id,
        forceFit,
        height,
        ...config
      })
      if (this.chart) {
        this.render(this.chart)
      }
    },
    updateChart (data) {
      if (this.chart) {
        if (typeof data === 'function') {
          data(this.chart)
        } else {
          this.chart.changeData(data)
        }
      }
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    this.chart = null
  }
}
</script>

<style>

</style>
