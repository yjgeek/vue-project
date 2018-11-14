<template>
  <el-dialog
    class="strong-dialog"
    :title="dialogParams.title?dialogParams.title:'添加数据'"
    :visible.sync="visible" @close="visible = false;">
    <slot></slot>
    <div v-if="operating" style="text-align: center">
      <el-button type="danger" @click="visible = false;">取消</el-button>
      <el-button type="primary" @click="$emit('submit');">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'strong-dialog',
  props: {
    value: Boolean,
    operating: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      visible: this.value,
      dialogParams: {
        title: '添加数据'
      }
    }
  },
  watch: {
    visible (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.strong-dialog .el-dialog{
  @media (max-width: 768px) {
    width: 95%;
  }
}
</style>
