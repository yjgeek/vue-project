<template>
<el-card>
  <!-- 模拟下单 -->
  <shop-simulated-order v-if="type == 'add'" />
  <div style="text-align: center">
    <el-button
      type="danger"
      @click="$router.push({name: 'shopGood'})"
    >取消</el-button>
    <el-button
      type="primary"
      @click="submit"
    >提交</el-button>
  </div>
</el-card>
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
      form: {
        cover: '',
        category_id: '',
        detail: '',
        purchase_limit: '',
        integral: '',
        stock_set: '',
        stock: '',
        status: '',
        sales_price: '',
        original_price: '',
        cost_price: '',
        attr: {},
        picture: [{ src: '' }]
      }
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let key = this.form.id ? 'update' : 'add'
          this.$db[key]('shopProduct', this.form).then(res => {
            this.$router.back()
            this.$emit('update')
            this.$message.success('提交成功!')
          })
        } else {
          this.$message.warning('参数有误，请检查!')
        }
      })
    },
    handleUploadProductImg () {
      this.form.picture.push({ src: '' })
    }
  },
  components: {
    shopSimulatedOrder
  },
  created () {
    let {type} = this.$route.params
    if (type) {
      this.type = type
    }
  }
}
</script>
