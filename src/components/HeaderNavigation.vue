<template>
  <el-header :class="['header-navigation', isShowSide?'hide-nav':'show-nav']">
    <div class="logo" @click="collapse"><icon :type="isShowSide?'fold-right':'fold-left'"></icon></div>
    <div class="right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link to="/">修改密码</router-link></el-dropdown-item>
          <el-dropdown-item divided ><p @click="logout">退出登录</p></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import { debounce } from 'lodash'
export default {
  name: 'header-navigation',
  data () {
    return {
      isShowSide: false,
      name: ''
    }
  },
  methods: {
    logout () {
      this.$api['authLogout']().then(res => {
        localStorage.clear()
        this.$router.push('/login')
      })
    },
    // 隐藏/显示左侧导航
    collapse () {
      // 通过全局的vbus来分发事件
      this.isShowSide = !this.isShowSide
      global.vbus.$emit('collapseLeftNav', this.isShowSide)
    },
    /**
     * 窗口改变大小
     */
    changeWindow () {
      this.$store.commit('updateWindowSize', window.innerWidth)
      if (window.innerWidth > 991) {
        this.isShowSide = false
        global.vbus.$emit('collapseLeftNav', false)
      } else {
        this.isShowSide = true
        global.vbus.$emit('collapseLeftNav', true)
      }
    }
  },
  mounted () {
    window.onresize = debounce(this.changeWindow, 300, { maxWait: 600 })
    this.$nextTick(() => {
      this.changeWindow()
    })
  },
  created () {
    this.name = this.getLocalStorage('user', true).name
  }
}
</script>
<style lang="scss" scoped>
.el-header.header-navigation {
  background: #082b4c;
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px !important;
  line-height: 60px;
  z-index: 5;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding-left: 255px !important;
  &.hide-nav {
    padding-left: 63px !important;
  }
  .logo {
    padding: 0 15px;
    cursor: pointer;
    &:hover {
      background: #063767;
    }
    i {
      font-size: 26px;
      color: #fff;
    }
  }
  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }
  .right {
    display: flex;
    align-items: center;
    > * {
      margin-right: 5px;
    }
  }
}
</style>
