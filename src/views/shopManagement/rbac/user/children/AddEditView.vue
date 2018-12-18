<template>
  <c-strong-dialog
    v-model="visible"
    @submit="submit"
    backUrl="shopUser"
  >
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
    >
      <el-form-item
        label="名字"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="请输入用户名字"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机"
        prop="mobile"
      >
        <el-input
          v-model.number="form.mobile"
          placeholder="请输入用户手机"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input
          v-model="form.email"
          placeholder="请输入用户邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="所属角色"
        prop="role_id"
      >
        <el-select v-model="form.role_id" multiple placeholder="请选择所属角色"
        >
          <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item
        label="状态"
        prop="status"
      >
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
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
      roles: [],
      rules: {
        name: [
          { required: true, message: '用户名字不能为空!', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '用户手机不能为空!', trigger: 'blur' }
        ]
      },
      form: {
        name: '',
        mobile: null,
        email: '',
        role_id: [],
        status: true
      }
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let key = this.form.id ? 'update' : 'add'
          this.$db[key]('shopUser', this.form).then(res => {
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
      this.$db.find('shopUser', { id }, null, 200).then(res => {
        this.form = res
      })
    }
    this.$db.select('shopRole').then(res => {
      this.roles = res
    })
  }
}
</script>
