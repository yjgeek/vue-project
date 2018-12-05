<template>
  <el-dialog
    class="strong-dialog"
    :close-on-click-modal="false"
    :title="dialogParams.title?dialogParams.title:'添加数据'"
    :visible.sync="visible" @close="close">
    <slot></slot>
    <div style="text-align: center">
      <template v-if="operating" >
        <el-button type="danger" native-type="button" @click="close()">取消</el-button>
        <el-button type="primary" native-type="button" @click="$emit('submit');">提交</el-button>
      </template>
      <slot v-else name="footer"></slot>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'c-strong-dialog',
  props: {
    value: Boolean,
    backUrl: String,
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
  methods: {
    close () {
      this.visible = false
      this.$router.push({name: this.backUrl})
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
  @media (max-width: 1200px) {
    width: 80%;
  }
}
</style>
