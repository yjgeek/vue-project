<template>
<div>
  <el-steps style="width: 50%; margin: 20px auto 50px" :active="active" process-status='success' finish-status="success">
    <el-step title="填写订单信息"></el-step>
    <el-step title="完成支付"></el-step>
  </el-steps>
  <el-form :model="form" ref="form" label-width="80px" :rules="rules" v-bind="$config.defaultFormLayout">
    <el-row>
      <el-col v-bind="$config.defaultFormLayout">
        <el-form-item label="产品" prop="product_id">
          <el-select v-model="form.product_id" filterable @change="handleProduct" >
            <el-option v-for="item in products" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col v-bind="$config.defaultFormLayout">
        <el-form-item
          label="产品名字"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入产品名字"
          />
        </el-form-item>
      </el-col>
      <el-col v-bind="$config.defaultFormLayout">
        <el-form-item
          label="库存数量"
          prop="stock"
        >
          <el-input
            v-model="form.stock"
            type="number"
            placeholder="请输入库存数量"
          />
        </el-form-item>
      </el-col>
      <el-col v-bind="$config.defaultFormLayout">
        <el-form-item
          label="积分"
          prop="integral"
        >
          <el-input
            v-model="form.integral"
            type="number"
            placeholder="请输入积分"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'shop-simulated-order',
  data () {
    return {
      products: [],
      active: 0,
      form: {
        product_id: '',
        product_name: '',
        order_number: '',
        pay_type: '',
        status: 1
      },
      rules: {}
    }
  },
  methods: {
    handleProduct (item, val) {
      console.log(item, val)
    }
  },
  created () {
    this.$db.select('shopProduct').then(res => {
      this.products = res
    })
  }
}
</script>

<style>
</style>
