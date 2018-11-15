<template>
    <el-breadcrumb separator="/">
        <template v-for="(item, i) in breadData">
            <el-breadcrumb-item v-if="item=='首页'" to="/" :key="i">{{item}}</el-breadcrumb-item>
            <el-breadcrumb-item v-else-if="isObject(item)" :key="i"><span class="breadcrumb-a" @click="$router.push({name:item.url, params: item.params ? item.params: {}})"></span></el-breadcrumb-item>
            <el-breadcrumb-item v-else :key="i">{{item}}</el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>

<script>
import { isObject } from 'lodash'
import { analysisParams } from 'utils/index'
export default {
  name: 'c-breadcrumb',
  props: {
    routes: {
      type: Array
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isObject,
      breadData: this.data
    }
  },
  methods: {
    breadCrumb () {
      let breadData = []
      let params = Object.assign(this.$route.query, this.$route.params) // 获取参数
      for (let obj of this.$route.matched) {
        if (obj.meta.bread) {
          for (let value of obj.meta.bread) {
            // 判断是否有需要解析变量
            breadData.push(analysisParams(value, params))
          }
        }
      }
      this.breadData = breadData
    }
  },
  watch: {
    routes: {
      handler (val) {
        if (val) {
          this.breadCrumb()
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
    .el-breadcrumb {
        height: 35px;
        line-height: 35px;
        background: #f5f5f5;
        border: 1px solid #eaeaea;
        padding-left: 15px;
        box-sizing: border-box;
        .breadcrumb-a {
            cursor: pointer;
            &:hover {
                color: #1890ff;
            }
        }
    }
</style>
