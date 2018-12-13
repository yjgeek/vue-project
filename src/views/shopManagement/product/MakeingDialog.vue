<template>
  <el-dialog
    title="选择活动"
    :visible.sync="visible"
    center>
      <el-radio v-for="item in listData" :key="item.id" v-model="value" :label="item.id" class="mb15" border>{{item.title}}</el-radio>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'shop-makeing-dialog',
  props: ['val'],
  data () {
    return {
      listData: [],
      value: '',
      visible: true
    }
  },
  methods: {
    getData () {
      this.$db.select('shopMarketingCollection').then(res => {
        this.listData = res
      })
    },
    add () {
      let data = this.val.map(item => {
        item.shop_product_id = item.id
        item.shop_marketing_collection_id = this.value
        return item
      })
      this.$db.add('shopMarketingGood', data).then(res => {
        this.close()
        this.$message.success('添加成功')
      })
    },
    close () {
      this.$emit('close')
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style>

</style>
