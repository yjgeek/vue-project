<template>
  <div>
    <c-strong-list
      :getData="getData"
      :filter="filterParams"
      ref="list"
    >
      <template slot="operating">
        <el-button type="primary" size="small" @click="$router.push({name: 'shopOrderAdd', params: {type: 'add'}})" icon="el-icon-plus">模拟下单</el-button>
      </template>
      <template slot="filter">
        <el-form-item label="产品名称"><el-input v-model="filterParams.product_name" placeholder="请输入产品名称"></el-input></el-form-item>
        <el-form-item label="订单号"><el-input v-model="filterParams.order_number" placeholder="请输入订单号"></el-input></el-form-item>
        <el-form-item label="快递单号"><el-input v-model="filterParams.tracking_number" placeholder="请输入快递单号"></el-input></el-form-item>
        <el-form-item label="支付方式">
          <el-select placeholder="请选择支付方式" v-model="filterParams.pay_type">
            <el-option value="">请选择支付方式</el-option>
            <el-option value="支付宝支付">支付宝支付</el-option>
            <el-option value="微信支付">微信支付</el-option>
            <el-option value="快捷支付">快捷支付</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select placeholder="请选择订单状态" v-model="filterParams.status">
            <el-option value="">请选择订单状态</el-option>
            <el-option :value="1">代付款</el-option>
            <el-option :value="2">已付款</el-option>
            <el-option :value="3">代发货</el-option>
            <el-option :value="4">已发货</el-option>
            <el-option :value="5">申请售后</el-option>
            <el-option :value="6">已完成</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model="filterParams.create_time" format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
      </template>
      <el-table
        slot="list"
        slot-scope="data"
        :data="data.data"
        style="width: 100%"
      >
        <template v-for="item in columns">
          <el-table-column
            :key="item.id"
            v-bind="item"
            v-if="item.type !== 'index'"
          >
            <template slot-scope="scope">
              <div v-if="item.prop === 'operation'">
                <el-button size="mini" type="primary" @click="$router.push({name: 'shopOrderEdit', params: {id: scope.row.id, type: 'edit'}})">编辑</el-button>
                <el-button size="mini" type="danger" @click="remove(scope.row.id)">删除</el-button>
              </div>
              <span v-else>{{scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column v-else v-bind="item" :key="item.id" />
        </template>
      </el-table>
    </c-strong-list>
  </div>
</template>

<script>
export default {
  name: 'shop-order-list',
  data () {
    return {
      columns: [
        {type: 'index', label: '编号', width: 50},
        {prop: 'product_name', label: '产品名称'},
        {prop: 'order_number', width: 140, label: '订单号'},
        {prop: 'tracking_number', width: 140, label: '快递单号'},
        {prop: 'pay_type', label: '支行方式'},
        {prop: 'status_name', label: '订单状态'},
        {prop: 'create_time', width: 160, label: '创建时间'},
        {prop: 'update_time', width: 160, label: '更改时间'},
        {prop: 'operation', width: 200, label: '操作'}
      ],
      filterParams: {
        order_number: '',
        tracking_number: '',
        product_name: '',
        pay_type: '',
        status: '',
        create_time: []
      }
    }
  },
  methods: {
    getData (params, cb) {
      params = JSON.parse(JSON.stringify(params))
      if (params.name) {
        params.name = { like: params.name + '%' }
      }
      let keys = {1: '代付款', 2: '已付款', 3: '代发货', 4: '已发货', 5: '申请售后', 6: '已完成'}
      this.$db.page('shopOrder', params).then(res => {
        res.data.map(item => {
          item.status_name = keys[item.status] || '未知状态'
        })
        cb(res)
      })
    },
    remove (id) {
      this.$db.remove('shopOrder', id).then(res => {
        this.$message.success('删除成功')
        this.updateData()
      })
    },
    updateData () {
      this.$refs.list.updateData()
    },
    handleStatus ({id, status}) {
      this.$db.update('shopOrder', {id, status})
    }
  },
  created () {}
}
</script>

<style>
</style>
