<template>
  <div class="path-list">
    <div class="hide-i-768 pc">
      <template v-for="(item, i) in sources">
        <small :key="item.id" v-if="i !== 0">/</small>
        <span @click="handleClick(item.id)" :key="'name-'+item.id">{{item.name}}</span>
      </template>
    </div>
    <div class="show-i-768 mobile">
      <span @click="handlePrev">返回上一级</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resource-path',
  props: {
    sources: {
      type: Array,
      default () {
        return {}
      }
    },
    active: [String, Number]
  },
  methods: {
    handlePrev () {
      const index = this.sources.findIndex(item => item.id == this.active);
      if (index <= 0) return false;
      this.handleClick(this.sources[index - 1].id);
    },
    handleClick (data) {
      this.$emit('change', data)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../response.scss';
  .path-list{
    margin-top: 10px;
    .pc{
      span{
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: color .2s cubic-bezier(.645,.045,.355,1);
        color: #303133;
        &:last-child{
          font-weight: 400;
          color: #606266;
          cursor: text;
        }
      }
      small{
        margin: 0 5px;
        font-weight: 700;
        color: #c0c4cc;
      }
    }
    .mobile{
      span{
        cursor: pointer;
      }
    }
  }
</style>
