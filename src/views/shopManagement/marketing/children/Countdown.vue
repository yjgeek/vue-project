<template>
  <strong>{{mergeTime}}</strong>
</template>

<script>
export default {
  name: 'shop-countdown',
  props: ['val'],
  data () {
    let timestamp = new Date(this.val).getTime()
    return {
      timestamp: timestamp > 0 ? timestamp : 0,
      interval: null,
      d: 0,
      h: 0,
      m: 0,
      s: 0
    }
  },
  computed: {
    mergeTime () {
      const {d, h, m, s} = this
      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        return '已结束'
      }
      return `${this.makeUpDate(d)}:${this.makeUpDate(h)}:${this.makeUpDate(m)}:${this.makeUpDate(s)}`
    }
  },
  methods: {
    analysisTime () {
      if (this.timestamp > 0) {
        let current = new Date().getTime()
        let remaining = this.timestamp - current
        let d = parseInt(remaining / 86400000)
        if (d > 0) {
          remaining -= d * 86400000
        }

        let h = parseInt(remaining / (60 * 60 * 1000))
        if (h > 0) {
          remaining -= h * 60 * 60 * 1000
        }

        let m = parseInt(remaining / (60 * 1000))
        if (m > 0) {
          remaining -= m * 60 * 1000
        }
        let s = parseInt(remaining / 1000)
        this.d = d
        this.h = h
        this.m = m
        this.s = s
      }
    },
    countDownTime () {
      const {d, h, m, s} = this
      if (this.d <= 0 && this.h <= 0 && this.m <= 0 && this.s <= 0) {
        clearInterval(this.interval)
      } else {
        if (s === 0) {
          if (d || h || m) {
            this.s = 59
            if (m === 0 && (h || d)) {
              this.m = 59
              if (h === 0 && d) {
                this.h = 23
                this.d -= 1
              } else {
                this.h -= 1
              }
            } else {
              this.m -= 1
            }
          }
        } else {
          this.s -= 1
        }
      }
    },
    makeUpDate (data) {
      return data < 10 ? '0' + data : data
    }
  },
  created () {
    this.analysisTime()
    if (this.timestamp > 0) {
      this.interval = setInterval(() => {
        this.countDownTime()
      }, 1000)
    }
  }
}
</script>

<style>

</style>
