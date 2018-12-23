<template>
<el-card>
  <!-- 模拟下单 -->
  <shop-simulated-order v-if="type == 'add' || form.status === 1" :id="form.id" :status="form.status" @submit="submit" />
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
    let {type, id} = this.$route.params
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
