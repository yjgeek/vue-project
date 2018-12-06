<template>
  <c-strong-dialog v-model="visible" @submit="submit" backUrl="shopMarketing">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动类型" prop="type">
        <el-input v-model="form.type" placeholder="请输入活动类型"></el-input>
      </el-form-item>
      <el-form-item label="活动规则" prop="description">
        <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 4, maxRows: 5}" placeholder="请输入活动规则"></el-input>
      </el-form-item>
    </el-form>
  </c-strong-dialog>
</template>
<script>
export default {
  data () {
    return {
      visible: true,
      rules: {
        name: [{ required: true, message: '活动名称不能为空!', trigger: 'blur' }],
        type: [{ required: true, message: '活动类型不能为空!', trigger: 'blur' }],
        description: [{ required: true, message: '活动规则不能为空!', trigger: 'blur' }]
      },
      form: {
        name: '',
        description: '',
        type: ''
      }
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let key = this.form.id ? 'update' : 'add'
          this.$db[key]('shopMarketing', this.form).then(res => {
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
      this.$db.find('shopMarketing', {id}, null, 200).then(res => {
        this.form = res
      })
    }
  }
}
</script>
