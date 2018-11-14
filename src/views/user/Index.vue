<template>
  <div>
    <strong-list ref="strongList" :filter="filterParams" :getData="getData">
      <template slot="operating">
        <el-button type="primary" size="small" v-auth="'user/add'" @click="$router.push({name: 'userAdd'})" icon="el-icon-plus"> 添加</el-button>
      </template>
      <template slot="filter">
        <el-form-item label="用户名称">
          <el-input v-model="filterParams.name" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="filterParams.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterParams.status" placeholder="请选择">
            <el-option label="正常" value="1"></el-option>
            <el-option label="拉黑" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker v-model="filterParams.create_time" type="daterange" value-format="yyyy/MM/dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </template>
      <el-table slot="list" slot-scope="data" :data="data.data" style="width: 100%">
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="phone" label="手机号码">
        </el-table-column>
        <el-table-column prop="email" width="180" label="邮箱">
        </el-table-column>
        <el-table-column prop="roles" label="所属角色">
          <template slot-scope="scope">
            <el-tag size="mini" v-for="item in scope.row.roles" :key="item.id">{{item.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="organization.name" label="所属机构">
        </el-table-column>
        <el-table-column prop="status_name" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="changeStatus(scope.row)" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>&nbsp; {{ scope.row.status?'正常':'拉黑' }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="350" :fixed="windowSize>768?'right':false">
          <template slot-scope="scope">
            <el-button size="mini" v-auth="'user/update'" type="primary" @click="$router.push({name: 'userEdit', params: {id: scope.row.id}})">编辑</el-button>
            <el-button size="mini" type="danger" v-auth="'user/delete'" @click="deleteUser(scope.row.id)">删除</el-button>
            <el-button size="mini" type="danger" v-auth="'user/resetPwd'" @click="resetPwd(scope.row.id)">重置密码</el-button>
            <el-button size="mini" type="primary" v-auth="'rbac/assignRole'" @click="$router.push({name: 'assignRole', params: {id: scope.row.id}})">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </strong-list>
  </div>
</template>
<script>
export default {
  data () {
    return {
      filterParams: {
        name: '',
        phone: null,
        status: null,
        create_time: []
      }
    }
  },
  methods: {
    getData (params = {}, callback) {
      this.$api['userIndex'](params).then(res => {
        res.data = res.data.map(item => {
          // item.status = item.status === 1 ? true : false
          return item
        })
        callback && callback(res)
      })
    },
    deleteUser (id) {
      this.$api['userDelete']({ id }).then(res => {
        this.$message.success('删除成功!')
        this.$refs['strongList'].updateData()
      })
    },
    // 更改用户状态
    changeStatus (item) {
      this.$api['userUpdateStatus']({
        id: item.id,
        status: item.status ? 1 : 0
      })
    },
    resetPwd (id) {
      this.$api['userResetPwd']({id}).then(res => {
        this.$message.success('重置成功,密码为123456')
      })
    },
    updateData () {
      this.$refs['strongList'].updateData()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
