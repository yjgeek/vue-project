<template>
    <div class="general-layout">
        <c-header-navigation></c-header-navigation>
        <el-container>
            <c-side-navigation></c-side-navigation>
            <el-main :class="['main', !isCollapse?'show-main':'hide-main']">
                <c-breadcrumb :routes="$route.matched" />
                <div class="main-container">
                    <transition name="fade">
                        <router-view />
                    </transition >
                </div>
                <c-footer />
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'general-layout',
  data () {
    return {
      isCollapse: false
    }
  },
  mounted () {
    window.$variable.vbus.$on('collapseLeftNav', val => {
      this.isCollapse = val
    })
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
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
