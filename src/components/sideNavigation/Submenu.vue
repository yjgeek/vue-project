<template>
  <el-submenu v-if="item.childs" :index="String(item.index)">
    <template slot="title">
      <icon :type="item.icon"></icon>
      <span>{{item.text}}</span>
    </template>
    <submenu v-for="(child, i) in item.childs" :key="i" :item="child" />
  </el-submenu>
  <el-menu-item v-else :route="item.route" :index="item.path">
    <icon :type="item.icon"></icon>
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
