<template>
  <div>
    <c-strong-list
      :getData="getData"
      :filter="filterParams"
      ref="list"
    >
      <template slot="operating">
        <el-button
          type="primary"
          size="small"
          @click="$router.push({name: 'shopMarketingCollectionAdd', params: {shopMarketingId: pid}})"
          icon="el-icon-plus"
        > 添加</el-button>
      </template>
      <template slot="filter">
        <el-form-item label="创建时间">
          <el-date-picker v-model="filterParams.create_time" format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="filterParams.end_time" format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
      </template>
      <el-table
        slot="list"
        slot-scope="data"
        :data="data.data"
        style="width: 100%"
      >
        <template v-for="(item,i) in columns">
          <el-table-column
            :key="i"
            v-bind="item"
            v-if="item.type !== 'index'"
          >
            <template slot-scope="scope">
              <span v-if="item.prop == 'remaining_time'">
                <shop-countdown :val="scope.row.end_time" />
              </span>
              <span v-else>{{scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column v-else v-bind="item" :key="i" />
        </template>
        <el-table-column
          label="操作"
          width="250"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="$router.push({name: 'shopMarketingCollectionEdit', params: {id: scope.row.id}})"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="remove(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </c-strong-list>
    <router-view @update="updateData" />
  </div>
</template>

<script>
import shopCountdown from './Countdown'
export default {
  name: 'shop-product-good',
  data () {
    return {
      pid: null,
      columns: [
        {type: 'index', label: '编号', width: 50},
        {prop: 'title', label: '标题'},
        {prop: 'condition', label: '条件'},
        {prop: 'description', label: '规则', width: 400},
        {prop: 'product_total', label: '活动商品数量'},
        {prop: 'create_time', label: '创建时间'},
        {prop: 'remaining_time', label: '剩余时间', width: 100},
        {prop: 'end_time', label: '结束时间'}
      ],
      filterParams: {
        create_time: [],
        end_time: []
      }
    }
  },
  methods: {
    getData (params, cb) {
      params = JSON.parse(JSON.stringify(params))
      if (params.create_time[0]) {
        params.create_time = {'-': {low: params.create_time[0], high: params.create_time[1]}}
      }
      if (params.end_time[0]) {
        params.end_time = {'-': {low: new Date(params.end_time[0]), high: new Date(params.end_time[1])}}
      }
      params['shop_marketing_id'] = this.pid
      this.$db.page('shopMarketingCollection', params).then(res => {
        res.data = res.data.map(item => {
          item.product_total = 0
          this.$db.connent.count({from: 'shopMarketingGood', where: {shop_marketing_collection_id: item.id}}).then(count => {
            item.product_total = count
          })
          return item
        })
        cb(res)
      }).catch(_ => {
        cb(Boolean(false))
      })
    },
    remove (id) {
      this.$db.remove('shopMarketingCollection', id).then(res => {
        this.$message.success('删除成功')
        this.updateData()
      })
    },
    updateData () {
      this.$refs.list.updateData()
    }
  },
  components: {
    shopCountdown
  },
  created () {
    const {id} = this.$route.params.item || {}
    if (id) {
      this.setLocalStorage('shop_marketing_id', id)
      this.pid = id
    } else {
      this.pid = Number(this.getLocalStorage('shop_marketing_id'))
    }
  }
}
</script>

<style>
</style>
