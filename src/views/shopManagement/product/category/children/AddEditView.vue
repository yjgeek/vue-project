<template>
  <c-strong-dialog v-model="visible" @submit="submit">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="分类名字" prop="name">
        <el-input v-model="form.name" placeholder="请输入分类名字"></el-input>
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
        name: [{ required: true, message: '分类名字不能为空!', trigger: 'blur' }]
      },
      form: {
        name: ''
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
      this.$db.find('shopCategory', {id}).then(res => {
        this.form = res
      })
    }
  }
}
</script>
