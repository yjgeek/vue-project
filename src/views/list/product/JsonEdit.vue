<template>
<el-row>
  <el-col :md="12" :sm="24">
    <el-input
      type="textarea"
      :autosize="{ minRows: 15}"
      placeholder="请输入JSON格式"
      v-model="val"
      @blur="handleBlur"
    />
  </el-col>
  <el-col :md="12" :sm="24">
    <json-view-editor
      :src="value"
      :viewExpanded="true"
      :indentWidth="4">
    </json-view-editor>
  </el-col>
</el-row>
</template>

<script>
import Vue from 'vue'
import JsonViewEditor from 'vue-json-view-editor'
Vue.use(JsonViewEditor)
export default {
  name: 'c-json-edit',
  props: {
    value: Object,
    default () {
      return {}
    },
    defaultVal: {
      type: Object
    }
  },
  data () {
    return {
      val: ''
    }
  },
  methods: {
    handleBlur (event) {
      try {
        let val = JSON.parse(event.target.value)
        if (Object.prototype.toString.call(val) === '[object Object]') {
          this.$emit('input', val)
        } else {
          this.$message.warning('格式错误，请重新检查')
        }
      } catch (error) {
        this.$message.warning('格式错误，请重新检查')
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val !== this.val) {
          if (Object.prototype.toString.call(val) === '[object Object]') {
            val = JSON.stringify(val)
          }
          this.val = val
        }
      },
      immediate: true
    }
  }
}
</script>

<style>

</style>
