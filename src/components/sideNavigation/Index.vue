<template>
  <el-aside :class="['side-nav', !isCollapse?'show-side':'hide-side']">
    <div class="logo" @click="$router.push('/')">
      <img src="https://cn.vuejs.org/images/logo.png" alt=""> {{!isCollapse?$config.TITLE:''}}
    </div>
    <el-menu :default-active="$route.path" :router="true" :collapse="isCollapse" class="el-menu-vertical" background-color="#001529" text-color="#fff" active-text-color="#1890ff">
      <submenu v-for="(item, i) in sidebarData" :key="i" :item="item" />
    </el-menu>
  </el-aside>
</template>
<script>
import submenu from './Submenu'
export default {
  name: 'side-navigation',
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    sidebarData () {
      return this.handleNavIndex(this.$config.SIDE_NAV_MENU)
    }
  },
  components: {
    submenu
  },
  methods: {
    /**
     * 赋值一个唯一的key
     */
    handleNavIndex (data, index) {
      data.forEach((item, i) => {
        item['index'] = index ? `${index}-${i + 1}` : i + 1
        if (item.childs) this.handleNavIndex(item.childs, item['index'])
      })
      return data
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
.side-nav{
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 6;
  overflow-x: hidden;
  background: #001529;
  width: 255px !important;
  padding-top: 60px;
  box-sizing: border-box;
  transition: width .4s;
  &.hide-side{
    width: 63px !important;
    i{
      font-weight: bold;
    }
    .logo{
      width: 63px !important;
      img{
        width: 40px;
      }
    }
  }
  .logo{
    height: 60px;
    width: 255px;
    line-height: 60px;
    background: #002140;
    padding-left: 10px;
    color: #fff;
    font-weight: 600;
    font-size: 22px;
    z-index: 7;
    transition: width .4s;
    cursor: pointer;
    box-sizing: border-box;
    display: inline-block;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    img{
      width: 40px;
      vertical-align: middle;
    }
  }
  .el-menu-vertical{
    border: none;
  }
  .el-submenu {
    &.is-opened{
      >ul>li{
        background-color: #000c17 !important;
      }
    }
    i{
      font-size: 18px;
      font-style: normal;
      color: rgba(255, 255, 255, .6);
    }
  }
  .el-menu-item i{
    margin-right: 5px;
  }
  .el-menu-item.is-active i{
    color: #1890ff;
  }
  .el-menu-item:hover{
    background-color: rgba(114, 114, 212, 0.222) !important;
    i,span{
      color: #1890ff !important;
    }
  }
}
</style>
