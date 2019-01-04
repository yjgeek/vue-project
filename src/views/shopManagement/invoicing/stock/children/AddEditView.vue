<template>
  <c-strong-dialog v-model="visible" @submit="submit" backUrl="shopMarketingCollection">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="活动标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入活动标题"></el-input>
      </el-form-item>
      <el-form-item label="活动条件" prop="condition">
        <el-input v-model="form.condition" placeholder="请输入活动条件"></el-input>
      </el-form-item>
      <el-form-item label="活动规则" prop="description">
        <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 4, maxRows: 5}" placeholder="请输入活动规则"></el-input>
      </el-form-item>
      <el-form-item label="结束时间" prop="end_time">
        <el-date-picker v-model="form.end_time" type="datetime" placeholder="请选择结束时间" />
      </el-form-item>
    </el-form>
  </c-strong-dialog>
</template>
<script>
export default {
  name: 'shop-stock-add-edit-view',
  data () {
    return {
      visible: true,
      rules: {
        title: [{ required: true, message: '活动标题不能为空', trigger: 'blur' }],
        condition: [{ required: true, message: '条件不能为空', trigger: 'blur' }],
        end_time: [{ required: true, message: '结束时间不能为空', trigger: 'blur' }]
      },
      form: {
        name: '',
        description: '',
        type: '',
        end_time: '',
        shop_marketing_id: ''
      }
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let key = this.form.id ? 'update' : 'add'
          this.$db[key]('shopMarketingCollection', this.form).then(res => {
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
    let {id, shopMarketingId} = this.$route.params
    if (shopMarketingId) {
      this.form.shop_marketing_id = shopMarketingId
    } else {
      if (!id && !shopMarketingId) {
        this.$message.warning('活动模式不能为空')
        this.$router.push({name: 'shopMarketing'})
      }
    }
    if (id) {
      this.$db.find('shopMarketingCollection', {id}, null, 200).then(res => {
        this.form = res
      })
    }
  }
}
</script>
