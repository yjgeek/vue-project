<template>
  <div class="strong-list">
    <div class="header" v-if="$slots.operating">
      <slot name="operating"></slot>
    </div>
    <div class="filter" v-if="$slots.filter">
      <el-form :inline="true" @submit.native.prevent="handleFilter" size="small">
        <slot name="filter"></slot>
        <el-form-item>
          <el-button type="primary" native.type="submit" @click="handleFilter">查询</el-button>
          <el-button type="danger" @click="resetFilter">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-list" v-loading="loading">
      <slot name="list" :data="listData"></slot>
      <div class="page" v-if="isPage">
        <div><slot name="list-info" :data="response"></slot></div>
        <el-pagination :page-size="filter.limit" background @current-change="handlePage" layout="prev, pager, next, total, jumper" :current-page.sync="filter.page" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
export default {
  name: 'strong-list',
  props: {
    filter: {
      type: Object,
      default () {
        return {
          page: 1,
          limit: 15
        }
      }
    },
    getData: {
      type: Function
    },
    isPage: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      total: 0,
      listData: [],
      response: {},
      loading: false,
      initFilterParams: cloneDeep(this.filter)
    }
  },
  methods: {
    updateData () {
      let params = this.filter
      if (this.getData) {
        this.loading = true
        this.getData(params, res => {
          this.response = res
          if (this.isPage) {
            params.page = res.current_page
            this.total = res.total
            this.listData = res.data
          } else {
            this.listData = res
          }
          this.loading = false
        })
      }
    },
    // 筛选
    handleFilter (e) {
      this.updateData()
    },

    // 分页改变
    handlePage (page) {
      this.filter.page = page
      this.updateData()
    },

    // 重置筛选内容
    resetFilter () {
      let {filter, initFilterParams} = this
      Object.keys(filter).forEach(key => {
        filter[key] = initFilterParams[key]
      })
      this.updateData()
      this.$emit('resetFilter')
    }
  },
  created () {
    this.updateData()
  }
}
</script>

<style lang="scss" scoped>
.strong-list {
    > div {
        background: #fff;
        padding: 15px 0;
        margin-bottom: 15px;
        border-radius: 2px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header,
    .filter {
        padding: 15px;
    }
    .filter {
        fieldset {
            border: none;
            legend {
                color: #888;
                padding: 0 10px;
            }
        }
        .el-form-item {
            margin-bottom: 10px;
        }
    }
    .table-list {
        padding-top: 0;
        .page {
            display: flex;
            justify-content: space-between;
            margin: 15px 15px 0 0;
        }
    }
}
</style>
