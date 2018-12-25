<template>
<el-row :gutter="15">
  <el-col v-bind="{lg: 24, xl: 12}" class="mb15">
    <el-card>
      <strong slot="header"><span>订单信息</span></strong>
      <shop-simulated-order :id="form.id" :status="form.status" :params="form" @submit="submit" />
    </el-card>
  </el-col>
  <el-col v-bind="{lg: 24, xl: 12}" v-if="form.status >= 2" class="mb15">
    <el-card>
      <strong slot="header"><span>发货信息</span></strong>
      <shop-ship-order :id="form.id" :status="form.status" :params="form" @submit="submit" />
    </el-card>
  </el-col>
  <el-col v-bind="{lg: 24, xl: 12}" v-if="type === 'after' || form.status >= 5" class="mb15">
    <el-card>
      <strong slot="header"><span>申请售后</span></strong>
      <shop-after-order :id="form.id" :status="form.status" :params="form" @submit="submit" />
    </el-card>
  </el-col>
</el-row>
</template>
<script>
import shopSimulatedOrder from './Add'
import shopShipOrder from './Ship'
import shopAfterOrder from './After'
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
  computed: {
    product () {
      return this.form.product || {}
    }
  },
  methods: {
    submit (params, callback) {
      let key = params.id ? 'update' : 'add'
      let bool = true
      this.$db[key]('shopOrder', params).then(res => {
        if (key !== 'add') {
          this.updateData(params.id)
        }
        callback && callback(bool)
      }).catch(() => {
        bool = false
        callback && callback(bool)
      })
    },
    updateData (id) {
      this.$db.find('shopOrder', { id }).then(res => {
        this.$message.success('更新成功!')
        this.form = res
      })
    }
  },
  components: {
    shopSimulatedOrder,
    shopShipOrder,
    shopAfterOrder
  },
  created () {
    let res = this.$route.params
    if (JSON.stringify(res) === '{}') {
      res = this.$storage.getItem('orderDetail')
      if (!res) {
        this.$storage.setItem('orderDetail', this.$route.params)
        res = this.$route.params
      }
    } else {
      this.$storage.setItem('orderDetail', this.$route.params)
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
