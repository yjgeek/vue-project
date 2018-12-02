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
          type="index"
          label="编号"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类名称"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
        >
        </el-table-column>
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
    }
  },
  created () {}
}
</script>

<style>
</style>
