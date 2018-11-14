<template>
    <div class="general-layout">
        <header-navigation></header-navigation>
        <el-container>
            <side-navigation></side-navigation>
            <el-main :class="['main', !isCollapse?'show-main':'hide-main']">
                <c-breadcrumb :routes="$route.matched" />
                <div class="main-container">
                    <router-view />
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import sideNavigation from 'components/sideNavigation'
import headerNavigation from 'components/HeaderNavigation'
export default {
  name: 'general-layout',
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    sideNavigation,
    headerNavigation
  },
  mounted () {
    global.vbus.$on('collapseLeftNav', val => {
      this.isCollapse = val
    })
  }
}
</script>

<style lang="scss" scoped>
.main {
    padding: 60px 0px 0 255px;
    width: 100vw;
    &.hide-main {
        padding-left: 63px;
    }
    .main-container {
        padding: 20px 15px;
        min-height: calc(100vh - 60px - 35px);
        background: #f1f1f1;
        box-sizing: border-box;
    }
}
</style>
