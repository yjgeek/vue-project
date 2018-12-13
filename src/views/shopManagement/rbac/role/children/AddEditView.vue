<template>
  <c-strong-dialog v-model="visible" @submit="submit" backUrl="shopRole">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="名字" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名字"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入角色描述"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="description">
        <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
    </el-form>
  </c-strong-dialog>
</template>
<script>
export default {
  data () {
    return {
      visible: true,
      categorys: [],
      rules: {
        name: [{ required: true, message: '角色名字不能为空!', trigger: 'blur' }]
      },
      form: {
        name: '',
        description: '',
        status: true
      }
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.status = this.form.status === true ? 1 : 0
          let key = this.form.id ? 'update' : 'add'
          this.$db[key]('shopRole', this.form).then(res => {
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
      this.$db.find('shopRole', {id}, null, 200).then(res => {
        this.form = res
      })
    }
  }
}
</script>
