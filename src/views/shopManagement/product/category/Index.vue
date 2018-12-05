<template>
  <div>
    <c-strong-list
      :getData="getData"
      :filter="filterParams"
      ref="list"
    >
      <template slot="operating">
        <el-button
          type="primary"
          size="small"
          @click="$router.push({name: 'shopCategoryAdd'})"
          icon="el-icon-plus"
        > 添加</el-button>
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
        <el-table-column
          v-for="item in columns"
          :key="item.id"
          v-bind="item"
        />
        <el-table-column
          label="操作"
          width="250"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="$router.push({name: 'shopCategoryEdit', params: {id: scope.row.id}})"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="remove(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </c-strong-list>
    <router-view @update="updateData" />
  </div>
</template>

<script>
export default {
  name: 'shop-product-category',
  data () {
    return {
      columns: [{type: 'index', label: '编号', width: 50}, {prop: 'name', label: '分类名称'}, {prop: 'pname', label: '父级分类'}, {prop: 'create_time', label: '创建时间'}, {prop: 'update_time', label: '更改时间'}],
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
      this.$db.page('shopCategory', params).then(res => {
        res.data = res.data.map(item => {
          item.pname = ''
          this.getParent(item)
          return item
        })
        cb(res)
      })
    },
    remove (id) {
      this.$db.remove('shopCategory', id).then(res => {
        this.$message.success('删除成功')
        this.updateData()
      })
    },
    updateData () {
      this.$refs.list.updateData()
    },
    async getParent (item) {
      if (item.pid) {
        let res = await this.$db.find('shopCategory', item.pid, null, 0)
        item.pname = res.name ? res.name : ''
      }
      return ''
    }
  },
  created () {}
}
</script>

<style>
</style>
