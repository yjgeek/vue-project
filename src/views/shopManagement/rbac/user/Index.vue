<template>
  <div>
    <c-strong-list
      :getData="getData"
      :filter="filterParams"
      ref="list"
    >
      <template slot="operating">
        <el-button type="primary" size="small" @click="$router.push({name: 'shopUserAdd'})" icon="el-icon-plus">添加</el-button>
      </template>
      <template slot="filter">
        <el-form-item label="用户名称">
          <el-input
            v-model="filterParams.name"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
      </template>
      <el-table
        slot="list"
        slot-scope="data"
        :data="data.data"
        style="width: 100%"
      >
        <template v-for="item in columns">
          <el-table-column
            :key="item.id"
            v-bind="item"
            v-if="item.type !== 'index'"
          >
            <template slot-scope="scope">
              <div v-if="item.prop === 'operation'">
                <el-button size="mini" type="primary" @click="$router.push({name: 'shopUserEdit', params: {id: scope.row.id}})">编辑</el-button>
                <el-button size="mini" type="danger" @click="remove(scope.row.id)">删除</el-button>
              </div>
              <el-switch
                v-else-if="item.prop === 'status'"
                v-model="scope.row.status"
                @change="handleStatus(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
              <div v-else-if="item.prop === 'roles'">
                <el-tag v-for="role in scope.row[item.prop]" :key="role.id" type="success" size='mini'>{{role.name}}</el-tag>
              </div>
              <span v-else>{{scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column v-else v-bind="item" :key="item.id" />
        </template>
      </el-table>
    </c-strong-list>
    <router-view @update="updateData" />
  </div>
</template>

<script>
export default {
  name: 'shop-rbac-user',
  data () {
    return {
      columns: [
        {type: 'index', label: '编号', width: 50},
        {prop: 'name', label: '用户名'},
        {prop: 'mobile', label: '手机号码'},
        {prop: 'email', label: '邮箱'},
        {prop: 'status', width: 80, label: '状态'},
        {prop: 'roles', label: '所属用户'},
        {prop: 'create_time', width: 160, label: '创建时间'},
        {prop: 'operation', width: 200, label: '操作'}
      ],
      filterParams: {
        name: ''
      }
    }
  },
  methods: {
    getData (params, cb) {
      params = JSON.parse(JSON.stringify(params))
      if (params.name) {
        params.name = { like: params.name + '%' }
      }
      this.$db.page('shopUser', params).then(res => {
        res.data = res.data.map(item => {
          item.roles = []
          this.getRoles(item.role_id).then(roles => {
            item.roles = roles
          })
          return item
        })
        cb(res)
      })
    },
    remove (id) {
      this.$db.remove('shopUser', id).then(res => {
        this.$message.success('删除成功')
        this.updateData()
      })
    },
    updateData () {
      this.$refs.list.updateData()
    },
    async getRoles (ids) {
      const res = await this.$db.select('shopRole', {'id': {'in': ids}})
      return res
    },
    handleStatus ({id, status}) {
      this.$db.update('shopUser', {id, status})
    }
  },
  created () {}
}
</script>

<style>
</style>
