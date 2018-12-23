<template>
<div>
  <el-steps style="width: 50%; margin: 20px auto 50px" :active="stepActive" process-status='success' finish-status="success">
    <el-step title="填写订单信息"></el-step>
    <el-step title="完成支付"></el-step>
  </el-steps>
  <el-form :model="form" ref="form" label-width="80px" :rules="rules" v-bind="$config.defaultFormLayout">
    <template v-if="stepActive === 0">
      <el-row>
        <el-form-item label="产品" prop="product_id">
          <el-select v-model="form.product_id" filterable @change="handleProduct" placeholder='请选择产品'>
            <el-option v-for="item in products" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row :gutter="15" v-show="product.id">
        <el-col :span="6">
          <img class="cover" :src="product.cover" />
        </el-col>
        <el-col :span="12">
          <h2>{{product.name}}</h2>
          <p class="product-info">
            <span class="price">￥ {{product.sales_price}}</span>
            <span class="stock">库存: {{product.stock}}</span>
          </p>
          <el-form-item v-if="product.attr" v-for="(item, key) in product.attr" :key="key" :label="key">
            <el-input v-model="form.attr[key]" :placeholder="`请输入产品名字${key}`" />
          </el-form-item>
          <el-form-item label="购买数量" prop="buy_number">
            <el-input-number v-model="form.buy_number" :min="1" :max="product.stock" label="请输入购买数量"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </template>
    <el-row style="text-align: center" v-if="stepActive === 1">
      <el-select class="mb15" placeholder="请选择支付方式" v-model="form.pay_type">
        <el-option value="支付宝支付">支付宝支付</el-option>
        <el-option value="微信支付">微信支付</el-option>
        <el-option value="快捷支付">快捷支付</el-option>
      </el-select>
      <div class="mb15">
        <img class="qr" :src="paySrc" alt="">
      </div>
      <el-button class="mb15" type="primary" @click="handlePay">点我付款</el-button>
    </el-row>
  </el-form>
  <div style="text-align: center">
    <el-button type="danger" @click="$router.push({name: 'shopOrder'})">取消</el-button>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</div>
</template>

<script>
import zfb from './qr/zfb.jpg'
import wx from './qr/wx.jpg'
export default {
  name: 'shop-simulated-order',
  props: {
    status: {
      type: Number,
      default () {
        return 0
      }
    },
    id: Number
  },
  data () {
    return {
      products: [],
      product: {},
      active: 0,
      form: {
        product_id: '',
        product_name: '',
        order_number: '',
        pay_type: '微信支付',
        buy_number: '',
        status: 1,
        attr: {}
      },
      rules: {
        product_id: [{ required: true, message: '产品不能为空!' }],
        order_number: [{ required: true, message: '订单号不能为空!' }],
        buy_number: [{ required: true, message: '购买数量不能为空!' }]
      }
    }
  },
  computed: {
    stepActive () {
      if (this.status) {
        return this.status
      } else {
        return this.active
      }
    },
    paySrc () {
      const type = this.form.pay_type
      if (type === '支付宝支付') {
        return zfb
      } else if (type === '微信支付') {
        return wx
      } else {
        return wx
      }
    }
  },
  methods: {
    submit () {
      this.form['order_number'] = '' + new Date().getTime()
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('submit', this.form, (bool) => {
            if (bool) {
              this.active += 1
            }
          })
        } else {
          this.$message.error('数据有误，请重新检查')
        }
      })
    },
    async handlePay () {
      let id = this.id

      if (this.form.order_number) {
        const res = await this.$db.find('shopOrder', {order_number: this.form.order_number})
        id = res.id
      } else if (!id) {
        this.$router.push({name: 'shopOrder'})
        return false
      }
      this.$db.update('shopOrder', {id, status: 2}).then(() => {
        this.$message.success('支付成功!')
        this.$router.push({name: 'shopOrder'})
      })
    },
    handleProduct (id) {
      let product = this.products.filter(item => item.id === id)[0]
      if (product) {
        if (typeof product.attr === 'object') {
          Object.keys(product.attr).forEach(key => {
            product.attr[key] = ''
          })
        }
        this.form.attr = product.attr
        this.product = product
        this.form.product_id = product.id
        this.form.product_name = product.name
      }
    }
  },
  created () {
    this.$db.select('shopProduct').then(res => {
      this.products = res
    })
  }
}
</script>

<style lang='scss' scoped>
.cover{
  width: 100%;
}
.qr{
  width: 300px;
}
.product-info{
  margin-bottom: 15px;
  .price{
    color: #f54228;
    font-size: 18px;
    margin-right: 30px;
  }
  .stock{
    color: #666;
  }
}
</style>
