<template>
  <el-select :value="value"  @change="handleChange">
    <el-option v-for="item in datas" :key="item.value" :label="item.text" :value="item.value" />
  </el-select>
</template>

<script>
export default {
  name: 'c-select',
  props: {
    keyVal: String,
    label: String,
    attr: {
      type: Object,
      default () {
        return {placeholder: `请选择${this.label}`}
      }
    },
    value: [String, Number]
  },
  data () {
    return {
      datas: []
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('input', val)
    }
  },
  created () {
    this.$db.find('shopSelectData', {key: this.keyVal}).then(res => {
      this.datas = res.data
    })
  }
}
</script>

<style>

</style>
