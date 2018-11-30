<template>
  <el-submenu v-if="item.childs" :index="String(item.index)">
    <template slot="title">
      <c-icon :type="item.icon"></c-icon>
      <span>{{item.text}}</span>
    </template>
    <c-submenu v-for="(child, i) in item.childs" :key="i" :item="child" />
  </el-submenu>
  <el-menu-item v-else :route="item.route" :index="item.path">
    <c-icon :type="item.icon"></c-icon>
    <span>{{item.text}}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'c-submenu',
  props: {
    item: Object
  },
  data () {
    return {}
  }
}
</script>

<style>

</style>
