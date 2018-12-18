<template>
  <el-card>
    <el-row>
      <el-col :span="6">
        <el-tree
          :data="nodeList"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }" @click="handleEdit(data)">
            <span>{{data.name}}</span>
            <span>
              &nbsp;&nbsp;<el-button type="text" size="mini" @click.stop="() => append(data)"><c-icon type='add' /></el-button>
              <el-button type="text" size="mini" @click.stop="() => remove(data)"><c-icon type='delete' /></el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="12">
        <el-form ref="form" :model="form" :rules="formRules" label-width="80px" >
          <el-form-item label="父节点">
            <el-input v-model="parent.name" placeholder="请选择父节点，为空则为根节点" disabled></el-input>
          </el-form-item>
          <el-form-item label="节点名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="API方法" prop="api">
            <el-input v-model="form.api"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch v-model="form.status" active-text="启用" inactive-text="禁止">
            </el-switch>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type='danger' @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="isSubmit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {arrayToTree} from 'utils/index'
export default {
  name: 'shop-rbac-node',
  data () {
    return {
      nodeList: [],
      isSubmit: false,
      formRules: {
        name: [{ required: true, message: '节点名称不能为空', trigger: 'blur' }],
        api: [{ required: true, message: 'api不能为空', trigger: 'blur' }]
      },
      parent: {},
      form: {
        name: '',
        api: '',
        status: true,
        pid: 0,
        path: '0-'
      }
    }
  },
  methods: {
    getData () {
      this.$db.select('shopNode').then(res => {
        this.nodeList = arrayToTree(res, 'pid', 'id')
      })
    },
    handleSubmit () {
      if (this.isSubmit) return false
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isSubmit = true
          if (this.form.id) {
            this.$db.update('shopNode', this.form).then(res => {
              this.getData()
              this.handleReset()
              this.$message.success('更改成功')
              this.isSubmit = false
            })
          } else {
            this.$db.add('shopNode', this.form).then(res => {
              this.$db.find('shopNode', {api: this.form.api}).then(node => {
                node.path = node.path + node.id + '-'
                this.$db.update('shopNode', node).then(() => {
                  this.getData()
                  this.handleReset()
                  this.$message.success('添加成功')
                  this.isSubmit = false
                })
              })
            })
          }
        } else {
          this.$message.error('信息有误，请检查!')
        }
      })
    },
    handleReset () {
      this.parent = {}
      this.$refs.form.clearValidate()
      this.form = {
        name: '',
        api: '',
        status: true,
        pid: 0,
        path: '0-'
      }
    },
    handleEdit (item) {
      if (item.children) {
        delete item.children
      }
      this.form = JSON.parse(JSON.stringify(item))
    },
    append (data) {
      this.handleReset()
      this.parent = data
      this.form.pid = data.id
      this.form.path = data.path
    },

    remove (data) {
      this.$db.remove('shopNode', {path: {like: data.path + '%'}}).then(res => {
        this.$message.success('删除成功')
        this.getData()
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang='scss' scoped>
.custom-tree-node{
  height: 100px;
  line-height: 100px;
  display: block;
}
</style>
