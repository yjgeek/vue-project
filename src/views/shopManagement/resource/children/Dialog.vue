<template>
  <div class="resource-dialog" @click.self.prevent="$emit('close')">
    <div class="resource-dialog-wrapper">
      <div class="resource-dialog-title">
        <div v-if="!$slots.title">{{title}}</div>
        <slot name="title"></slot>
      </div>
      <div class="resource-dialog-body">
        <slot></slot>
      </div>
      <div class="resource-dialog-footer">
        <span @click="$emit('close')">取消</span>  
        <span @click="$emit('submit')">确定</span>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resource-dialog',
  props: {
    title: {
      type: String,
      default() {
        return '资源管理器';
      }
    }
  },
  mounted(){
    document.body.style.overflow = 'hidden';

  },
  beforeDestroy () {
    document.body.style.overflow = '';
  }
}
</script>
<style lang="scss" scoped>
.resource-dialog{
  background: rgba(0, 0, 0, .2);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  .resource-dialog-wrapper{
    width: 100%;
    height: 100vh;
    margin: auto;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }
  &-title{
    height: 35px;
    line-height: 35px;
    padding-left: 10px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 14px;
  }
  &-body{
    overflow: auto;
    height: calc(100vh - 95px);
    padding: 15px;
    box-sizing: border-box;
  }
  &-footer{
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #f1f1f1;
    span{
      display: inline-block;
      cursor: pointer;
      padding: 5px 10px;
      font-size: 14px;
      color: #fff;
      background-color: #409eff;
      border-radius: 4px;
      margin-right: 15px;
    }
  }
}
</style>
