<template>
<div v-if="status===2">
  <el-form :model="form" ref="form" label-width="80px" :rules="rules" v-bind="$config.defaultFormLayout">
    <el-form-item label="快递公司" prop="express_delivery_company">
      <el-input v-model="form.express_delivery_company" label="请输入快递公司"></el-input>
    </el-form-item>
    <el-form-item label="快递单号" prop="tracking_number">
      <el-input v-model="form.tracking_number" label="请输入快递单号"></el-input>
    </el-form-item>
  </el-form>
  <div style="text-align: center">
    <el-button type="danger" @click="$router.push({name: 'shopOrder'})">取消</el-button>
    <el-button type="primary" @click="submit">发货</el-button>
  </div>
</div>
<div v-else class="product-info">
  <p><strong>快递名称: </strong>{{params.express_delivery_company}}</p>
  <p><strong>快递单号: </strong>{{params.tracking_number}}</p>
  <p><strong>状态: </strong>{{status===3?'待收货':'已收货'}}</p>
  <div style="text-align: center" v-if="status === 3">
    <el-button type="primary" @click="receipt">确认收货</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'shop-ship-order',
  props: {
    status: {
      type: Number,
      default () {
        return 0
      }
    },
    id: Number,
    params: {}
  },
  data () {
    return {
      form: {
        express_delivery_company: '',
        tracking_number: ''
      },
      rules: {
        express_delivery_company: [{ required: true, message: '快递不能为空!' }],
        tracking_number: [{ required: true, message: '快递单号不能为空!' }]
      }
    }
  },
  computed: {
    expressDelivery () {
      return this.params.express_delivery || {}
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('submit', {...this.form, id: this.id, status: 3})
        } else {
          this.$message.error('数据有误，请重新检查')
        }
      })
    },
    receipt () {
      this.$emit('submit', {id: this.id, status: 4})
    }
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
