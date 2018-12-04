<template>
  <el-card class="product-edit">
    <el-form
      :model="form"
      ref="form"
      label-width="80px"
      :rules="rules"
      v-bind="$config.defaultFormLayout"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="产品基本信息">
          <el-row>
            <el-col v-bind="$config.defaultFormLayout">
              <el-form-item label="产品分类" prop="category_id">
                <el-select v-model="form.category_id" filterable>
                  <el-option v-for="item in categorys" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-bind="$config.defaultFormLayout">
              <el-form-item label="分类名字" prop="name" >
                <el-input v-model="form.name" placeholder="请输入分类名字" />
              </el-form-item>
            </el-col>
            <el-col v-bind="$config.defaultFormLayout">
              <el-form-item label="库存数量" prop="stock" >
                <el-input v-model="form.stock" type="number" placeholder="请输入库存数量" />
              </el-form-item>
            </el-col>
            <el-col v-bind="$config.defaultFormLayout">
              <el-form-item label="积分" prop="integral" >
                <el-input v-model="form.integral" type="number" placeholder="请输入积分" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-bind="{ md: { span: 8 }, sm: { span: 22 } }">
              <el-form-item label="销售价格" prop="sales_price" >
                <el-input v-model="form.sales_price" type="number" placeholder="请输入销售价格" />
              </el-form-item>
            </el-col>
            <el-col v-bind="{ md: { span: 8 }, sm: { span: 22 } }">
              <el-form-item label="原价格" prop="original_price" >
                <el-input v-model="form.original_price" type="number" placeholder="请输入原价格" />
              </el-form-item>
            </el-col>
            <el-col v-bind="{ md: { span: 8 }, sm: { span: 22 } }">
              <el-form-item label="成本价格" prop="cost_price" >
                <el-input v-model="form.cost_price" type="number" placeholder="请输入成本价格" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-bind="{ md: { span: 8 }, sm: { span: 22 } }">
              <el-form-item label="限购数量" prop="purchase_limit" >
                <el-input v-model="form.purchase_limit" type="number" placeholder="请输入限购数量" />
              </el-form-item>
            </el-col>
            <el-col v-bind="{ md: { span: 8 }, sm: { span: 22 } }">
              <el-form-item label="库存设定" prop="stock_set" >
                <c-select keyVal="stock_set" v-model="form.stock_set" />
              </el-form-item>
            </el-col>
            <el-col v-bind="{ md: { span: 8 }, sm: { span: 22 } }">
              <el-form-item label="产品状态" prop="status" >
                <c-select keyVal="product_status" v-model="form.status" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="产品图片">
          产品图片
        </el-tab-pane>
        <el-tab-pane label="其他属性">
          其他属性
        </el-tab-pane>
      </el-tabs>
      <el-form-item label-width="0" style="text-align: center">
        <el-button type="danger" @click="$router.push({name: 'shopGood'})">取消</el-button>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
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
        status: 1,
        sales_price: '',
        original_price: '',
        cost_price: '',
        attr: {}
      }
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let key = this.form.id ? 'update' : 'add'
          this.$db[key]('shopCategory', this.form).then(res => {
            this.$router.back()
            this.$emit('update')
            this.$message.success('提交成功!')
          })
        } else {
          this.$message.warning('参数有误，请检查!')
        }
      })
    }
  },
  created () {
    let id = this.$route.params.id
    if (id) {
      this.$db.find('shopCategory', { id }, null, 200).then(res => {
        this.form = res
      })
    }
    this.$db.select('shopCategory').then(res => {
      this.categorys = res
    })
  }
}
</script>
<style scoped>
.product-edit >>> .el-card__body {
  padding: 0;
}
.el-tabs {
  border: none;
  box-shadow: none;
}
</style>
