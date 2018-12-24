<template>
<div>
  <!-- 模拟下单 -->
  <el-card>
    <shop-simulated-order v-if="type == 'add' || form.status === 1" :id="form.id" :form="form.status" @submit="submit" />
    <div v-if="form.status && form.status !== 1" class="product-info">
      <p><strong>产品名称: </strong>{{form.product_name}}</p>
      <p><strong>单价: </strong><font style='color: #f54228'>￥{{form.product.sales_price}}</font></p>
      <p><strong>购买数量: </strong>{{form.buy_number}}</p>
      <p>
        <strong>属性: </strong>
        <span v-for="(item, key) in form.attr" :key="key">{{key}}：{{item}}</span>
      </p>
      <p><strong>购买数量: </strong>{{form.buy_number}}</p>
      <p><strong>订单号: </strong>{{form.order_number}}</p>
      <p><strong>支付类型: </strong>{{form.pay_type}}</p>
    </div>
  </el-card>
</div>
</template>
<script>
import shopSimulatedOrder from './Add'
export default {
  name: 'shop-order-add-edit-view',
  data () {
    return {
      type: 'add',
      visible: true,
      categorys: [],
      rules: {
        name: [
          { required: true, message: '分类名字不能为空!', trigger: 'blur' }
        ]
      },
      form: {}
    }
  },
  methods: {
    submit (params, callback) {
      let key = params.id ? 'update' : 'add'
      let bool = true
      this.$db[key]('shopOrder', params).then(res => {
        callback && callback(bool)
      }).catch(() => {
        bool = false
        callback && callback(bool)
      })
    }
  },
  components: {
    shopSimulatedOrder
  },
  created () {
    let res = this.$storage.getItem('orderDetail')
    if (!res) {
      this.$storage.setItem('orderDetail', this.$route.params)
      res = this.$route.params
    }
    let {type, id} = res
    if (type) {
      this.type = type
    }
    if (id) {
      this.$db.find('shopOrder', { id }).then(res => {
        this.form = res
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.product-info{
  line-height: 45px;
}
</style>
